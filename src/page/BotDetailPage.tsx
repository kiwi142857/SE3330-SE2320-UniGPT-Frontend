import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import BotCarousel from '../components/BotCarousel';
import BotDetailCard from '../components/BotDetailCard';
import { CommentInput } from '../components/Inputs';
import OneChat from '../components/OneChat';
import { Comment, CommentList, botDetailInfo, getBotComments, getBotDetail, postComment } from '../service/BotDetail';

import SnackBar from '../components/Snackbar';
import '../css/App.css';
import '../css/BotDetailPage.css';


// bot详情页
const BotDetailPage: React.FC = () => {
    const [bot, setBot] = useState<botDetailInfo | null>(null);
    const [comments, setComments] = useState<CommentList>();

    const [alert, setAlert] = useState(false);

    let { id } = useParams<{ id: string }>();

    const getBot = async () => {
        if (id) {
            const bot = await getBotDetail(id);
            if (bot)
                setBot(bot);
            else
                setAlert(true);
        }
    }

    const getComments = async () => {
        if (id) {
            let com = await getBotComments(id, 0, 20);
            setComments(com);
        }
    }

    useEffect(() => {
        getBot();
        getComments();
    }, [id]);

    return [  <SnackBar
                    open={alert}
                    message="获取详细信息失败！"
                    setOpen={setAlert}
                />,
                
        bot && comments &&
        <div className="main-container bot-detail-container">

            <BotDetailCard
                id={bot.id || ''}
                name={bot.name || ''}
                author={bot.creator || ''}
                authorId={bot.creatorId || ''}
                avatar={bot.avatar || ''}
                description={bot.description || ''}
                likeNumber={bot.likeNumber.toString()}
                starNumber={bot.starNumber.toString()}
                isLiked={bot.liked || false}
                isStarred={bot.starred || false}
                isCreator={bot.asCreator || false}
            />

            <BotCarousel photos={bot.photos || []} />

            <Typography
                sx={{ color: 'primary.light' }}
                align='left'
            >
                <p className='bot-detail-long'>
                    {bot.detail}
                </p>
            </Typography>

            <CommentInput onSend={
                (content: string) => {
                    if (id)
                        postComment(id,content);
                }
            } />

            <Box>
                {comments.comments?.map((comment : Comment) => (
                    <OneChat
                        id={comment.id}
                        name={comment.userName}
                        avatar={comment.avatar}
                        content={comment.content}
                    />
                ))}
            </Box>
        </div>
    ];
}

export default BotDetailPage;
