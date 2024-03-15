import {
    Drawer,
    List, Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {useState} from 'react';
import OneChat from "../components/OneChat";

import '../css/App.css'
import '../css/BotChatPage.css'
import {PromptInput} from "../components/Inputs";
import Navigator from "../components/Navigator";
import ChatHistoryList from "../components/ChatHistoryList";
import BotBriefCard from "../components/BotBriefCard";
import TableCreateDialog from "../components/TableCreateDialog";

// bot聊天页
// 侧边栏宽度
let drawerWidth = 300;
const BotChatPage = () => {
    const [tableCreateOpen, setTableCreateOpen] = useState(false);
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
                    <ChatHistoryList />
                </Drawer>
                <Box
                    className="main-container bot-chat-container"
                    flexDirection="column"
                    alignItems="center"
                    display="flex"
                    width="100%"
                >
                    <Box>
                        <OneChat id="1" name="Creeper" avatar=""
                                 content={'Make up a 5-sentence story about "Sharky", a tooth-brushing shark superhero. Make each sentence a bullet point.'}/>
                        <OneChat id="2" name="ChatGPT" avatar="" content={
                            '- In the depths of the ocean, there existed a remarkable creature known as Sharky, a shark with a passion for dental hygiene and a secret identity as a superhero. \n' +
                            '- With a sleek, silver costume adorned with a toothbrush emblem, Sharky patrolled the seas, ensuring all marine life kept their teeth sparkling clean. \n' +
                            '- Armed with a special toothpaste that could banish even the most stubborn plaque, Sharky swiftly dealt with any dental neglect among his fellow sea creatures. \n' +
                            '- His reputation as a tooth-brushing shark superhero spread far and wide, earning him admiration and respect from creatures great and small. \n' +
                            '- And so, with each swoosh of his toothbrush and flash of his smile, Sharky continued his noble mission to promote dental health throughout the ocean, one tooth at a time.'}/>
                        <OneChat id="3" name="Creeper" avatar="" content={
                            'Make another story'
                        }/>
                    </Box>
                    <PromptInput
                        onAltTable={()=>{setTableCreateOpen(true);}}
                        onSend={()=>{alert("send")}} />
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
