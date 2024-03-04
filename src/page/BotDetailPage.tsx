import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBotDetail, getBotComments } from '../service/BotDetail';
import { get } from 'http';

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
    user: string;
    avator: string;
    content: string;
}

interface Comments {
    total: number;
    comments: Comment[];
}

// bot详情页
const BotDetailPage: React.FC = () => {
    const [bot, setBot] = useState<BotDetail | null>(null);
    const [comments, setComments] = useState<Comments | null>(null);

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
            setComments(comments);
        }
    }

    useEffect(() => {
        getBot();
        getComments();
    }, [id]);

    return (
        <List>
            <div>
                bot detail page
            </div>
        </List>
    );
}

export default BotDetailPage;