import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditPageMarketPart from "../components/EditPageMarketPart";
import PluginEditBasicPart from "../components/PluginEditBasicPart";
import PluginEditCodePart from "../components/PluginEditCodePart";
import '../css/App.css';
import '../css/BotEditPage.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { createPlugin, param, pluginEditInfo } from '../service/PluginEdit';

// bot创建/修改页
const PluginEditPage = () => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');
    const [photoImgs, setPhotoImgs] = useState<string[]>([]);
    const [params, setParams] = useState<param[]>([]);
    const [code, setCode] = React.useState('def handler(event, context):\n    return "hello world" \n');

    const {messageError, ErrorSnackbar} = useErrorHandler();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            description: { value: string };
            detail: { value: string };
            fileName: { value: string };
        };

        const name = target.name.value;
        const description = target.description.value;
        const fileName = target.fileName.value;
        const detail = target.detail.value;

        let newInfo: pluginEditInfo = {
            name: name,
            avatar: avatarImg,
            description: description,
            fileName: fileName,
            code: code,
            param: params,
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

                <PluginEditCodePart
                    code={code}
                    setCode={setCode}
                    params={params}
                    setParams={setParams}
                />

                <Divider style={{ marginTop: '20px' }} />

                <EditPageMarketPart
                    publishCheck={true}
                    setPublishCheck={() => {}}
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