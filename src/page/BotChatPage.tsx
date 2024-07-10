import { Drawer, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BotBriefCard from "../components/BotBriefCard";
import ChatHistoryList from "../components/ChatHistoryList";
import ChatWindow from "../components/ChatWindow";
import { PromptInput } from "../components/Inputs";
import TableCreateDialog from "../components/TableCreateDialog";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { useErrorHandler } from "../hooks/errorHandler.tsx";
import { BotBriefInfo, BotChat, BotChatHistory, Prompt, createHistory, deleteHistory, getBotBrief, getBotChatHistoryList, getBotChatList } from "../service/BotChat";
import { getMe } from "../service/user";
import { createWebSocketConnection, sendMessage } from "../service/webSocket";
import { ellipsisStr } from "../utils/strUtils.ts";

// bot聊天页
// 侧边栏宽度
const drawerWidth = 350;

/**
 * 后端向前端发送的 WebSocket 报文
 * @param type 报文类型 'complete' | 'token' | 'error'
 * 'complete' 表示流式输出结束后的完整消息
 * 'token' 表示流式输出的 token
 * 'error' 表示遇到了错误
 * 
 * @param message 报文内容
 */
interface WebSocketMessage {
    type: string,
    message: string;
};

const BotChatPage = () => {
    const { botID } = useParams<{ botID: string; }>();

    /**
     * UseStates and other Hooks
     */
    /**
     * 机器人和用户信息
     */
    const [botBriefInfo, setBotBriefInfo] = useState<BotBriefInfo | null>(null);
    const [user, setUser] = useState({ id: 0, name: '', avatar: '' });

    /**
     * 对话历史记录
     */
    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[]>([]);
    const botChatHistoryListRef = useRef(botChatHistoryList);
    const [selectedHistoryId, setSelectedHistoryId] = useState<number>(0);

    /**
     * 对话记录
     */
    const [botChatList, setBotChatList] = useState<BotChat[]>([]);
    const [isFirstReply, setIsFirstReply] = useState<boolean>(false);
    const [userAsk, setUserAsk] = useState<string>("");
    botChatHistoryListRef.current = botChatHistoryList;

    /**
     * 表单状态
     */
    const [tableCreateOpen, setTableCreateOpen] = useState(false);

    /**
     * 流式输出
     */
    // 正在进行流式输出的对话，若为null则表示没有流式输出
    const [streamingChat, setStreamingChat] = useState<BotChat | null>(null);
    const streamingChatRef = useRef(streamingChat);
    // 用于缓冲流式输出token的队列
    const [tokenQueue, setTokenQueue] = useState<string[]>([]);

    /**
     * 加载状态
     */
    const [botChatHistoryLoading, setBotChatHistoryLoading] = useState(true);
    const [responding, setResponding] = useState(false);


    const [socket, setSocket] = useState<WebSocket | null>(null);

    const { messageError, ErrorSnackbar } = useErrorHandler();

    const { t } = useTranslation();


    /**
     * Functions: 从后端获取数据并更新state
     * fetchAndUpdateXXX
     */
    const fetchAndUpdateBrief = async () => {
        await getBotBrief(botID)
            .then((brief) => setBotBriefInfo(brief))
            .catch((e) => {
                setBotBriefInfo(null);
                messageError("Failed to get bot info: " + e.message);
            });
    };
    const fetchAndSetUser = () => {
        getMe().then((res) => {
            setUser(res);
        }).catch((e) => {
            messageError("Failed to get user info: " + e.message);
        });
    };
    const fetchAndSetBotChatHistoryList = () => {
        getBotChatHistoryList(botID, 0, 20)
            .then((list) => {
                setBotChatHistoryList(list.histories);
                setBotChatHistoryLoading(false);
            })
            .catch((e) => {
                setBotChatHistoryList([]);
                messageError("Failed to get chat history list: " + e.message);
            });
    };
    const fetchAndSetBotChatList = () => {
        selectedHistoryId ? getBotChatList(selectedHistoryId).then(list => {
            setBotChatList(list);
        }) : setBotChatList([]);
    };


    /**
     * Functions: 处理用户前端操作
     * handleXXX
     */
    const handleSubmitPromptList = async (promptlist: Prompt[]) => {
        console.log("PromptList: ", promptlist);
        const response = await createHistory(botID ?? '', promptlist);
        if (!response.ok) {
            messageError("开启对话失败");
            return;
        }
        const newHistoryId = response.historyid;
        setUserAsk(response.userAsk);
        setBotChatHistoryList([
            {
                id: newHistoryId,
                title: 'New Chat',
                content: ''
            },
            ...botChatHistoryList
        ]);
        setBotChatList(
            botChatList =>
                [...botChatList, {
                    id: 0,
                    name: user.name,
                    historyId: selectedHistoryId,
                    avatar: user.avatar,
                    content: response.userAsk,
                    type: false,
                    calledList: [],
                    loadingList: []
                },
                {
                    id: 0,
                    name: botBriefInfo ? botBriefInfo.name : "",
                    historyId: selectedHistoryId,
                    avatar: botBriefInfo ? botBriefInfo.avatar : "",
                    content: "loading...",
                    type: true,
                    calledList: [],
                    loadingList: []
                }]
        );
        setResponding(true);
        setSelectedHistoryId(newHistoryId);
        setIsFirstReply(true);
    };
    const handleHistoryItemClicked = async (historyid: number) => {
        setSelectedHistoryId(historyid);
    };
    const handleHistoryItemDeleted = async (historyid: number) => {
        console.log('Delete History: ' + historyid);
        setBotChatHistoryList(botChatHistoryList.filter(item => item.id !== historyid));
        if (historyid === selectedHistoryId) setSelectedHistoryId(0);
        let res = await deleteHistory(historyid);
        if (!res.ok) {
            messageError("删除对话历史失败");
        }
    };
    const handleNewChatButtonClicked = () => {
        console.log("Click Chat");
        setSelectedHistoryId(0);
    };

    /**
     * Functions: 处理发送消息（三种情况）
     * handleSendMessage, handleResendMessage, handleSendUserAsk
     * handleSendMessage: 用户手动发送UserAsk之后的消息
     * handleResendMessage: 用户重新编辑并发送最后一条消息，或要求大模型重新生成回答
     * handleSendUserAsk: 用户创建历史时，发送UserAsk
     */

    const handleSendMessage = (text: string) => {
        // 发送消息时，清空流式输出
        setStreamingChat(null);

        console.log('user.name' + user.name);
        setBotChatList(
            botChatList =>
                [...botChatList, {
                    id: 0,
                    name: user.name,
                    historyId: selectedHistoryId,
                    avatar: user.avatar,
                    content: text,
                    type: false,
                    calledList: [],
                    loadingList: []
                },
                {
                    id: 0,
                    name: botBriefInfo ? botBriefInfo.name : "",
                    historyId: selectedHistoryId,
                    avatar: botBriefInfo ? botBriefInfo.avatar : "",
                    content: "loading...",
                    type: true,
                    calledList: [],
                    loadingList: []
                }]
        );

        // 向 WebSocket 发送消息
        sendMessage(socket, text);
        setResponding(true);
    };
    const handleResendMessage = (sendText: string) => {
        // 重新发送最后一条消息时，清空流式输出
        setStreamingChat(null);
        console.log("Resend: ", sendText);
        // 最后一条用户消息内容改为 sendText
        // 删除最后一条机器人消息
        const lastUserChat = botChatList[botChatList.length - 2];
        setBotChatList(
            botChatList =>
                botChatList.slice(0, botChatList.length - 2).concat([{
                    id: lastUserChat.id,
                    name: lastUserChat.name,
                    historyId: lastUserChat.historyId,
                    avatar: lastUserChat.avatar,
                    content: sendText,
                    type: false,
                    calledList: [],
                    loadingList: []
                },
                {
                    id: 0,
                    name: botBriefInfo ? botBriefInfo.name : "",
                    historyId: selectedHistoryId,
                    avatar: botBriefInfo ? botBriefInfo.avatar : "",
                    content: "loading...",
                    type: true,
                    calledList: [],
                    loadingList: []
                }])
        );

        // 向 WebSocket 发送消息
        sendMessage(socket, sendText, true);
        setResponding(true);
    };
    const handleSendUserAsk = (websocket: WebSocket | null) => {
        console.log("send user ask:", socket, userAsk);
        setStreamingChat(null);
        sendMessage(websocket, userAsk, false, true);
        setIsFirstReply(false);
    };


    /**
     * Functions: WebSocket相关
     */

    const closeWebSocketConnection = (socket: WebSocket) => {
        console.log("WebSocketConnection close: ", socket);
        socket.close();
    };
    const createWebSocketConnectionForHistory = async (historyId: number) => {
        console.log("WebSocketConnection start: ", historyId);
        try {
            const socket = await createWebSocketConnection(historyId);
            setSocket(socket);
            console.log("WebSocketConnection: ", socket);
            isFirstReply && handleSendUserAsk(socket);
        } catch (error) {
            console.error(error);
        }
    };


    /**
     * UseEffects
     */

    /**
     * 页面初始化时，获取机器人信息、用户信息、对话历史记录
     */
    useEffect(() => {
        fetchAndUpdateBrief();
        fetchAndSetUser();
        fetchAndSetBotChatHistoryList();
    }, []);

    /**
     * 当 selectedHistoryId 改变时，创建新的WebSocket连接
     */
    useEffect(() => {
        console.log("selectedHistoryId changed to " + selectedHistoryId);
        selectedHistoryId && createWebSocketConnectionForHistory(selectedHistoryId);

        !isFirstReply && fetchAndSetBotChatList();
        !isFirstReply && setResponding(false);

        return () => {
            socket?.readyState === WebSocket.OPEN && closeWebSocketConnection(socket);
        };
    }, [selectedHistoryId]);

    /**
     * 流式输出时，将队列中的token依次出队并添加到streamingChat中   
     */
    useEffect(() => {
        streamingChatRef.current = streamingChat;
        if (tokenQueue.length > 0) {
            const nextToken = tokenQueue[0];
            setStreamingChat(streamingChat => streamingChat ? ({
                ...streamingChat,
                content: streamingChat.content.concat(nextToken)
            }) : {
                ...botChatList[botChatList.length - 1],
                calledList: [...botChatList[botChatList.length - 1].loadingList],
                content: nextToken
            });
            setTokenQueue(queue => queue.slice(1));
        }
        if (streamingChat == null) {
            return;
        }
        setBotChatList(
            botChatList =>
                botChatList.slice(0, botChatList.length - 1).concat(
                    [streamingChat])
        );
    }, [tokenQueue, streamingChat]);

    /**
     * 当对话列表改变时，更新对话历史的标题和内容
     */
    useEffect(() => {
        const currentHistory = botChatHistoryList
            .find(item => item.id === selectedHistoryId);
        if (!currentHistory) return;

        const newCurrentHistory: BotChatHistory = {
            ...currentHistory,
            content: botChatList.length ? ellipsisStr(botChatList[botChatList.length - 1].content, 20) : '',
            // 如果当前历史没有对话，则使用输入的文本作为标题
            title: botChatList.length ? ellipsisStr(botChatList[0].content, 10) : "New Chat"
        };
        const newBotChatHistoryList = botChatHistoryList.filter(item => item.id !== selectedHistoryId);
                // 如果在对话中，将当前历史记录置于历史列表顶端
                // TODO: 先注释掉，之后再重构
                /* if (socket) */ newBotChatHistoryList.unshift(newCurrentHistory);
        setBotChatHistoryList(newBotChatHistoryList);
    }, [botChatList]);

    /**
     * WebSocket连接建立后，处理来自服务器的消息
     */
    useEffect(() => {
        if (socket) {
            // 新的WebSocket连接被创建
            // 处理来自服务器的消息

            socket.onmessage = (event) => {
                console.log('Message from server: ', event.data);
                let response: WebSocketMessage;
                try {
                    console.log('event.data: ' + event.data);
                    response = JSON.parse(event.data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    response = { type: 'error', message: 'Error parsing JSON' };
                    // Handle the error as needed
                }
                if (response.type === 'complete') {
                    // 流式输出完成之后，完整的消息
                    setBotChatHistoryList(
                        botChatHistoryListRef
                            .current
                            .map(
                                history =>
                                    history.id === selectedHistoryId ?
                                        {
                                            ...history,
                                            content: ellipsisStr(response.message, 20)
                                        } : history
                            )
                    );
                } else if (response.type === 'token') {
                    // 流式token
                    console.log("token arrived", response.message);
                    if (!streamingChatRef.current) {
                        // 第一个token到达
                        console.log("first token arrived");
                        setResponding(false);
                    } else {
                        // 之后的token到达
                        console.log("other token arrived");
                    }
                    setTokenQueue(queue => [...queue, response.message]);
                } else if (response.type === 'toolExecutionRequest') {
                    // 给最后一条加上loading
                    setBotChatList(
                        botChatList =>
                            botChatList.slice(0, botChatList.length - 1).concat(
                                [{
                                    id: 0,
                                    name: botBriefInfo ? botBriefInfo.name : "",
                                    historyId: selectedHistoryId,
                                    avatar: botBriefInfo ? botBriefInfo.avatar : "",
                                    content: "loading...",
                                    type: true,
                                    calledList: [],
                                    loadingList: [...botChatList[botChatList.length - 1].loadingList, response.message]
                                }])
                    );
                } else if (response.type === 'toolExecutionResult') {
                    // 给最后一条加上loading
                    setBotChatList(
                        botChatList =>
                            botChatList.slice(0, botChatList.length - 1).concat(
                                [{
                                    id: 0,
                                    name: botBriefInfo ? botBriefInfo.name : "",
                                    historyId: selectedHistoryId,
                                    avatar: botBriefInfo ? botBriefInfo.avatar : "",
                                    content: response.message,
                                    type: true,
                                    calledList: [],
                                    loadingList: [...botChatList[botChatList.length - 1].loadingList, response.message]
                                }])
                    );
                }
                else {
                    // response.type === 'error'
                    messageError(response.message);
                }

            };

            socket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
                setResponding(false);
            };
        }
    }, [socket]);




    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            <ErrorSnackbar />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        overflowY: 'auto' // 添加垂直滚动条
                    },
                    height: '100vh',// 设置 Drawer 的高度为视窗的高度
                }}
            >
                <Toolbar
                    style={{
                        minHeight: 100, // 设置最小高度
                        flexShrink: 0, // 防止 Toolbar 在 flex 布局中被压缩
                    }}
                />
                <BotBriefCard botBriefInfo={botBriefInfo} onChatButtonClick={handleNewChatButtonClicked} />
                <Typography
                    className="drawer-item-content"
                    style={{
                        marginTop: 20,
                        marginLeft: 25,
                        color: theme.palette.primary.light,
                        fontWeight: 'bold',
                        fontFamily: 'Abril Face',
                        fontSize: 20,
                    }}
                >
                    {t('Chat History')}
                </Typography>
                <ChatHistoryList
                    botChatHistoryList={botChatHistoryList}
                    selectedId={selectedHistoryId}
                    onItemClicked={handleHistoryItemClicked}
                    onItemDeleted={handleHistoryItemDeleted}
                    loading={botChatHistoryLoading}
                />
            </Drawer>
            <Box
                className="main-container bot-chat-container"
                flexDirection="column"
                alignItems="center"
                display="flex"
                width="100%"
            >
                <ChatWindow
                    botChatList={botChatList}
                    resendLast={handleResendMessage}
                    loading={responding}
                />
                {/* 输入框，发送按钮，编辑按钮 */}
                <PromptInput
                    selectedHistoryId={selectedHistoryId}
                    onAltTable={() => {
                        setTableCreateOpen(true);
                    }}
                    onSend={handleSendMessage}
                    disabled={false}
                />
                {/* 弹出 prompt 表格 */}
                <TableCreateDialog
                    botID={botID}
                    historyId={selectedHistoryId}
                    open={tableCreateOpen}
                    handleClose={() => {
                        setTableCreateOpen(false);
                    }}
                    handleSubmit={handleSubmitPromptList} />
            </Box>
        </div>
    );
};

export default BotChatPage;
