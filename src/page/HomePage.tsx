import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import { BotList, BotListType, FavoriteHeader, RecentUsedHeader } from "../components/BotList";
import '../css/Home.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { Bot } from '../service/market';
import { User, getMe, getUerUsedBots, getUserFavoriteBots } from '../service/user';

const HomePage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 17;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [Usedbots, setUsedBots] = React.useState<Bot[] | null>([]);

    const [Favoritebots, setFavoriteBots] = React.useState<Bot[] | null>([]);

    const {messageError, ErrorSnackbar} = useErrorHandler();

    // 获取用户信息
    const [me, setMe] = useState<User | null>(null);
    useEffect(() => {
        const fetchMe = async () => {
            await getMe().then((res) => setMe(res))
                .catch(() => setMe(null));
        };
        fetchMe();
    }, []);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        const fetchBots = async () => {
            if (!me) return;
            await getUerUsedBots(me.id, pageIndex, pageSize)
                .then(res => setUsedBots(res.bots))
                .catch((e) => {
                    setUsedBots(null); 
                    messageError("Failed to get used bots" + e.message);
                });
            await getUserFavoriteBots(me.id, pageIndex, pageSize)
                .then(res => setFavoriteBots(res.bots))
                .catch((e) => {
                    setFavoriteBots(null);
                    messageError("Failed to get favorite bots" + e.message);
                });
        };
        fetchBots();
    }, [me]);

    const usedBotsType: BotListType = {
        type: 'Recently used'
    };

    const favoriteBotsType: BotListType = {
        type: 'Favorite'
    };

    console.log("me", me);
    return (
        <div>
            <ErrorSnackbar />
            <div>
                <video className='home-bg' autoPlay loop muted>
                    <source src="/assets/homepage.mp4" type="video/mp4" />
                </video>
            </div>

            {me && <Grid container spacing={8} className='bot-box' >
                <Grid item xs={6}>
                    <FavoriteHeader></FavoriteHeader>
                    <BotList type={favoriteBotsType} bots={Favoritebots}></BotList>
                </Grid>
                <Grid item xs={6}>
                    <RecentUsedHeader></RecentUsedHeader>
                    <BotList type={usedBotsType} bots={Usedbots}></BotList>
                </Grid>
            </Grid>}
        </div>
    );
}
    ;
;
;
export default HomePage;
