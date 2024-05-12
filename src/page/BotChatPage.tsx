import {
    Drawer,
    Toolbar, Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import OneChat from "../components/OneChat";
import { createWebSocketConnection, sendMessage } from "../service/webSocket";
import { useTranslation } from "react-i18next";
import BotBriefCard from "../components/BotBriefCard";
import ChatHistoryList from "../components/ChatHistoryList";
import { PromptInput } from "../components/Inputs";
import TableCreateDialog from "../components/TableCreateDialog";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { Prompt, BotChat, BotChatHistory, BotBriefInfo, getBotChatHistoryList, getBotBrief, getBotChatList, createHistory } from "../service/BotChat";
import { useParams } from "react-router-dom";
import { use } from "i18next";


const ChatWindow = (
    { botChatList }: { botChatList: BotChat[] }
) => {
    // 判断 botChatList 是否为空, 如果为空则显示提示信息, 否则显示聊天记录
    return (
        <Box
            sx={{
                width: '90%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {botChatList.length ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {botChatList.map((botChat, index) => (
                        <OneChat
                            key={index}
                            id={botChat.id}
                            name={botChat.name}
                            avatar={botChat.avatar}
                            content={botChat.content}
                        />
                    ))}
                </Box>
            ) : (
                <div className="chat-hint-container">
                    <div
                        className="chat-hint-text"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        Fill in the prompt table and start chatting!
                    </div>
                </div>
            )}
        </Box>
    );
}

// bot聊天页
// 侧边栏宽度
let drawerWidth = 350;
const BotChatPage = () => {
    let { botID } = useParams<{ botID: string; }>();
    botID === undefined ? botID = "" : botID = botID;


    const [tableCreateOpen, setTableCreateOpen] = useState(false);
    const [selectedHistoryId, setSelectedHistoryId] = useState(0);
    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[] | null>([]);
    const [botChatList, setBotChatList] = useState<BotChat[]>([]);
    const [botBriefInfo, setBotBriefInfo] = useState<BotBriefInfo | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [setBotChatList]);

    useEffect(() => {
        const getBrief = async () => {
            const brief = await getBotBrief(botID);
            setBotBriefInfo(brief);
            console.log("brief: ", brief);
        };
        console.log(botID);
        getBrief();
    }, []);

    useEffect(() => {
        const getChatHistoryList = async () => {
            const list = await getBotChatHistoryList(botID, 0, 20);
            setBotChatHistoryList(list);
            console.log("BotChatHistoryList: ", list);
        };
        getChatHistoryList();
    }, [selectedHistoryId]);

    const onSubmit = async (promptlist: Prompt[]) => {
        console.log("PromptList: ", promptlist);
        const newHistoryId = await createHistory(botID, promptlist);
        setSelectedHistoryId(newHistoryId);
    };

    // websocket
    const WebSocketConnection = (id: number) => {
        // Create a new WebSocket connection
        // if websocket has been created, close it first
        if (socket) {
            console.log("WebSocketConnection close: ", socket);
            socket.close();
        }
        console.log("WebSocketConnection start: ", id);
        setSocket(createWebSocketConnection(id));
        console.log("WebSocketConnection: ", socket);

    };
    // update botChatList
    useEffect(() => {
        const getChatList = async () => {
            const list = await getBotChatList(selectedHistoryId);

            setBotChatList(list);
            console.log("First BotChatList: ", list);
        };
        getChatList();
    }, [selectedHistoryId]);

    // update socket
    useEffect(() => {
        if (socket) {
            // Handle incoming messages
            socket.onmessage = (event) => {
                console.log("In onmessage: ", botChatList);
                console.log('Message from server: ', event.data);
                let response: { replyMessage: string };
                try {
                    response = JSON.parse(event.data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    response = { replyMessage: 'Error parsing JSON' };
                    // Handle the error as needed
                }
                console.log('Message from server: ', response.replyMessage);
                console.log('my botChatList: ', botChatList);

                setBotChatList((prev) => (
                    Array.isArray(prev) ? [...prev, {
                        id: 0,
                        name: botBriefInfo ? botBriefInfo.name : "",
                        historyId: selectedHistoryId,
                        avatar: botBriefInfo ? botBriefInfo.avatar : "",
                        content: response.replyMessage
                    }] : [...prev['chats'], {
                        id: 0,
                        name: botBriefInfo ? botBriefInfo.name : "",
                        historyId: selectedHistoryId,
                        avatar: botBriefInfo ? botBriefInfo.avatar : "",
                        content: response.replyMessage
                    }]
                ));

                window.scrollTo(0, document.body.scrollHeight);
            };

            // Handle any errors that occur.
            socket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
                // TODO: Update your state to indicate that an error occurred
            };
        }
    }, [socket]); // Add socket as a dependency



    const onChatButtonClick = () => {
        console.log("Click Chat");
        setSelectedHistoryId(0);
    }

    window.scrollTo(0, document.body.scrollHeight);
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
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar
                    style={{ height: 100, }}
                />
                <BotBriefCard botBriefInfo={botBriefInfo} onChatButtonClick={onChatButtonClick} />
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
                        onItemClicked={async (id) => {
                            setSelectedHistoryId(id);
                            const list = await getBotChatList(id);
                            setBotChatList(list);
                            console.log("BotChatList 111: ", list);
                            WebSocketConnection(id);
                        }}
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
                <ChatWindow botChatList={botChatList} />
                {/* 输入框，发送按钮，编辑按钮 */}
                <PromptInput
                    selectedHistoryId={selectedHistoryId}
                    onAltTable={() => {
                        setTableCreateOpen(true);
                    }}
                    onSend={(text) => {

                        setBotChatList((prev) => (
                            Array.isArray(prev) ?
                                [...prev, {
                                    id: 0,
                                    name: '你',
                                    historyId: selectedHistoryId,
                                    avatar: '/assets/user-default.png',
                                    content: text
                                }] : [...prev['chats'], {
                                    id: 0,
                                    name: '你',
                                    historyId: selectedHistoryId,
                                    avatar: '/assets/user-default.png',
                                    content: text
                                }]
                        ));


                        // 向 WebSocket 发送消息
                        sendMessage(socket, text);
                        window.scrollTo(0, document.body.scrollHeight);
                    }} />
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
