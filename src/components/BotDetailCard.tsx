import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import '../css/BotDetailPage.css';

// bot详情页的最上方的简介
const BotDetailCard = ({id, name, author, avatar, description, like, collect}
    : {id:string ; name:string; author:string; avatar:string; description:string; like:string; collect:string;}) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [isCollected, setIsCollected] = React.useState(false);

    return (
        <div className='detail-card-container'>
            <img
                src={avatar}
                alt='bot'
                className='detail-card-avatar'
            ></img>
            <div className='detail-card-right'>
                <Typography sx={{color: 'primary.main'}}>
                    <p className='detail-card-name'>
                        {name}
                    </p>
                </Typography>
                <Typography sx={{color: 'primary.light'}}>
                    <p className='detail-card-author'>
                        {`@${author}`}
                    </p>
                </Typography>
                <Typography sx={{color: 'primary.light'}}>
                    <p className='detail-card-description'>
                        {description}
                    </p>
                </Typography>
                <div className='detail-card-btn-group'>
                    {isLiked ? (
                            <FavoriteIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsLiked(false)}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsLiked(true)}
                            />
                    )}
                    <span className='detail-card-like'>
                        {isLiked ? parseInt(like) + 1 : like}
                    </span>
                    {isCollected ? (
                            <StarIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsCollected(false)}
                            />
                        ) : (
                            <StarBorderIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsCollected(true)}
                            />
                    )}
                    <span className='detail-card-collect'>
                        {isCollected ? parseInt(collect) + 1 : collect}
                    </span>
                    <Button variant="contained" endIcon={<SendIcon />} href={'/botchat'}>
                        Use
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BotDetailCard;
