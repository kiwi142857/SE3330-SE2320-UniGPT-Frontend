import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BotList, { FavoriteHeader, RecentUsedHeader } from "../components/BotList";
import '../css/Home.css';
import { useSearchParams } from "react-router-dom";
import { LanguageContext } from "../provider/LanguageProvider";

const HomePage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 10;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <div>
            <div>
                <video className='home-bg' autoPlay loop muted>
                    <source src="/assets/homepage.mp4" type="video/mp4" />
                </video>
            </div>

            <Grid container spacing={8} className='bot-box' >
                <Grid item xs={6}>
                    <FavoriteHeader></FavoriteHeader>
                    <BotList type='Favorite' page={pageIndex} pageSize={pageSize} userId={3}></BotList>
                </Grid>
                <Grid item xs={6}>
                    <RecentUsedHeader></RecentUsedHeader>
                    <BotList type="Recently used" page={pageIndex} pageSize={pageSize} userId={3}></BotList>
                </Grid>
            </Grid>
        </div>
    );
}
    ;
;
;
export default HomePage;
