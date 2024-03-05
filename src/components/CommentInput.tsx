import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Grid } from "@mui/material";
import Fab from '@mui/material/Fab';
import React from "react";
import "../css/BotDetailPage.css";
import BasicInput from './BasicInput';

// botDetail页的评论输入框
const CommentInput = ()=> {
    return (
            <Grid container className='comment-input-container'>
                <Grid xs={11}>
                    <BasicInput 
                        placeholder='Write your comment here...' 
                        name='comment'
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
export default CommentInput;