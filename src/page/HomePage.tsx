import React from 'react';
import Navigator from '../components/Navigator';
import BotList from '../components/botList';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import '../css/Home.css';
// 首页
const HomePage: React.FC = () => {
    return (
        <div>
            <Navigator></Navigator>
            <div>
                <img src="/assets/home-background.png" alt="home-bg" className='home-bg' />
                <Typography className='home-image-text'>Welcome to your own AI assistant.</Typography>
            </div>

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
    ;
;
;
export default HomePage;