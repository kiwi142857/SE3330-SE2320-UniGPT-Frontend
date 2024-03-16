import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, Grid, Typography, TextField } from '@mui/material';

export default function UserCard() {
    const [description, setDescription] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('/assets/user-default.png');

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarSrc(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <Grid container spacing={5} >
            <Grid item spacing={2}>
                <div style={{ position: 'relative' }}>
                    <Avatar alt="user-default" src={avatarSrc} sx={{ width: 100, height: 100 }} />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                        style={{ display: 'none' }} 
                        id="avatar-input"
                    />
                    <label htmlFor="avatar-input" className="avatar-overlay">Change your avatar</label>
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
                <TextField
                    className='description' 
                    value={description} 
                    onChange={handleDescriptionChange} 
                    placeholder="Write your description here..."
                    multiline
                    style={{ height: '100px'}}
                />
            </Grid>
            <Grid item spacing={8}>
            </Grid>
        </Grid>
    );
};