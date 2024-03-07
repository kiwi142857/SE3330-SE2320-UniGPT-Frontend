import React from "react";
import {Box} from "@mui/system";
import {Button, IconButton, ListItem, ListItemButton, Typography} from "@mui/material";
import theme from './theme';
import '../css/BotChatPage.css'

const ChatHistoryItem = ({title, message, selected} : {title:string, message: string, selected: boolean})=> {
    return (
        <ListItemButton className="drawer-item chat-history-item">
            <div className="drawer-item-container">
                <div className="drawer-item-title">{title}</div>
                <div className="drawer-item-content"
                     style={{color: theme.palette.primary.light}}>{message}</div>
            </div>
        </ListItemButton>
    );
};

export default ChatHistoryItem;
