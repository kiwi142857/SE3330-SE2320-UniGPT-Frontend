import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from '@mui/icons-material/Article';
import {
    Container, Divider,
    Drawer,
    Fab,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';
import BasicInput from '../components/BasicInput';
import Navigator from '../components/Navigator';
import OneChat from "../components/OneChat";
import ChatHistoryItem from "../components/ChatHistoryItem";

import '../css/App.css'
import '../css/BotChatPage.css'
import Chats from "../components/Chats";

// bot聊天页
let drawerWidth = 240;
const BotChatPage = () => {
    return (
        <>
            <Navigator />
            <div style={{ display: 'flex' , flexDirection: 'row' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <div className="main-container bot-chat-container">
                        <Container>
                            <List>
                                <Chats/>
                            </List>
                        </Container>
                    </div>
                    <div>
                        <Box
                            style={{
                                display: 'flex',
                                position: 'fixed',
                                bottom: 0,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <Fab variant="extended" size="large" style={{color: 'white'}}>
                                <ArticleIcon fontSize='large'/>
                            </Fab>
                            <div style={{width: '604px', margin: '20px'}}>
                                <BasicInput placeholder="Enter your message here..." name="message"/>
                            </div>
                            <Fab variant="extended" size="large" style={{color: 'white'}}>
                                <ArrowCircleUpIcon fontSize='large'/>
                            </Fab>
                        </Box>
                    </div>
                </Box>
            </div>
        </>
    );
}

export default BotChatPage;
