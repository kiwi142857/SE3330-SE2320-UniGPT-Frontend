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
import { createPlugin, param, paramTest, pluginEditInfo, testPlugin, testPluginEditInfo } from '../service/PluginEdit';

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
    const [params, setParams] = useState<paramTest[]>([]);
    const [code, setCode] = React.useState('def handler(event, context):\n    return "hello world" \n');
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const {messageError, ErrorSnackbar} = useErrorHandler();

    const onSubmit = async (event: React.FormEvent, forSubmit: boolean) => {
        event.preventDefault();

        if(forSubmit && !canSubmit) {
            messageError("请先测试插件");
            return;
        }

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

        console.log("www")

        const paramsSubmit: param[] = [];
        for (let i = 0; i < params.length; i++) {
            paramsSubmit.push({
                name: params[i].name,
                type: params[i].type,
                description: params[i].description
            });
        }

        if (forSubmit) {
            let newInfo: pluginEditInfo = {
                name: name,
                avatar: avatarImg,
                description: description,
                detail: detail,
                photos: photoImgs,
                parameters: paramsSubmit,
                code: code,
                isPublished: publishCheck
            };

            console.log(newInfo);

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
        } else {
            const paramsValues: string[] = [];
            for (let i = 0; i < params.length; i++) {
                paramsValues.push(params[i].value);
            }

            let testInfo: testPluginEditInfo = {
                name: name,
                avatar: avatarImg,
                description: description,
                detail: detail,
                photos: photoImgs,
                parameters: paramsSubmit,
                code: code,
                isPublished: publishCheck,
                paramsValue: paramsValues
            };

            await testPlugin(testInfo)
                .then((res) => {
                    if (res.ok) {
                        setCanSubmit(true);
                    } else {
                        messageError("插件测试未通过: " + res.message);
                    }
                })
        }
    }

    return [
        <ErrorSnackbar/>,
        <div className='main-container bot-edit-container'>
            <form onSubmit={(e) => onSubmit(e, canSubmit)}>

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
                    {canSubmit? t('Submit') : t('Start Test')}
                </Button>
            </form>
        </div>
    ];
}

export default PluginEditPage;