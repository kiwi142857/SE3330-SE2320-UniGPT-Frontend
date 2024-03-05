import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import '../css/BotDetailPage.css';


const BotDetailCard = ({id, name, author, avator, description, like, collect} 
    : {id:string ; name:string; author:string; avator:string; description:string; like:string; collect:string;}) => {
    return (
        <div className='detail-card-container'>
            <img
                src={avator}
                alt='bot'
                className='detail-card-avator'
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
                    <FavoriteBorderIcon 
                        sx={{color: 'primary.main'}}
                        fontSize='large'
                    />
                    <span className='detail-card-like'>
                        {like}
                    </span>
                    <StarBorderIcon 
                        sx={{color: 'primary.main'}}
                        fontSize='large'
                    />
                    <span className='detail-card-collect'>
                        {collect}
                    </span>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Use
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BotDetailCard;