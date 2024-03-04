import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import BotCarousel from '../components/BotCarousel';
import Navigator from '../components/Navigator';
import OneChat from '../components/OneChat';
import '../css/BotDetailPage.css';
import { getBotComments, getBotDetail } from '../service/BotDetail';

// 并不是bot的全部信息，但是对于应用市场来说够用了
interface BotDetail {
    id: string;
    name: string;
    author: string;
    avator: string;
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
    avator: string;
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
            <div className='bot-detail-container'>
                <BotCarousel photos={bot?.photos || []} />
                <List>
                    {comments?.map((comment) => (
                        <OneChat chat={comment} />
                    ))}
                </List>
            </div>
        ]; 
}

export default BotDetailPage;