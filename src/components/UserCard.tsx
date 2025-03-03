import { Avatar, Button, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { logout } from '../service/auth';
import { imageUpload } from '../service/upload';
import { PostUser, User, banUser, isUserBanned, putUser } from '../service/user';
import ProfileDialog from './ProfileDialog';

export default function UserCard({ user, isMe, isAdmin, userId }: { user: User; isMe: boolean; isAdmin: boolean; userId: number|null; }) {

    const [description, setDescription] = useState(user.description);
    const [username, setUsername] = useState(user.name);
    const [canvasUrl, setCanvasUrl] = useState('');

    const [tableOpen, setTableOpen] = useState(false);
    const {messageError, ErrorSnackbar} = useErrorHandler();

    const navigate = useNavigate();

    const [avatarSrc, setAvatarSrc] = useState('/assets/user-default.png');
    const [isBanned, setIsBanned] = useState<boolean>(false);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            imageUpload(file).then((res) => {
                if (res.ok) {
                    setAvatarSrc(res.message);
                }
            });
        }
    };

    const handleCommit = async () => {
        const updatedUser: PostUser = {
            name: username,
            avatar: avatarSrc,
            description: description,
            canvasUrl: canvasUrl
        };

        if (username === '') {
            messageError('用户名不能为空');
            return;
        }

        let res = await putUser(updatedUser, user.id);
        if (!res.ok) 
            messageError('更新信息失败');

        setTableOpen(false);
    };

    const getUserBanState = async () => {
        console.log("get user ban state, userId:", userId);
        if(userId === null) return;
        await isUserBanned(userId)
            .then(response => {
                if (response.ok)
                    setIsBanned(response.message == 'true');
            }).catch(e => {
                messageError('获取用户封禁状态失败' + e.message);
            });
    };

    useEffect(() => {
        if(isAdmin && !isMe) {
            getUserBanState();
        }
    }, [isAdmin, isMe]);

    const handleBan = async () => {
        if(userId === null) return;
        const response = await banUser({ userId, isBan: !isBanned });
        if (response.ok) {
            setIsBanned(true);
        } else {
            messageError('封禁用户失败');
        }
        getUserBanState();
    };

    const handleLogout = async () => {
        const response = await logout();
        if (response.ok) {
            navigate('/login');
        }
        else {
            messageError("登出失败:" + response.message);
        };
    };

    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        setUsername(user.name);
        setDescription(user.description);
        if (user.canvasUrl)
            setCanvasUrl(user.canvasUrl);
        if (user.avatar)
            setAvatarSrc(user.avatar);
    }, [user]);

    return [
        <ErrorSnackbar/>,
        <ProfileDialog
            open={tableOpen}
            handleClose={() => { setTableOpen(false); window.location.reload(); }}
            handleUpdate={handleCommit}
            username={username}
            description={description}
            canvasUrl={canvasUrl}
            handleUsernameChange={(event) => setUsername(event.target.value)}
            handleDescriptionChange={(event) => setDescription(event.target.value)}
            handleCanvasUrlChange={(event) => setCanvasUrl(event.target.value)}
        />,

        <Grid container spacing={5} >
            <Grid item >
                <div style={{ position: 'relative' }}>
                    <Avatar alt="user-default" src={avatarSrc} sx={{ width: 100, height: 100 }} />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                        id="avatar-input"
                        disabled={!isMe}
                        data-testid="avatar-input"
                    />
                    {isMe && <label htmlFor="avatar-input" className="avatar-overlay-profile">{t("change your avatar")}</label>}
                </div>
            </Grid>

            <Grid item xs={5}>
                <div className='user-box'>
                    <Typography sx={{ color: 'primary.main' }}>
                        <p className='user-name'>
                            {t(username)}
                        </p>
                    </Typography>
                    <Typography className='email' >
                        {user.account}@sjtu.edu.cn
                    </Typography>
                    <Typography sx={{ color: 'primary.light' }}>
                        <p className='description'>
                            {t(description)}
                        </p>
                    </Typography>
                    <div className='profile-btn-group'>
                        {isMe && (
                            <Button variant="contained" color="secondary" onClick={handleLogout}>
                                {t("Logout")}
                            </Button>
                        )}
                        {
                            isMe &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setTableOpen(true)}
                            >
                                {t("change")}
                            </Button>
                        }
                        {
                            isAdmin && !isMe &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBan}
                            >
                                {isBanned ? t("Unban") : t("Ban")}
                            </Button>
                        }
                    </div>
                </div>
            </Grid>
            <Grid item >
            </Grid>
        </Grid>
    ];
};
