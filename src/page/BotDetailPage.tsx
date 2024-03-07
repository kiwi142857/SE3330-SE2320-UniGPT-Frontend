import { Comment } from '@mui/icons-material';
import { List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import BotCarousel from '../components/BotCarousel';
import BotDetailCard from '../components/BotDetailCard';
import CommentInput from '../components/CommentInput';
import Navigator from '../components/Navigator';
import OneChat from '../components/OneChat';
import { getBotComments, getBotDetail } from '../service/BotDetail';

import '../css/App.css'
import '../css/BotDetailPage.css'

// 并不是bot的全部信息，但是对于应用市场来说够用了
interface BotDetail {
    id: string;
    name: string;
    author: string;
    avatar: string;
    description: string;
    detail: string;
    photos: string[];
    like: number;
    collect: number;
}

// 评论
interface Comment {
    id: string;
    name: string;
    avatar: string;
    content: string;
}

// bot详情页
const BotDetailPage: React.FC = () => {
    const [bot, setBot] = useState<BotDetail | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [newComment, setNewComment] = useState<string>('');

    const handleCommentSubmit = () => {
        console.log('submit comment:', newComment);
    };

    let { id } = useParams<{id: string}>();

    const getBot = async () => {
        if (id) {
            const bot = await getBotDetail(id);
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
            <Navigator/>,
            <div className="main-container bot-detail-container">

                <BotDetailCard
                    id={bot?.id || ''}
                    name={bot?.name || ''}
                    author={bot?.author || ''}
                    avatar={bot?.avatar || ''}
                    description={bot?.description || ''}
                    like={bot?.like.toString() || ''}
                    collect={bot?.collect.toString() || ''}
                />
                <BotCarousel photos={bot?.photos || []} />
                <Typography
                    sx={{color: 'primary.light'}}
                    align='left'
                >
                    <p className='bot-detail-long'>
                        {bot?.detail}
                    </p>
                </Typography>

                <CommentInput/>

                <List>
                    {comments?.map((comment) => (
                        <OneChat
                            id={comment.id}
                            name={comment.name}
                            avatar={comment.avatar}
                            content={comment.content}
                        />
                    ))}
                </List>
            </div>
        ];
}

export default BotDetailPage;
