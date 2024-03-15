import React from "react";
import {Button, ListItem} from "@mui/material";
import theme from "./theme";
import '../css/BotChatPage.css'
const BotBriefCard = () => {
    return (
        <ListItem
            className="drawer-item"
            style={{backgroundColor: theme.palette.secondary.main}}
        >
            <div className="drawer-item-container">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                }}>
                    <img
                        src={"/assets/bot-default.png"}
                        alt='bot'
                        className='brief-card-avatar'
                    ></img>
                    <Button
                        className="drawer-button"
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                        }}
                    >
                        Modify
                    </Button>
                </div>
                <div className="drawer-item-title">
                    name
                </div>
                <div
                    className="drawer-item-content"
                    style={{color: theme.palette.primary.light}}
                >
                    description
                </div>
            </div>
        </ListItem>
    );
};

export default BotBriefCard;
