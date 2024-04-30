import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import {HomeCreateCard} from "./BotList";
import BotCard from './BotCard';
import GetBotInfo from '../service/BotInfo';
import React from 'react';
import '../css/Market.css';



export default function MarketCard({bots}: { bots: bot[]}) {
    
    return (
        <div className='market-card'>
            <Grid container style={{ display: 'flex', alignItems: 'stretch' }}>
                <Grid container item spacing={5} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Grid item xs={4}>
                        <Card className='create-bot-card'>
                            <div style={{ height: '100%' }}>
                                <HomeCreateCard></HomeCreateCard>
                            </div>
                        </Card>
                    </Grid>
                    {bots.map(bot => (
                        <Grid item xs={4} key={bot.id}>
                            <BotCard Bot={bot} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}
