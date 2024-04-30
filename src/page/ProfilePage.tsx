import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import UserCard from '../components/UserCard';
import { LanguageContext } from "../provider/LanguageProvider";
import { getUserCreatedBots, getUserFavoriteBots, getMe, putUser, User } from '../service/user';
import { BotList, BotListProps, BotListType } from '../components/BotList';
import '../css/Profile.css';

export function BotListTabs({ value, setValue }: { value: number, setValue: React.Dispatch<React.SetStateAction<number>>; }) {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
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

const ProfilePage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 10;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [tabValue, setTabValue] = React.useState(0);
    const [bots, setBots] = useState([]); 

    // 语言切换
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    // 获取用户信息
    const [me, setMe] = useState<User | null>(null);
    useEffect(() => {
        const fetchMe = async () => {
            const response = await getMe();

            setMe(response);
            console.log("me", me);
        };
        fetchMe();
    }, []);

    // 获取机器人列表
    useEffect(() => {
        const fetchBots = async () => {
            if(me == null) return;
            let response;
            if (tabValue === 0) {
                console.log("Created");
                response = await getUserCreatedBots(me.id, pageIndex, pageSize);
            }
            else {
                console.log("Favorite");
                response = await getUserFavoriteBots(me.id, pageIndex, pageSize);
            }

            setBots(response.bots);
        };
        fetchBots();
    }, [tabValue, me, pageIndex, pageSize]);

    const botListType: BotListType = {
        type: 'Profile'
    };

    return (
        <>
            {
                me == null ? <></> :
                    <>
                        <div className='profile-container'>
                            <UserCard user={me}></UserCard>
                        </div>
                        <div className='botlist-tabs'>
                            <BotListTabs value={tabValue} setValue={setTabValue}></BotListTabs>
                        </div>
                        <div className='botlist-container'>
                            <BotList type={botListType} bots={bots}></BotList>
                        </div>
                    </>
            }
        </>
    );
};
export default ProfilePage;