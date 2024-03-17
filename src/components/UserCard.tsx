import { Avatar, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Profile.css';
import { LanguageContext } from "../provider/LanguageProvider";

export default function UserCard() {
    const [description, setDescription] = useState('');
    const [usename, setUsename] = useState('user');
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

    const handleDescriptionFocus = () => {
        setIsDescriptionFocused(true);
    };

    const handleDescriptionBlur = () => {
        setIsDescriptionFocused(false);
    };
    const [avatarSrc, setAvatarSrc] = useState('/assets/user-default.png');
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarSrc(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleUsenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsename(event.target.value);
    };

    return (

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
                    />
                    <label htmlFor="avatar-input" className="avatar-overlay">{t("change your avatar")}</label>
                </div>
            </Grid>
            <Grid item >
                <Grid container spacing={2} className='user-box'>
                    <TextField
                        className='user-name'
                        label="Username"
                        required
                        variant="standard"
                        value={usename}
                        onChange={handleUsenameChange}
                        placeholder={t("Maximum 25 characters input")}
                        style={{ height: '50px', width: '120%' }}
                        inputProps={{ maxLength: 25 }}
                    />
                </Grid>
                <Grid item >
                    <Typography className='email'>@jaccount</Typography>
                </Grid>
                <Grid item  style={{marginTop:'10px'}}>
                    <TextField
                        className='description'
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder={t("Write your description here...")}
                        multiline
                        variant={isDescriptionFocused ? "outlined" : "standard"}
                        onFocus={handleDescriptionFocus}
                        onBlur={handleDescriptionBlur}
                        style={{ height: '100px', width: '200%'}}
                        InputProps={{
                            style: {
                                border : 'none',
                            },
                            disableUnderline: true,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item >
            </Grid>
        </Grid>
    );
};
