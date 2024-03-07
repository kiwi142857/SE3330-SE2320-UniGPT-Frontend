import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Avatar, Button, Grid, Typography } from '@mui/material';

export default function UserCard() {
    return (
        <Grid container spacing={5} >
            <Grid item spacing={2}>
                <div style={{ position: 'relative' }}>
                    <Avatar alt="user-default" src="/assets/user-default.png" sx={{ width: 100, height: 100 }} />
                    <div className="avatar-overlay">Change your avatar</div>
                </div>
            </Grid>
            <Grid item spacing={2}>
                    <Grid container spacing={2} >
                        <Grid item spacing={2}>
                            <Typography className='user-name'>Username</Typography>
                        </Grid>
                        <Grid item spacing={4}>
                            <Button className='change-button'>change</Button>
                        </Grid>
                    </Grid>
                    <Typography className='email'>@jaccount</Typography>
                    <Typography className='description' maxWidth={'80%'}>Your description here.
                        Your description here.
                        Your description here.
                        Your description here.
                        Your description here.
                        Your description here.
                    </Typography>
            </Grid>
            <Grid item spacing={8}>
            </Grid>
        </Grid>
    );
};