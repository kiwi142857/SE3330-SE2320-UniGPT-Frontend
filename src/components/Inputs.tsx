import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {Box, Grid, Typography} from "@mui/material";
import Fab from '@mui/material/Fab';
import React from "react";
import "../css/BotDetailPage.css";
import "../css/BotEditPage.css";
import BasicInput from './BasicInput';
import ArticleIcon from "@mui/icons-material/Article";

// botDetail页的评论输入框
export function CommentInput () {
    return (
            <Grid container className='comment-input-container'>
                <Grid xs={11}>
                    <BasicInput
                        placeholder='Enter your message here...'
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

// botCreate页的项目输入框
export function EditInput ({title, placeholder, name}:{title:string; placeholder:string; name:string}) {
    return (
        <Grid container>
            <Grid item xs={2}>
                <Typography
                    className='edit-label'
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    sx={{color: 'primary.main'}}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <BasicInput
                    placeholder={placeholder}
                    name={name}
                />
            </Grid>
        </Grid>
    );
}


// BotChat页的终端输入框
const PromptInput = () => {
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
