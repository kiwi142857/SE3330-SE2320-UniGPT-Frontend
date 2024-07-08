import { Box, Grid } from '@mui/material';
import React from 'react';
import '../css/Home.css';
import { User } from '../service/user';
import ListCard from './ListCard';

export function UserList({ users }: { users: User[] }) {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container item spacing={4}>
                {users.map(user => (
                    <Grid item xs={4} key={user.id}>
                        <ListCard 
                            link={'/profile/' + user.id}
                            avatar={user.avatar ? user.avatar : '/assets/user-default.png'}
                            name={user.name}
                            description={user.description}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};