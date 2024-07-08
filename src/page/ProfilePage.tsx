import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { BotList, BotListType } from '../components/BotList';
import UserCard from '../components/UserCard';
import '../css/Profile.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { User, getMe, getUser, getUserCreatedBots, getUserFavoriteBots } from '../service/user';


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

const ProfilePage = () => {

    // const [searchParams] = useSearchParams();
    // const pageIndexStr = searchParams.get("pageIndex");
    // const pageSizeStr = searchParams.get("pageSize");
    // const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    // const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 10;

    const pageIndex = 0;
    const pageSize = 30;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [tabValue, setTabValue] = React.useState(0);
    const [bots, setBots] = useState([]);

    const {messageError, ErrorSnackbar} = useErrorHandler();

    // 语言切换
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    let { id } = useParams<{ id: string; }>();
    // 获取用户信息
    const [user, setUser] = useState<User | null>(null);

    const [userId, setUserId] = useState<number | null>(null);
    useEffect(() => {
        const fetchUserid = async () => {
            console.log("id: " + id);
            if(id == null) return;
            await getUser(id)
                .then((res) => setUserId(res.id))
                .catch(() => console.log("Failed to get user id"));
        };
        fetchUserid();
        console.log("userId:" + userId)
    }, []);

    // if id == null, get me
    useEffect(() => {
        const fetchUser = async () => {
            if (id == null) {
                await getMe()
                    .then((res) => setUser(res))
                    .catch(() => {
                        setUser(null);
                        messageError("获取用户信息失败！");
                    });
            } else {
                await getUser(id)
                    .then((res) => setUser(res))
                    .catch(() => {
                        setUser(null);
                        messageError("获取用户信息失败！");
                    });
            }
        };
        fetchUser();
    }, [id]);

    const [isMe, setIsMe] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const fetchMe = async () => {
            await getMe()
                .then((res) => {
                    setIsMe(user?.id === res.id);
                    // if (res.asAdmin != null)
                    setIsAdmin(res.asAdmin);
                })
                .catch(() => {
                    setIsAdmin(false);
                });
        };
        fetchMe();
    }, [user]);

    // 获取机器人列表
    useEffect(() => {
        const fetchBots = async () => {
            if (user == null) return;
            if (tabValue === 0) {
                await getUserCreatedBots(user.id, pageIndex, pageSize)
                    .then(res => setBots(res.bots))
                    .catch((e) => {
                        setBots([]);
                        messageError("Failed to get created bots" + e.message);
                    });
            }
            else {
                await getUserFavoriteBots(user.id, pageIndex, pageSize)
                    .then(res => setBots(res.bots))
                    .catch((e) => {
                        setBots([]);
                        messageError("Failed to get favorite bots" + e.message);
                    });
            }
        };

        fetchBots();
    }, [tabValue, user, pageIndex, pageSize]);

    const botListType: BotListType = {
        type: 'Profile'
    };

    return (
        <>
            {
                user == null ? <></> :
                    <>
                        <ErrorSnackbar />
                        <div className='profile-container'>
                            <UserCard user={user} isMe={isMe} isAdmin={isAdmin} userId={userId}></UserCard>
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