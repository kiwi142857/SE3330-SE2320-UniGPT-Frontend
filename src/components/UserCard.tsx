import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/Profile.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { imageUpload } from '../service/upload';
import { PostUser, User, putUser, banUser, isUserBanned } from '../service/user';
import SnackBar from './Snackbar';
import { logout } from '../service/auth';
import { get } from 'http';

export default function UserCard({ user, isMe, isAdmin, userId }: { user: User; isMe: boolean; isAdmin: boolean; userId: number|null; }) {

    const [description, setDescription] = useState(user.description);
    const [username, setUsername] = useState(user.name);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const handleUsernameFocus = () => {
        setIsUsernameFocused(true);
    };

    const handleUsernameBlur = () => {
        setIsUsernameFocused(false);
    };

    const handleDescriptionFocus = () => {
        setIsDescriptionFocused(true);
    };

    const handleDescriptionBlur = () => {
        setIsDescriptionFocused(false);
    };
    const [avatarSrc, setAvatarSrc] = useState('/assets/user-default.png');
    const [isBanned, setIsBanned] = useState<boolean>(false);
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

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

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleCommit = async () => {
        const updatedUser: PostUser = {
            name: username,
            avatar: avatarSrc,
            description: description,
        };

        if (username === '') {
            setAlert(true);
            setAlertMessage('用户名不能为空');
            return;
        }

        try {
            console.log(updatedUser);
            await putUser(updatedUser, user.id);
        } catch (error) {
            setAlert(true);
            setAlertMessage('更新信息失败');
        }
    };

    const getUserBanState = async () => {
        console.log("get user ban state, userId:", userId);
        if(userId === null) return;
        const response = await isUserBanned(userId);
        console.log("get user ban state, response:", response);
        if (response.ok) {
            setIsBanned(response.message == 'true');
        }
        else {
            setAlert(true);
            setAlertMessage('获取用户封禁状态失败');
        }
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
        }
        else {
            setAlert(true);
            setAlertMessage('封禁用户失败');
        }
        getUserBanState();
    };

    const handleLogout = async () => {
        const response = await logout();
        if (response.ok) {

            navigate('/login');
        }
        else {
            setAlert(true);
            setAlertMessage('登出失败');
        };
    };

    const [isDiscriptionInputActive, setDiscriptionIsInputActive] = useState(false);
    const [isInputActive, setIsInputActive] = useState(false);
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        setUsername(user.name);
        setDescription(user.description);
        if (user.avatar)
            setAvatarSrc(user.avatar);
    }, [user]);

    return [
        <SnackBar
            open={alert}
            message={alertMessage}
            setOpen={setAlert}
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
                    />
                    {isMe && <label htmlFor="avatar-input" className="avatar-overlay-profile">{t("change your avatar")}</label>}
                </div>
                {isMe && (
                    <Button variant="contained" color="secondary" style={{ width: '100%', marginTop: '108%' }} onClick={handleLogout}>
                        {t("Logout")}
                    </Button>
                )}
            </Grid>

            <Grid item >
                <Grid container spacing={2} className='user-box'>
                    <TextField
                        className='user-name'
                        label={t("Username")}
                        required
                        variant="standard"
                        value={username}
                        onChange={handleUsernameChange}
                        onFocus={handleUsernameFocus}
                        onBlur={handleUsernameBlur}
                        onMouseEnter={() => setIsUsernameFocused(true)}
                        onMouseLeave={() => { if (!isInputActive) setIsUsernameFocused(false); }}
                        placeholder={t("Maximum 25 characters input")}
                        style={{ height: '50px', width: '120%' }}
                        inputProps={{ maxLength: 25 }}
                        InputProps={{
                            style: {
                                border: 'none',
                            },
                            disableUnderline: isUsernameFocused ? false : true
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={!isMe}
                    />
                </Grid>
                <Grid item >
                    <Typography className='email' >
                        {user.account}@sjtu.edu.cn
                    </Typography>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <TextField
                        className='description'
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder={t("Write your description here...")}
                        multiline
                        variant='standard'
                        onFocus={() => { handleDescriptionFocus(); setDiscriptionIsInputActive(true); }}
                        onBlur={() => { handleDescriptionBlur(); setDiscriptionIsInputActive(false); }}
                        onMouseEnter={() => setIsDescriptionFocused(true)}
                        onMouseLeave={() => { if (!isDiscriptionInputActive) setIsDescriptionFocused(false); }}
                        style={{ height: '100px', width: '200%' }}
                        InputProps={{
                            style: {
                                border: 'none',
                            },
                            disableUnderline: isDescriptionFocused ? false : true
                        }}
                        inputProps={{
                            maxLength: 188, // Set the maximum input length to 100
                        }}
                        disabled={!isMe}
                    />
                </Grid>
                {
                    isMe &&
                    <Grid item >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '50%', marginTop: '10px', alignSelf: 'flex-start', marginLeft: '-50%' }}
                            onClick={handleCommit}
                        >
                            {t("Save")}
                        </Button>
                    </Grid>
                }
                {
                    isAdmin && !isMe &&
                    <Grid item >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '50%', marginTop: '10px', alignSelf: 'flex-start', marginLeft: '-50%' }}
                            onClick={handleBan}
                        >
                            {isBanned ? t("Unban") : t("Ban")}
                        </Button>
                    </Grid>
                }
            </Grid>
            <Grid item >
            </Grid>
        </Grid>
    ];
};
