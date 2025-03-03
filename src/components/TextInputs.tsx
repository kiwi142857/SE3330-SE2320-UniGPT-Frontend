import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../css/BotChatPage.css";
import "../css/BotEditPage.css";
import "../css/DetailPage.css";
import { LanguageContext } from "../provider/LanguageProvider";
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';
import MdEditor from './MdEditor';

// botDetail页的评论输入框
export function CommentInput({ onSend }: { onSend: (content: string) => void }) {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [message, setMessage] = useState('');

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault();
            onSend(message);
            setMessage('');
        }
    };

    return (
        <Grid container className='comment-input-container'>
            <Grid xs={11}>
                <BasicInput
                    placeholder={t('Enter your comment here...')}
                    name='prompt'
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    value={message}
                />
            </Grid>
            <Grid xs={1}>
                <Fab
                    variant="extended"
                    size="large"
                    sx={{ color: 'secondary.main' }}
                    data-testid = 'send-button'
                    onClick={() => {
                        onSend(message);
                        setMessage('');
                    }}
                >
                    <ArrowCircleUpIcon
                        fontSize='large'
                        style={{ color: 'white' }}
                    />
                </Fab>
            </Grid>
        </Grid>
    );
};

// botEdit页的markDown输入框
export function MarkdownInput
    ({
        placeholder,
        name,
        value,
        onChange
    }: {
        placeholder: string,
        name: string,
        value: string,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return [
        <Grid container>
            <Grid item xs={11}>
                <BasicInput
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    multiline={false}
                    onChange={onChange}
                    required
                    maxRows={1}
                />
            </Grid>
            <Grid item xs={1}>
                <div className='oneprompt-element'>
                    <IconButton
                        sx={{ backgroundColor: 'secondary.main' }}
                        onClick={handleOpen}
                        data-testid='edit-markdown-button'
                    >
                        <EditIcon />
                    </IconButton>
                </div>
            </Grid>
        </Grid>,

        <Modal
            open={open}
            onClose={handleClose}
        >
            <>
                <Box sx={
                    {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }
                }>
                    <MdEditor
                        onChange={onChange}
                        value={value}
                    />
                </Box>
                <Button onClick={handleClose}>
                    Exit
                </Button>
            </>
        </Modal>
    ];
}

// botEdit页的promptList中的few-shot
export function OneFewShotInput
    ({
        index,
        select,
        content,
        onFewShotChange,
        handleDelete
    }: {
        index: number,
        select: string,
        content: string,
        onFewShotChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleDelete: (index: number) => void
    }) {

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <div className='oneprompt-element'>
                    <IconButton
                        sx={{ backgroundColor: 'secondary.main' }}
                        onClick={() => handleDelete(index)}
                        data-testid='delete-few-shot-button'
                    >
                        <RemoveIcon />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={11}>
                <EditLayout title={select} leftSpace={1} rightSpace={11}>
                    <MarkdownInput
                        placeholder={t('Prompt for this item')}
                        name='oneFewShot'
                        value={content}
                        onChange={onFewShotChange}
                    />
                </EditLayout>
            </Grid>
        </Grid>
    );
}

// BotChat页的终端输入框
export function ChatInput
    ({
        selectedHistoryId,
        onAltTable,
        onSend,
        disabled
    }: {
        selectedHistoryId: number,
        onAltTable: () => void,
        onSend: (content: string) => void,
        disabled: boolean
    }
    ) {
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault();
            onSend(message);
            setMessage('');
        }
    };

    return (
        <Box className="prompt-input-container">
            <Fab
                onClick={onAltTable}
                variant="extended"
                size="large"
                style={{ color: 'white', margin: '20px' }}
                data-testid='create-table-button'
            >
                <ArticleIcon fontSize='large' />
            </Fab>
            {
                selectedHistoryId === 0 ?
                    <></> :
                    <>
                        <div style={{ width: '604px', margin: '20px' }}>
                            <BasicInput
                                placeholder={t('Enter your message here...')}
                                name="message"
                                onChange={(event) => {
                                    setMessage(event.target.value);
                                }}
                                value={message}
                                onKeyDown={handleKeyDown}
                                lock={disabled}
                            />
                        </div>
                        <Fab
                            disabled={message === ''}
                            onClick={() => {
                                onSend(message);
                                setMessage('');
                            }}
                            variant="extended"
                            size="large"
                            style={{ color: 'white' }}
                            data-testid='send-button'
                        >
                            <ArrowCircleUpIcon fontSize='large' />
                        </Fab>
                    </>
            }
        </Box>
    );
}

export function TableCreateInput({
    key,
    title,
    placeholder,
    name,
    lock,
    onInputChange,
    dealWithEnter
}: {
    key: number,
    title: string,
    placeholder: string,
    name: string
    lock: boolean
    onInputChange: (value: string) => void
    dealWithEnter: () => void
}) {
    const handleChange = (event: { target: { value: string; }; }) => {
        onInputChange(event.target.value); // 将输入框的值传递给父组件
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault();
            dealWithEnter();
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Typography
                className='table-create-edit-label'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '140px'
                }}
                sx={{ color: 'primary.main' }}
            >
                {title}
            </Typography>
            <div style={{ width: '604px', margin: '20px' }}>
                <BasicInput
                    placeholder={placeholder}
                    name={name}
                    lock={lock}
                    onChange={handleChange} // 触发 onChange 事件
                    onKeyDown={handleKeyDown}
                    id={name}
                />
            </div>
        </Box>);
}
