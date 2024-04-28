import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import BotCarousel from '../components/BotCarousel';
import BotDetailCard from '../components/BotDetailCard';
import { CommentInput } from '../components/Inputs';
import OneChat from '../components/OneChat';
import { Comment, botDetailInfo, getBotComments, getBotDetail } from '../service/BotDetail';

import '../css/App.css';
import '../css/BotDetailPage.css';

// 评论


// bot详情页
const BotDetailPage: React.FC = () => {
    const [bot, setBot] = useState<botDetailInfo | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);

    let { id } = useParams<{ id: string }>();

    const getBot = async () => {
        if (id) {
            const bot = await getBotDetail(id);
            if (bot)
                setBot(bot);
        }
    }

    const getComments = async () => {
        if (id) {
            const comments = await getBotComments(id);
            setComments(comments.items);
        }
    }

    useEffect(() => {
        getBot();
        getComments();
    }, [id]);

    return [
        <div className="main-container bot-detail-container">

            <BotDetailCard
                id={bot?.id || ''}
                name={bot?.name || ''}
                author={bot?.creator || ''}
                avatar={bot?.avatar || ''}
                description={bot?.description || ''}
                likeNumber={bot ? bot.likeNumber.toString() : ''}
                starNumber={bot ? bot.starNumber.toString() : ''}
                isLiked={bot?.liked || false}
                isStarred={bot?.starred || false}
                isCreator={bot?.asCreator || false}
            />

            <BotCarousel photos={bot?.photos || []} />

            <Typography
                sx={{ color: 'primary.light' }}
                align='left'
            >
                <p className='bot-detail-long'>
                    {bot?.detail}
                </p>
            </Typography>

            <CommentInput onSend={
                (content: string) => {
                    setComments([
                        {
                            id: '123',
                            name: 'AAA 互联网应用 bug 维修',
                            avatar: '/assets/user-default.png',
                            content: content
                        },
                        ...comments || []
                    ]);
                }
            } />

            <Box>
                {comments?.map((comment) => (
                    <OneChat
                        id={comment.id}
                        name={comment.name}
                        avatar={comment.avatar}
                        content={comment.content}
                    />
                ))}
            </Box>
        </div>
    ];
}

export default BotDetailPage;
