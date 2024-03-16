import React from 'react';
import Navigator from '../components/Navigator';
import '../css/Profile.css';
import UserCard from '../components/UserCard';
import { Tab, Tabs } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BotCard from '../components/BotCard';
import GetBotInfo from '../service/BotInfo';
import HomeCreateCard from '../components/BotList';
// 个人主页

export function BotListTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Created" className='botlist-tab' />
                <Tab label="Favorite" className='botlist-tab' />
            </Tabs>
        </div>
    );
}

function ProfileBotList() {
    const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={1}>
                <Grid container item spacing={6}>
                    {ids.map(id => (
                        <Grid item xs={3} key={id}>
                            <BotCard BotInfo={GetBotInfo(id)} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

const ProfilePage: React.FC = () => {

    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');

    const onAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Navigator></Navigator>
            <div className='profile-container'>
                <UserCard></UserCard>
            </div>
            <div className='botlist-tabs'>
                <BotListTabs></BotListTabs>
            </div>
            <div className='botlist-container'>
                <ProfileBotList></ProfileBotList>
            </div>
        </>
    );
};

export default ProfilePage;