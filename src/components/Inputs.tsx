import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from "@mui/icons-material/Article";
import { Box, Button, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import "../css/BotChatPage.css";
import "../css/BotDetailPage.css";
import "../css/BotEditPage.css";
import BasicInput from './BasicInput';

// botDetail页的评论输入框
export function CommentInput () {
    const { t } = useTranslation();

    return (
            <Grid container className='comment-input-container'>
                <Grid xs={11}>
                    <BasicInput
                        placeholder={t('Enter your comment here...')}
                        name='prompt'
                    />
                </Grid>
                <Grid xs={1}>
                    <Fab
                        variant="extended"
                        size="large"
                        sx={{color:'secondary.main'}}
                    >
                        <ArrowCircleUpIcon
                            fontSize='large'
                            style={{ color:'white' }}
                        />
                    </Fab>
                </Grid>
            </Grid>
    );
};

// botEdit页的项目输入框
export function EditInput ({title, placeholder, name}:{title:string; placeholder:string; name:string}) {
    return (
        <Grid container>
            <Grid item xs={2}>
                    <Typography
                        className='edit-label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        sx={{color: 'primary.main'}}
                    >
                        <p>{title}</p>
                    </Typography>
            </Grid>
            <Grid item xs={10}>
                <BasicInput
                    placeholder={placeholder}
                    name={name}
                    required
                />
            </Grid>
        </Grid>
    );
}

// botEdit页的promptList的输入框
export function PromptListInput ({onPromptClick}:{onPromptClick:()=>void}) {
    const { t } = useTranslation();

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}/>
            <Grid item xs={2}>
                <BasicInput
                    placeholder={t('Item Name')}
                    name='itemName'
                />
            </Grid>
            <Grid item xs={8}>
                <BasicInput
                    placeholder={t('Prompt for this item' )}
                    name='prompt'
                />
            </Grid>
            <Grid item xs={5}/>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    onClick={onPromptClick}
                    sx={{backgroundColor: 'primary.light'}}
                >
                    {t('add prompt')}
                </Button>
            </Grid>
        </Grid>
    );
}


// BotChat页的终端输入框
export function PromptInput
({
     onAltTable,
     onSend
}: {
    onAltTable: ()=>void,
    onSend: (content: string)=>void}
){
    const [message, setMessage] = useState('');
    const {t} = useTranslation();
    return (
        <Box className="prompt-input-container">
            <Fab
                onClick={onAltTable}
                variant="extended"
                size="large"
                style={{color: 'white'}}
            >
                <ArticleIcon fontSize='large'/>
            </Fab>
            <div style={{width: '604px', margin: '20px'}}>
                <BasicInput
                    placeholder={t('Enter your message here...')}
                    name="message"
                    onChange={(event)=> {
                        setMessage(event.target.value);
                    }}
                    value={message}
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
                style={{color: 'white'}}>
                <ArrowCircleUpIcon fontSize='large'/>
            </Fab>
        </Box>
    );
}

export function TableCreateInput({
         title,
         placeholder,
         name
    }:{
        title: string,
        placeholder: string,
        name:string}) {
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
                    alignItems: 'center'
                }}
                sx={{color: 'primary.main'}}
            >
                {title}
            </Typography>
            <div style={{width: '604px', margin: '20px'}}>
                <BasicInput placeholder={placeholder} name={name}/>
            </div>
        </Box>);
}
