import * as React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../css/Home.css';
import { BotInfo } from '../service/BotInfo';

type HomeBotCardProps = {
  BotInfo: BotInfo;
};

export default function HomeBotCard({BotInfo}: HomeBotCardProps) {

  return (
    <Link href='/bot1' style={{ textDecoration: 'none' }} >
      <Card className='bot-card'>
        <CardMedia style={{ width: '30%', height: '30%', marginLeft: '0', borderRadius: '20px' }}
          component="img"
          height="194"
          image={BotInfo.avator}
          alt="bot-default"
        />
        <CardContent>
          <Typography className='bot-card-name'>
            {BotInfo.name}
          </Typography>
          <Typography variant="body2" align="left" color="text.secondary">
            {BotInfo.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
