import { Avatar, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/App.css';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';
import { EditSelect } from './Inputs';

function BotEditBasicPart (
    {
        avatarImg, 
        setAvatarImg,
        defaultName,
        defaultDescription,
        defaultApi
    } : 
    {
        avatarImg: string, 
        setAvatarImg: React.Dispatch<React.SetStateAction<string>>,
        defaultName: string,
        defaultDescription: string,
        defaultApi: string
    }) {

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
        
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const onAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='edit-basic-container'>
            <div style={{ position: 'relative' }}>
                <Avatar 
                    alt="bot-default" 
                    src={avatarImg} 
                    sx={{ width: 200, height: 200, borderRadius: '20px' }} 
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={onAvatarUpload} 
                    style={{display: 'none'}} 
                    id="imageUpload" 
                />
                {/* 这里的htmlFor和input的id必须是一样的，否则无法选择文件！ */}
                <label htmlFor="imageUpload">
                    <Typography className='avatar-overlay' style={{height: 200}}>
                        {t("Change photo for your assistant")}
                    </Typography>
                </label>
            </div>
            <div className='edit-basic-right'>
                <EditLayout title={t('Assistant Name')}>
                    <BasicInput
                        placeholder={t("Your assistant name")}
                        name='name'
                        defaultValue={defaultName}
                        required
                    />
                </EditLayout>
                <EditLayout title={t('Description')}>
                    <BasicInput
                        placeholder={t("Your description for your assistant")}
                        name='description'
                        defaultValue={defaultDescription}
                        required
                    />
                </EditLayout>
                <EditSelect
                    title={t('Base Model')}
                    defaultSelect={defaultApi}
                    name='api'
                />
            </div>
        </div>
    );
}

export default BotEditBasicPart;