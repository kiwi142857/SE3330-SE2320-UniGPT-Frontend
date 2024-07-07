import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditPageMarketPart from "../components/EditPageMarketPart";
import PluginEditBasicPart from "../components/PluginEditBasicPart";
import '../css/App.css';
import '../css/BotEditPage.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { createPlugin, pluginEditInfo } from '../service/PluginEdit';

// bot创建/修改页
const PluginEditPage = () => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');
    const [photoImgs, setPhotoImgs] = useState<string[]>([]);

    const [publishCheck, setPublishCheck] = useState<boolean>(false);

    const {messageError, ErrorSnackbar} = useErrorHandler();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            description: { value: string };
            detail: { value: string };
        };

        const name = target.name.value;
        const description = target.description.value;
        let detail;

        if (publishCheck) {
            detail = target.detail.value;
        } else {
            detail = null;
        }

        let newInfo: pluginEditInfo = {
            name: name,
            avatar: avatarImg,
            description: description,
            published: publishCheck,
            detail: detail,
            photos: photoImgs,
        };

        await createPlugin(newInfo) 
            .then((res) => {
                if (res.ok) {
                    setTimeout(() => {
                        window.location.href = '/market';
                    }, 100);
                } else {
                    messageError("插件创建失败: " + res.message);
                }
            })
    }

    return [
        <ErrorSnackbar/>,
        <div className='main-container bot-edit-container'>
            <form onSubmit={onSubmit}>

                <PluginEditBasicPart
                    avatarImg={avatarImg}
                    setAvatarImg={setAvatarImg}
                />

                <Divider style={{ marginTop: '20px' }} />

                <EditPageMarketPart
                    publishCheck={publishCheck}
                    setPublishCheck={setPublishCheck}
                    photoImgs={photoImgs}
                    setPhotoImgs={setPhotoImgs}
                    defaultDetail={null}
                    forBot={false}
                />

                <Button
                    type="submit"
                    size='large'
                    variant="contained"
                    sx={{ backgroundColor: 'primary.main' }}
                >
                    {t('Submit')}
                </Button>
            </form>
        </div>
    ];
}

export default PluginEditPage;