import {
    Drawer,
    Toolbar, Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from 'react';
import { createWebSocketConnection, sendMessage } from "../service/webSocket";
import { useTranslation } from "react-i18next";
import BotBriefCard from "../components/BotBriefCard";
import ChatHistoryList from "../components/ChatHistoryList";
import { PromptInput } from "../components/Inputs";
import TableCreateDialog from "../components/TableCreateDialog";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { Prompt, BotChat, BotChatHistory, BotBriefInfo, getBotChatHistoryList, getBotBrief, getBotChatList, createHistory, deleteHistory } from "../service/BotChat";
import { useParams } from "react-router-dom";
import { getMe } from "../service/user";
import ChatWindow from "../components/ChatWindow";
import { use } from "i18next";


// bot聊天页
// 侧边栏宽度
const drawerWidth = 350;
const BotChatPage = () => {
    // TODO: 重构
    let { botID } = useParams<{ botID: string; }>();
    botID === undefined ? botID = "" : botID = botID;


    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[]>([]);
    const [selectedHistoryId, setSelectedHistoryId] = useState(0);
    const botChatHistoryListRef = useRef(botChatHistoryList);
    botChatHistoryListRef.current = botChatHistoryList;

    const [botChatList, setBotChatList] = useState<BotChat[]>([]);
    const [botBriefInfo, setBotBriefInfo] = useState<BotBriefInfo | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [user, setUser] = useState({ id: 0, name: '', avatar: '' });
    const [tableCreateOpen, setTableCreateOpen] = useState(false);

    const { t } = useTranslation();

    const fetchAndUpdateBrief = async () => {
        const brief = await getBotBrief(botID);
        setBotBriefInfo(brief);
        console.log("brief: ", brief);
    };
    const fetchAndSetUser = async () => {
        let me = await getMe();
        setUser(me);
    };
    // 从后端获取 botChatHistoryList并更新state
    const fetchAndSetBotChatHistoryList = async () => {
        let list = await getBotChatHistoryList(botID, 0, 20);
        setBotChatHistoryList(list ?? []);
    }
    const fetchAndSetBotChatList = async () => {
        const list = selectedHistoryId ? await getBotChatList(selectedHistoryId) : [];
        setBotChatList(list);
    };

    const onSubmit = async (promptlist: Prompt[]) => {
        console.log("PromptList: ", promptlist);
        const newHistoryId = await createHistory(botID, promptlist);
        setBotChatHistoryList([
            {
                id: newHistoryId,
                title: 'New Chat',
                content: ''
            },
            ...botChatHistoryList
        ]);
        setSelectedHistoryId(newHistoryId);
    };
    const onHistoryItemClicked = async (historyid: number) => {
        setSelectedHistoryId(historyid);
    };
    const onHistoryItemDeleted = async (historyid: number) => {
        console.log('Delete History: ' + historyid);
        setBotChatHistoryList(botChatHistoryList.filter(item => item.id !== historyid));
        deleteHistory(historyid);
    }
    // 创建新的对话历史
    const onChatClicked = () => {
        console.log("Click Chat");
        setSelectedHistoryId(0);
    }

    const onSendClicked = (text: string) => {
        console.log('user.name' + user.name);
        setBotChatList(
            botChatList =>
                [...botChatList, {
                    id: 0,
                    name: user.name,
                    historyId: selectedHistoryId,
                    avatar: user.avatar,
                    content: text,
                    type: false
                }]
        );

        // 向 WebSocket 发送消息
        sendMessage(socket, text);
    }

    const resendLast = (sendText: string) => {
        console.log("Resend: ", sendText);
        // 最后一条用户消息内容改为 sendText
        // 删除最后一条机器人消息
        const lastUserChat = botChatList[botChatList.length - 2];
        setBotChatList(
            botChatList =>
                botChatList.slice(0, botChatList.length - 2).concat({
                    id: lastUserChat.id,
                    name: lastUserChat.name,
                    historyId: lastUserChat.historyId,
                    avatar: lastUserChat.avatar,
                    content: sendText,
                    type: false
                })
        );

        // 向 WebSocket 发送消息
        sendMessage(socket, sendText, true);
    }


    const closeWebSocketConnection = (socket: WebSocket) => {
        console.log("WebSocketConnection close: ", socket);
        socket.close();
    };

    // 创建一个新的WebSocket连接
    const WebSocketConnection = (historyId: number) => {
        console.log("WebSocketConnection start: ", historyId);
        setSocket(createWebSocketConnection(historyId));
        console.log("WebSocketConnection: ", socket);
    };


    const ellipsisStr = (str: string, length: number) => {
        // 截取字符串，如果长度大于 length 则加上省略号
        return str.length > length ? str.substring(0, length) + "..." : str;
    }

    useEffect(() => {
        // 页面加载初始化
        console.log(botID);
        fetchAndUpdateBrief();
        fetchAndSetUser().then(() => { console.log('username is ' + user.name) });
        fetchAndSetBotChatHistoryList();
    }, []);

    useEffect(() => {
        console.log("selectedHistoryId changed to " + selectedHistoryId);
        selectedHistoryId && WebSocketConnection(selectedHistoryId);
        fetchAndSetBotChatList();

        return () => {
            socket?.readyState === WebSocket.OPEN && closeWebSocketConnection(socket);
        }
    }, [selectedHistoryId]);

    useEffect(() => {
        if (socket) {
            // 新的WebSocket连接被创建
            // 处理来自服务器的消息
            socket.onmessage = (event) => {
                console.log('Message from server: ', event.data);
                let response: { replyMessage: string };
                try {
                    console.log('event.data: ' + event.data);
                    response = JSON.parse(event.data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    response = { replyMessage: 'Error parsing JSON' };
                    // Handle the error as needed
                }
                console.log('Message from server: ', response.replyMessage);
                setBotChatHistoryList(
                    botChatHistoryListRef
                        .current
                        .map(
                            history =>
                                history.id === selectedHistoryId ?
                                    {
                                        ...history,
                                        content: ellipsisStr(response.replyMessage, 20)
                                    } : history
                        )
                );
                setBotChatList(
                    botChatList =>
                        [...botChatList, {
                            id: 0,
                            name: botBriefInfo ? botBriefInfo.name : "",
                            historyId: selectedHistoryId,
                            avatar: botBriefInfo ? botBriefInfo.avatar : "",
                            content: response.replyMessage,
                            type: true
                        }]
                );
            };

            // Handle any errors that occur.
            socket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
                // TODO: Update your state to indicate that an error occurred
            };
        }
    }, [socket]);

    useEffect(() => {
        const currentHistory: BotChatHistory = botChatHistoryList.find(item => item.id === selectedHistoryId) as BotChatHistory;
        const newCurrentHistory: BotChatHistory = {
            ...currentHistory,
            content: botChatList.length ? ellipsisStr(botChatList[botChatList.length - 1].content, 20) : '',
            // 如果当前历史没有对话，则使用输入的文本作为标题
            title: botChatList.length ? ellipsisStr(botChatList[0].content, 10) : "New Chat"
        }
        const newBotChatHistoryList = botChatHistoryList.filter(item => item.id !== selectedHistoryId);
        // 如果在对话中，将当前历史记录置于历史列表顶端
        if (socket) newBotChatHistoryList.unshift(newCurrentHistory);
        setBotChatHistoryList(newBotChatHistoryList);
    }, [botChatList]);



    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
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
                <BotBriefCard botBriefInfo={botBriefInfo} onChatButtonClick={onChatClicked} />
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
                {/* 判断 botChatHistoryList 是否为空*/}
                {botChatHistoryList && botChatHistoryList.length ? (
                    <ChatHistoryList
                        botChatHistoryList={botChatHistoryList}
                        selectedId={selectedHistoryId}
                        onItemClicked={onHistoryItemClicked}
                        onItemDeleted={onHistoryItemDeleted}
                    />
                ) : (
                    <div
                        className="drawer-item-title"
                        style={{ color: theme.palette.secondary.dark, margin: 25 }}
                    >
                        {t('No chat history yet.')}
                    </div>
                )}
            </Drawer>
            <Box
                className="main-container bot-chat-container"
                flexDirection="column"
                alignItems="center"
                display="flex"
                width="100%"
            >
                <ChatWindow botChatList={botChatList} resendLast={resendLast} />
                {/* 输入框，发送按钮，编辑按钮 */}
                <PromptInput
                    selectedHistoryId={selectedHistoryId}
                    onAltTable={() => {
                        setTableCreateOpen(true);
                    }}
                    onSend={onSendClicked}
                />
                {/* 弹出 prompt 表格 */}
                <TableCreateDialog
                    botID={botID}
                    historyId={selectedHistoryId}
                    open={tableCreateOpen}
                    handleClose={() => {
                        setTableCreateOpen(false);
                    }}
                    handleSubmit={onSubmit} />
            </Box>
        </div>
    );
};

export default BotChatPage;
