import {
    Drawer,
    Toolbar, Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import OneChat from "../components/OneChat";

import { useTranslation } from "react-i18next";
import BotBriefCard from "../components/BotBriefCard";
import ChatHistoryList from "../components/ChatHistoryList";
import { PromptInput } from "../components/Inputs";
import TableCreateDialog from "../components/TableCreateDialog";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { BotChat, BotChatHistory, BotBriefInfo, getBotChatHistoryList, getBotChatList, getBotBrief } from "../service/BotChat";
import { useParams } from "react-router-dom";
import { Margin } from "@mui/icons-material";

// bot聊天页
// 侧边栏宽度
let drawerWidth = 350;
const BotChatPage = () => {
    let { botId } = useParams<{ botId: string }>();

    const [tableCreateOpen, setTableCreateOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(0);
    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[] | null>([]);
    const [botChatList, setBotChatList] = useState<BotChat[]>([]);
    const [botBriefInfo, setBotBriefInfo] = useState<BotBriefInfo | null>(null);

    const { t } = useTranslation();
    useEffect(() => {
        const getBrief = async () => {
            const brief = await getBotBrief(botId);
            setBotBriefInfo(brief);
        };
        console.log(botId);
        getBrief();
    }, []);


    useEffect(() => {
        const getChatHistoryList = async () => {
            const list = await getBotChatHistoryList(botId, 0, 20);
            setBotChatHistoryList(list);
        };
        getChatHistoryList();
    }, []);


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
                <BotBriefCard botBriefInfo={botBriefInfo} />
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
                        selectedId={selectedHistory}
                        onItemClicked={async (id) => {
                            setSelectedHistory(id);
                            const list = await getBotChatList(id);
                            setBotChatList(list);
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
                {botChatList.length ? (
                    <Box sx={{
                        width: '90%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {(botChatList.map((botChat, index) =>
                            <React.Fragment key={index}>
                                <OneChat
                                    id={botChat.id}
                                    name={botChat.name}
                                    avatar={botChat.avatar}
                                    content={botChat.content}
                                />
                            </React.Fragment>))}
                    </Box>) : (
                    <div className="chat-hint-container">
                        <div
                            className="chat-hint-text"
                            style={{ color: theme.palette.secondary.main }}
                        >
                            {t('Fill the table template and start messaging with your own assistant!')}
                        </div>
                    </div>
                )
                }
                {/* 输入框，发送按钮，编辑按钮 */}
                <PromptInput
                    onAltTable={() => {
                        setTableCreateOpen(true);
                    }}
                    onSend={(text) => {
                        setBotChatList([
                            ...botChatList,
                            {
                                id: 0,
                                name: '你',
                                historyId: selectedHistory,
                                avatar: '/assets/user-default.png',
                                content: text
                            }]);
                        window.scrollTo(0, document.body.scrollHeight);
                    }} />
                {/* 弹出 prompt 表格 */}
                <TableCreateDialog
                    open={tableCreateOpen}
                    handleClose={() => {
                        setTableCreateOpen(false);
                    }}
                    handleSubmit={() => {
                    }} />
            </Box>
        </div>
    );
}

export default BotChatPage;
