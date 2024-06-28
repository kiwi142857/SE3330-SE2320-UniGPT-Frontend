import { Box, Card, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import '../css/Home.css';
import { User } from '../service/user';
export interface UserListType {
    type: 'Market';
}

function UserListCard({ User }: { User: User }) {
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

export function UserList({ type, users }: { type: UserListType, users: User[] | null; }) {

    
    console.log("type", type);
    
    return (
        <>
            {users == null ? <></> :
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container item spacing={4}>
                        
                        {users.map(user => (
                            <Grid item xs={4} key={user.id}>
                                <UserListCard User={user} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>}
        </>
    );
};