import {
    Drawer,
    Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {useEffect, useState} from 'react';
import OneChat from "../components/OneChat";

import '../css/App.css'
import '../css/BotChatPage.css'
import {PromptInput} from "../components/Inputs";
import Navigator from "../components/Navigator";
import ChatHistoryList from "../components/ChatHistoryList";
import BotBriefCard from "../components/BotBriefCard";
import TableCreateDialog from "../components/TableCreateDialog";
import {BotChat, BotChatHistory, getBotChatHistoryList, getBotChatList} from "../service/BotChat";

// bot聊天页
// 侧边栏宽度
let drawerWidth = 300;
const BotChatPage = () => {
    const [tableCreateOpen, setTableCreateOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(0);
    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[]>([]);
    const [botChatList, setBotChatList] = useState<BotChat[]>([]);
    const getChatHistoryList = async () => {
        const list = await getBotChatHistoryList();
        setBotChatHistoryList(list);
    };

    useEffect(() => {
        getChatHistoryList();
    }, []);


    return (
        <>
            <Navigator />
            <div
                style={{
                    display: 'flex' ,
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
                        style={{height: 100,}}
                    />
                    <BotBriefCard />
                    <ChatHistoryList
                        botChatHistoryList={ botChatHistoryList }
                        selectedId={ selectedHistory }
                        onItemClicked={async (id)=>{
                            setSelectedHistory(id);
                            const list = await getBotChatList(id);
                            setBotChatList(list);
                        }}
                    />
                </Drawer>
                <Box
                    className="main-container bot-chat-container"
                    flexDirection="column"
                    alignItems="center"
                    display="flex"
                    width="100%"
                >
                    <Box sx={{
                        width:"80%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>{
                            botChatList.map((botChat, index)=>
                                <React.Fragment key={index} >
                                    <OneChat
                                        id={botChat.id}
                                        name={botChat.name}
                                        avatar={botChat.avatar}
                                        content={botChat.content}
                                    />
                                </React.Fragment>)
                        }
                    </Box>
                    <PromptInput
                        onAltTable={()=>{setTableCreateOpen(true);}}
                        onSend={(text)=>{
                            setBotChatList([
                                ...botChatList,
                                {
                                    id: '',
                                    name: '你',
                                    historyId: selectedHistory,
                                    avatar:'',
                                    content: text
                                }]);
                            window.scrollTo(0, document.body.scrollHeight);
                        }} />
                    <TableCreateDialog
                        open={tableCreateOpen}
                        handleClose={()=>{setTableCreateOpen(false);}}
                        handleSubmit={()=>{alert("submit finished");}} />
                </Box>
            </div>
        </>
    );
}

export default BotChatPage;
