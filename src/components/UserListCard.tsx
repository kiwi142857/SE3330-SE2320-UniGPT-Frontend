import * as React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../css/Home.css';
import { User } from '../service/user';


export default function UserListCard({ User }: { User: User }) {

  return (
    <Link href={'/profile/' + User.id} style={{ textDecoration: 'none' }} >
      <Card className='bot-card' style={{ height: '100%' }}>
        <CardMedia style={{ width: '70px', height: '70px', marginLeft: '5%', borderRadius: '20px', marginBottom: '0px', marginTop: '25px' }}
          component="img"
          image={User.avatar ? User.avatar : '/assets/user-default.png'}
          alt="bot-default"
        />
        <CardContent >
          <Typography className='bot-card-name'>
            {User.name}
          </Typography>
          <Typography variant="body2" align="left" color="text.secondary" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '0',
          }}>
            {User.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}