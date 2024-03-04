import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigator from '../components/Navigator';
import OneChat from '../components/OneChat';
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
        <List>
            {comments?.map((comment) => (
                <OneChat chat={comment} />
            ))}
        </List>
    ]; 
    
}

export default BotDetailPage;