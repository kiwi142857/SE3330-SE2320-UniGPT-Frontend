import ChatHistoryItem from "./ChatHistoryItem";
import {Divider, List} from "@mui/material";
import React, {useState} from "react";
import theme from './theme';
import '../css/BotChatPage.css'

interface ChatHistory {
    title: string,
    message: string,
}
//暂时将数据写死
const chatHistoryData: ChatHistory[] = [
    {
        title: "History1",
        message: "message1...",
    },
    {
        title: "History2",
        message: "message2...",
    },
    {
        title: "History3",
        message: "message3...",
    },
    {
        title: "History4",
        message: "message4...",
    },
];

const ChatHistoryList = ()=> {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return (
        <List>
            {chatHistoryData.map((chatHistory: ChatHistory,index) =>
                <React.Fragment key={index}>
                    <ChatHistoryItem
                        title={chatHistory.title}
                        message={chatHistory.message}
                        selected={false}
                    />
                    {index !== chatHistoryData.length - 1 &&
                        <Divider
                            className="drawer-divider"
                            style={{ backgroundColor: theme.palette.secondary.main}}
                        />}
                </React.Fragment>
            )}
        </List>
    )
};

export default ChatHistoryList;
