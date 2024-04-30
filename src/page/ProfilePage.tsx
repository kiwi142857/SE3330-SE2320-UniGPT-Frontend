import React from 'react';
import '../css/Profile.css';
import UserCard from '../components/UserCard';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BotCard from '../components/BotCard';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { LanguageContext } from "../provider/LanguageProvider";
import { getUserCreatedBots } from '../service/user';
import { getUserFavoriteBots } from '../service/user';
import { getMe } from '../service/user';
import { use } from 'i18next';
// 个人主页

export function BotListTabs({ value, setValue }: { value: number, setValue: React.Dispatch<React.SetStateAction<number>>; }) {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        console.log(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label={t("Created")} className='botlist-tab' />
                <Tab label={t("Favorite")} className='botlist-tab' />
            </Tabs>
        </div>
    );
}

function ProfileBotList({ type, userId, page, pageSize }: { type: 'Created' | 'Favorite', userId: number, page: number, pageSize: number; }) {
    const [bots, setBots] = useState([]);
    console.log("type", type);

    useEffect(() => {
        const fetchBots = async () => {
            let response;
            if (type == "Created") {
                console.log("Created");
                response = await getUserCreatedBots(userId, page, pageSize);
            }
            else {
                console.log("Favorite");
                response = await getUserFavoriteBots(userId, page, pageSize);
            }

            setBots(response.bots);
        };
        fetchBots();
    }, [type, userId, page, pageSize]);

    console.log(bots);
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={1}>
                <Grid container item spacing={6}>
                    {bots.map(bot => (
                        <Grid item xs={4} key={bot.id}>
                            <BotCard BotInfo={bot} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

const ProfilePage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 10;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [value, setValue] = React.useState(0);
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    // get me 
    const [me, setMe] = useState([]);
    useEffect(() => {
        const fetchMe = async () => {
            const response = await getMe();
            console.log("me print", response);

            setMe(response);
        };
        fetchMe();
    }, []);
    return (
        <>
            <div className='profile-container'>
                <UserCard user={me}></UserCard>
            </div>
            <div className='botlist-tabs'>
                <BotListTabs value={value} setValue={setValue}></BotListTabs>
            </div>
            <div className='botlist-container'>
                <ProfileBotList type={value == 0 ? 'Created' : 'Favorite'} userId={3} page={pageIndex} pageSize={pageSize}></ProfileBotList>
            </div>
        </>
    );
};

export default ProfilePage;