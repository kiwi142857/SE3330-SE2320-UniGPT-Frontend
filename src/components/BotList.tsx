import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Card, CardContent, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Market.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { Bot } from '../service/market';
import ListCard from './ListCard';


export interface BotListType {
    type: 'Favorite' | 'Recently used' | 'Market' | 'Profile';
}

export function HomeListHeader({icon, title}: {icon: React.ReactNode, title: string}) {
    return (
        <div style={{ marginLeft: '20px', marginTop: '10px' }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton>
                        {icon}
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>
                        {title}
                    </Typography>
                </Grid>
            </Grid>
            <Divider className='Divider' />
        </div>
    );
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
                <ShoppingCartOutlinedIcon style={{ width: '30%', height: '30%', marginTop: '20%', color: '#666666' }} />
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
                <AddCircleOutlineIcon style={{ width: '30%', height: '30%', marginTop: '20%', color: '#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                        {t(" Create your new bot")}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function MarketCreateCard({link,text}: {link: string, text: string}) {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <Link href={link} style={{ textDecoration: 'none' }} >
            <Card elevation={0}>
                <AddCircleOutlineIcon style={{ width: '20%', height: '10%', marginTop: '10%', color: '#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                        {t(text)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function BotList({ type, bots }: { type: BotListType, bots: Bot[] | null; }) {

    const boxStyle = type.type === 'Favorite' ? 
        { marginLeft: '20px', marginRight: '0' } : { marginLeft: '0', marginRight: '20px' };

    console.log("type", type, "boxStyle", boxStyle);
    const PrefixComponent = () => {
        if (type.type === 'Favorite') {
            return <Grid item xs={4}>
                <HomeMarketCard></HomeMarketCard>
            </Grid>;
        }
        else if (type.type === 'Recently used') {
            return <Grid item xs={4}>
                <HomeCreateCard></HomeCreateCard>
            </Grid>;
        }
        else if (type.type === 'Market') {
            return <Grid item xs={4}>
                <Card className='create-bot-card'>
                    <MarketCreateCard link='/botcreate' text='Create your new bot'></MarketCreateCard>
                </Card>
            </Grid>;
        }
        else {
            return <></>;
        }
    };
    return (
        <>
            {bots == null ? <></> :
                <Box sx={{ flexGrow: 1 }} style={boxStyle}>
                    <Grid container item spacing={4}>
                        {PrefixComponent()}
                        {bots.map(bot => (
                            <Grid item xs={4} key={bot.id}>
                                <ListCard
                                    link={'/botdetail/' + bot.id}
                                    avatar={bot.avatar}
                                    name={bot.name}
                                    description={bot.description}
                                ></ListCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
        </>
    );
};