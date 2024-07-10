import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveIcon from '@mui/icons-material/Save';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import '../css/OneChat.css';

const calledList = ["Plugin 1", "knowledge base", "Plugin 2"];
const loadingList = ["Plugin 1", "knowledge base", "Plugin 2"];

// 聊天或评论区的一句对话
// 注意，只有一个单词的时候是不会换行的！
// type = true: bot
const OneChat = (
    { id, name, avatar, content, type, last = false, shuffleLast, editLast, loading }:
        {   id: number, name: string, avatar: string, content: string, 
            type: boolean, last: boolean, 
            shuffleLast: () => void, editLast: (editedContent: string) => void, loading: boolean 
        }
) => {
    const [pressCopy, setPressCopy] = useState(false);
    const [pressReplay, setPressReplay] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const { t } = useTranslation();

    const onSave = () => {
        editLast(editedContent);
        setEditing(false);
    }

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
                    {
                        type && !loading && calledList.length > 0 ?
                            <Accordion defaultExpanded 
                                style={{
                                    width: '90%',
                                    borderRadius: '4px', 
                                    backgroundColor: '#F5F5F5',
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className='one-chat-icon-and-text'>
                                        <MenuIcon />
                                        <Typography style={{ color: '#273B4A', fontWeight:'bold' }}>
                                            {t("Running Process")}
                                        </Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails style={{ paddingTop: '0' }}>
                                    {
                                        calledList.map((item, index) => (
                                            <div className='one-chat-icon-and-text' key={index}>
                                                <TaskAltIcon/>
                                                <Typography key={index}>
                                                    {"Called " + item}
                                                </Typography>
                                            </div>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion>
                            : null
                    }
                    {
                        editing ? (
                            <TextField
                                multiline
                                fullWidth
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        ) : (
                            loading && type ? (
                                loadingList.map((item, index) => (
                                    index !== loadingList.length - 1 ?
                                    <div className='one-chat-icon-and-text' key={index}>
                                        <TaskAltIcon/>
                                        <Typography key={index}>
                                            {"Called " + item}
                                        </Typography>
                                    </div> :
                                    <div className='one-chat-icon-and-text' key={index}>
                                        {/* <TailSpin color='grey' height={20} width={20}/> */}
                                        <RefreshIcon className='loading-spin'/>
                                        <Typography key={index}>
                                            {"Calling " + item + " ..."}
                                        </Typography>
                                    </div>
                                ))
                            ) : (
                                <ReactMarkdown>
                                    {content}
                                </ReactMarkdown>
                            )
                        )
                    }

                </div>

                <Grid container sx={{ marginLeft: 11, marginTop: 2 }} >
                    {
                        (type == true && loading == false) &&
                        // 复制按钮，浅灰色，左对齐，小号
                        <Grid>
                            <CopyToClipboard text={content}>
                                <ContentCopyIcon
                                    sx={{ color: pressCopy ? 'grey' : 'darkgrey', fontSize: 20 }}
                                    onMouseDown={() => setPressCopy(true)}
                                    onMouseUp={() => setPressCopy(false)}
                                />
                            </CopyToClipboard>
                        </Grid>
                    }

                    {
                        (type == true && last == true && !loading) &&
                        // 重新生成按钮，浅灰色，小号
                        <Grid>
                            <ReplayIcon
                                sx={{ color: pressReplay ? 'grey' : 'darkgrey', fontSize: 20, marginLeft: 2 }}
                                onMouseDown={() => setPressReplay(true)}
                                onMouseUp={() => setPressReplay(false)}
                                onClick={() => shuffleLast()}
                                data-testid="replay-button"
                            />
                        </Grid>
                    }

                    {
                        (type == false && last == true) && (
                            editing ? (
                                // 保存，浅灰色，小号
                                <Grid>
                                    <SaveIcon
                                        sx={{ color: 'grey', fontSize: 20 }}
                                        onClick={onSave}
                                        data-testid="save-button"
                                    />
                                </Grid>
                            ) : (
                                // 编辑，浅灰色，小号
                                <Grid>
                                    <EditIcon
                                        sx={{ color: 'grey', fontSize: 20 }}
                                        onClick={() => setEditing(true)}
                                        data-testid="edit-button"
                                    />
                                </Grid>)
                        )
                    }
                </Grid>
            </div >
            <br />
            <Divider />
        </>);
};


export default OneChat;
