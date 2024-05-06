import React from "react";
import { Button, ListItem } from "@mui/material";
import theme from "./theme";
import '../css/BotChatPage.css'
import { useTranslation } from "react-i18next";
import { BotBriefInfo } from "../service/BotChat";

const BotBriefCard = ({ botBriefInfo }: { botBriefInfo: BotBriefInfo | null }) => {
    const { t } = useTranslation();
    if (!botBriefInfo) return null;
    return (
        <ListItem
            className="drawer-item"
            style={{ backgroundColor: theme.palette.secondary.main }}
        >
            <div className="drawer-item-container">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                }}>
                    <img
                        src={botBriefInfo.avatar}
                        alt='bot'
                        className='brief-card-avatar'
                    ></img>
                    {
                        botBriefInfo.asCreator &&
                        <Button
                            className="drawer-button"
                            style={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                            }}
                            href={'/botedit/' + botBriefInfo.id}
                        >
                            {t('Edit')}
                        </Button>
                    }

                </div>
                <div className="drawer-item-title" style={{ marginTop: 10 }}>
                    {botBriefInfo.name}
                </div>
                <div
                    className="drawer-item-content"
                    style={{ color: theme.palette.primary.light }}
                >
                    {botBriefInfo.description}

                </div>
            </div>
        </ListItem>
    );
};

export default BotBriefCard;
