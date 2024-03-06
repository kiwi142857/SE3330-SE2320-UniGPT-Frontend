import React from "react";
import {Box, Fab} from "@mui/material";
import BasicInput from "./BasicInput";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import '../css/BotChatPage.css'

// botChat页的prompt输入框
const PromptInput = ()=> {
    return (
        <Box className="prompt-input-container">
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
    );
};
export default PromptInput;
