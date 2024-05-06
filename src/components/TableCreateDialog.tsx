import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import '../css/BotChatPage.css';
import { Prompt, getPromptList } from '../service/BotChat';
import { TableCreateInput } from "./Inputs";
import theme from "./theme";

const TableCreateDialog =
    ({
        botId,
        historyId,
        open,
        handleClose,
        handleSubmit
    }: {
        botId: string | undefined;
        historyId: number;
        open: boolean;
        handleClose: () => void;
        handleSubmit: () => void;
    }) => {

        const { t } = useTranslation();
        const [promptList, setPromptList] = useState<Prompt[]>([]);

        useEffect(() => {
            const getPrompt = async () => {
                const list = await getPromptList(historyId, botId);
                console.log('promptList:', list);
                if (list !== null) {
                    setPromptList(list);
                }
            };
            getPrompt();
        }, [historyId, botId]);

        return (
            promptList.length === 0 ? <></> :
            <Dialog
                open={open}
                onClose={() => { handleClose(); }}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        handleSubmit();
                        handleClose();
                    },
                    style: {
                        borderRadius: 32,
                        padding: 50,
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }}
            >
                <DialogTitle className="table-create-title">
                    {'Assistant Name'}
                </DialogTitle>
                <DialogContent>
                    {promptList.map((prompt, index) => (
                        <TableCreateInput
                            key={index}
                            title={prompt.promptKey}
                            placeholder={prompt.promptValue}
                            name={`item${index + 1}`}
                        />
                    ))}
                </DialogContent>
                <DialogActions
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        className="drawer-button"
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                        }}
                        onClick={handleClose}
                    >{t('Cancel')}
                    </Button>
                    <Button
                        className="drawer-button"
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                        }}
                        type="submit"
                    >{t('Submit')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

export default TableCreateDialog;
