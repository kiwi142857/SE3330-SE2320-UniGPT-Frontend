import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Avatar, Divider, Grid } from '@mui/material';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import '../css/OneChat.css';

// 聊天或评论区的一句对话
// 注意，只有一个单词的时候是不会换行的！
const OneChat = ({ id, name, avatar, content, type }: { id: number, name: string, avatar: string, content: string, type: boolean }) => {
    const [pressCopy, setPressCopy] = React.useState(false);


    return (
        <>
            <div className='one-chat-container'>
                <div>
                    <Grid container className='one-chat-header'>
                        <Grid>
                            <Avatar
                                alt={name}
                                src={avatar}
                                className='one-chat-avatar'
                            />
                        </Grid>
                        <Grid className='one-chat-name'>
                            {name}
                        </Grid>
                    </Grid>
                </div>
                <div className='one-chat-markdown'>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                {
                    (type == true) &&
                    // 复制按钮，浅灰色，左对齐，小号
                    <div>
                        <Grid container sx={{ marginLeft: 11, marginTop: 2 }}>
                            <Grid>
                                <CopyToClipboard text={content}>
                                    <ContentCopyIcon
                                        sx={{ color: pressCopy ? 'grey' : 'darkgrey', fontSize: 20 }}
                                        onMouseDown={() => setPressCopy(true)}
                                        onMouseUp={() => setPressCopy(false)}
                                    />
                                </CopyToClipboard>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
            <br />
            <Divider />
        </>);
};


export default OneChat;
