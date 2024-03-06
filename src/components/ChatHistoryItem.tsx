import React from "react";
import {Box} from "@mui/system";
import {ListItem, ListItemButton, Typography} from "@mui/material";
import '../css/ChatHistory.css'
import theme from "./theme";

const ChatHistoryItem = ({title, message, selected} : {title:string, message: string, selected: boolean})=> {
    return (
        <ListItemButton className="chat-history-item">
            <div className="chat-history-item-title" >{title}</div>
            <div className="chat-history-item-message" style={{color: theme.palette.primary.light}}>{message}</div>
        </ListItemButton>
    );
};

export default ChatHistoryItem;
