import React from 'react';
import Navigator from '../components/Navigator';
import BotList from '../components/botList';
import Grid from '@mui/material/Grid';

// 首页
const HomePage: React.FC = () => {
    return (
        <div>
            <Navigator></Navigator>
            <img src="/assets/home-background.png" alt="home-bg" className='home-bg' />
            <Grid container spacing={8} className='bot-box' >
                <Grid item xs={6}>
                    <BotList></BotList>
                </Grid>
                <Grid item xs={6}>
                    <BotList></BotList>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;