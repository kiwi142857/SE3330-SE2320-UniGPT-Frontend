import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import '../css/Home.css';


export default function ListCard({ link, avatar, name, description }: 
  { link: string, avatar: string, name: string, description: string }) {
  return (
    <Link href={link} style={{ textDecoration: 'none' }} >
      <Card className='bot-card' style={{ height: '100%' }}>
        <CardMedia style={{ width: '70px', height: '70px', marginLeft: '5%', borderRadius: '20px', marginBottom: '0px', marginTop: '25px' }}
          component="img"
          image={avatar}
          alt="default"
        />
        <CardContent >
          <Typography className='bot-card-name'>
            {name}
          </Typography>
          <Typography variant="body2" align="left" color="text.secondary" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '0',
          }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}