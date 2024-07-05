import { Favorite } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BotList, BotListType, HomeListHeader } from "../components/BotList";
import '../css/Home.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { Bot } from '../service/market';
import { User, getMe, getUerUsedBots, getUserFavoriteBots } from '../service/user';

const HomePage: React.FC = () => {

    // const [searchParams] = useSearchParams();
    // const pageIndexStr = searchParams.get("pageIndex");
    // const pageSizeStr = searchParams.get("pageSize");
    // const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    // const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 8;

    const pageIndex = 0;
    const pageSize = 8;

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
                .catch(() => {setMe(null); console.log("Failed to get me")});
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
                    <HomeListHeader
                        title={t('Favorite')}
                        icon={<Favorite fontSize='large' />}
                    ></HomeListHeader>
                    <BotList type={favoriteBotsType} bots={Favoritebots}></BotList>
                </Grid>
                <Grid item xs={6}>
                    <HomeListHeader
                        title={t('Recently Used')}
                        icon={<AccessTimeFilledIcon fontSize='large' />}
                    ></HomeListHeader>
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
