import { Favorite } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../provider/LanguageProvider";
import GetBotInfo from '../service/BotInfo';
import { getUserFavoriteBots } from '../service/user';
import { getUerUsedBots } from '../service/user';
import { useState } from 'react';
import BotCard from './BotCard';
import {Bot} from '../service/bot';


export interface BotListType {
    type: 'Favorite' | 'Recently used' | 'Market' | 'Profile';
}

function HomeMarketCard() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);
    return (
        <Link href='/market' style={{ textDecoration: 'none', width: '30%', height: '30%', borderRadius: '20px' }}>
            <Card elevation={0}>
                <ShoppingCartOutlinedIcon style={{ width: '30%', height: '30%', marginTop:'20%', color:'#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                        {t("More from market")}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function HomeCreateCard() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <Link href='/botcreate' style={{ textDecoration: 'none' }} >
            <Card elevation={0}>
                <AddCircleOutlineIcon style={{ width: '30%', height: '30%', marginTop:'20%', color:'#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                       {t(" Create your new bot")}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function RecentUsedHeader() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <div style={{marginLeft:'20px', marginTop:'10px'}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton>
                        <AccessTimeFilledIcon fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>{t('Recently Used')}</Typography>
                </Grid>
            </Grid>
            <Divider  className='Divider'/>
        </div>
    );
}

export function FavoriteHeader() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);
    return (
        <div style={{marginLeft:'60px', marginTop:'10px'}}>
            <Grid container alignItems="center" spacing={3}>
                <Grid item>
                    <IconButton>
                        <Favorite fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>{t('Favorite')}</Typography>
                </Grid>
            </Grid>
            <Divider  className='Divider'/>
        </div>
    );
}

export interface BotListProps {
    type: 'Favorite' | 'Recently used' | 'Market' | 'Profile';
}


export default function BotList({ type, userId, page, pageSize }: { type: 'Recently used' | 'Favorite', userId: number, page: number, pageSize: number }) {
    
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchBots = async () => {
            let response;
            if(type == "Recently used")
                response = await getUerUsedBots(userId, page, pageSize);
            else
                response = await getUserFavoriteBots(userId, page, pageSize);
                
            setBots(response.bots);
        };
        fetchBots();
    }, []);

    console.log(bots);
    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginLeft: type === 'Favorite' ? '60px' : '0', marginRight: type === 'Favorite' ? '0' : '80px' }}>
            <Grid container spacing={1}>
                <Grid container item spacing={2}>
                    <Grid item xs={4}>
                    {type === 'Favorite' ? <HomeMarketCard /> : <HomeCreateCard></HomeCreateCard>}
                    </Grid>
                    {bots.map(bot => (
                        <Grid item xs={4} key={bot.id}>
                            <BotCard Bot={bot} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export function MyBotList({type,bots}: {type: BotListType, bots: Bot[]}) {

    const boxStyle = {
        type : 'Favorite' ? {marginLeft:'60px', marginRight:'0'} : {marginLeft:'0', marginRight:'80px'}
    };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={1}>
                <Grid container item spacing={6}>
                    {bots.map(bot => (
                        <Grid item xs={4} key={bot.id}>
                            <BotCard Bot={bot} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}