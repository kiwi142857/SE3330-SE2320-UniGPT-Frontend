import { Avatar, Divider, Grid } from '@mui/material';
import React from 'react';
import '../css/OneChat.css';

interface Chat {
    id: string;
    name: string;
    avator: string;
    content: string;
}

const OneChat = ({ chat }: { chat: Chat }) => {
  return [
    <div className='one-chat-container'>
        <div>
            <Grid container className='one-chat-header'>
                <Grid>
                    <Avatar 
                        alt={chat.name} 
                        src={chat.avator} 
                        className='one-chat-avator'
                    />
                </Grid>
                <Grid className='one-chat-name'>
                    {chat.name}
                </Grid>
            </Grid>
        </div>
        <div className='one-chat-content'>   
            {chat.content}
        </div>
      </div>,
    <Divider />
  ];
    
}

export default OneChat;