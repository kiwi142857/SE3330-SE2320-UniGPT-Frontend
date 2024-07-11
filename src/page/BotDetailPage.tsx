import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import BotCallsCard from '../components/CallsCard';
import DetailCard from '../components/DetailCard';
import DetailCarousel from '../components/DetailCarousel';
import OneComment from '../components/OneComment';
import { CommentInput } from '../components/TextInputs';
import '../css/App.css';
import '../css/DetailPage.css';
import { Comment, CommentList, botDetailInfo, getBotComments, getBotDetail, postCommentToBot } from '../service/BotDetail';
import { getMe } from '../service/user';

// bot详情页
const BotDetailPage: React.FC = () => {
    const [bot, setBot] = useState<botDetailInfo | null>(null);
    const [comments, setComments] = useState<CommentList>();
    const [user, setUser] = useState({ id: 0, name: '', avatar: '' });
    const [alert, setAlert] = useState(false);

    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    const getBot = async () => {
        if (id) {
            await getBotDetail(id)
                .then((res) => setBot(res))
                .catch(() => setAlert(true));
        }
    }

    const getComments = async () => {
        if (id) {
            await getBotComments(id, 0, 20)
                .then((com) => setComments(com))
                .catch(() => setComments({ total: 0, comments: [] }));
        }
    }

    const getUser = async () => {
        await getMe().then((res) => setUser(res))
            .catch(() => console.log('Failed to get user'));
    }

    const handleClose = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        getBot();
        getComments();
        getUser();
    }, [id]);

    return (
        <>
            {bot && comments && id &&
                <div className="main-container bot-detail-container">

                    <DetailCard
                        id={bot.id}
                        name={bot.name}
                        author={bot.creator}
                        authorId={bot.creatorId}
                        avatar={bot.avatar}
                        description={bot.description}
                        likeNumber={bot.likeNumber.toString()}
                        starNumber={bot.starNumber.toString()}
                        isLiked={bot.liked}
                        isStarred={bot.starred}
                        canEdit={bot.asCreator || bot.asAdmin}
                        forBot={true}
                    />

                    <BotCallsCard plugins={bot.plugins} />

                    <DetailCarousel photos={bot.photos} />

                    <Typography
                        sx={{ color: 'primary.light' }}
                        align='left'
                    >
                        <p className='bot-detail-long'>
                            {bot.detail}
                        </p>
                    </Typography>

                    <Tabs value="one">
                        <Tab value="one" label={
                            <div className='detail-comment-divider'>
                                {t('Comments')}
                            </div>} />
                    </Tabs>

                    <CommentInput onSend={
                        async (content: string) => {
                            postCommentToBot(id, content);

                            setComments({
                                total: comments.total + 1,
                                comments: [
                                    {
                                        id: 0,
                                        content: content,
                                        time: new Date(),
                                        userId: user.id,
                                        userName: user.name,
                                        avatar: user.avatar,
                                        botID: parseInt(id)
                                    },
                                    ...comments.comments
                                ]
                            });
                        }
                    } />

                    <Box>
                        {comments.comments?.map((comment: Comment) => (
                            <OneComment
                                id={comment.id}
                                name={comment.userName}
                                avatar={comment.avatar}
                                content={comment.content}
                                time={comment.time}
                                avatarLink={`/profile/${comment.userId}`}
                                key={comment.id}
                            />
                        ))}
                    </Box>
                </div>
            }

            <Dialog open={alert} onClose={handleClose}>
                <DialogTitle>
                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold', 
                        textAlign: 'center', fontSize: '32px' }}>
                        {t('Error')}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'primary.light', fontWeight: 'bold' }}>
                        <p>{t('The bot is not public anymore')}</p>
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        {t('Confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>);
}

export default BotDetailPage;
