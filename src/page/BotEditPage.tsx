import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BotEditBasicPart from '../components/BotEditBasicPart';
import BotEditMarketPart from "../components/BotEditMarketPart";
import BotEditPromptPart from '../components/BotEditPromptPart';
import Navigator from '../components/Navigator';
import '../css/App.css';
import '../css/BotEditPage.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { botEditInfo, fewShot, getBotEditInfo } from '../service/BotEdit';

// bot创建/修改页
const BotEditPage = ({edit} : {edit: boolean}) => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        if (edit) {
            initInfo();
        }
    }, [edit]);

    const [botEditInfo, setBotEditInfo] = useState<botEditInfo>({
        name: '',
        avatar: '/assets/bot-default.png',
        description: '',
        baseModelAPI: '',
        isPublished: false,
        detail: '',
        photos: [],
        isPrompted: false,
        promptChats: [],
        promptKeys: []
    });
    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');
    const [photoImgs, setPhotoImgs] = useState<string[]>([]);
    const [fewShots, setFewShots] = useState<fewShot[]>([]);
    const [promptCheck, setPromptCheck] = useState<boolean>(false);
    const [publishCheck, setPublishCheck] = useState<boolean>(false);
    const [promptKeys, setPromptKeys] = useState<string[]>([]);

    const initInfo = async () => {
        let info = await getBotEditInfo("1")
        setBotEditInfo(info);
        setAvatarImg(info.avatar);
        setPhotoImgs(info.photos);
        setPromptCheck(info.isPrompted);
        setPublishCheck(info.isPublished);
        setFewShots(info.promptChats);
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            description: { value: string };
            api: { value: string };
            detail: { value: string };
        };

        const name = target.name.value; 
        const description = target.description.value; 
        const api = target.api.value;
        const detail = target.detail.value;

        let newInfo : botEditInfo = {
            name: name,
            avatar: avatarImg,
            description: description,
            baseModelAPI: api,
            isPublished: publishCheck,
            detail: detail,
            photos: photoImgs,
            isPrompted: promptCheck,
            promptChats: fewShots,
            promptKeys: promptKeys
        };

        console.log(newInfo);

        // postBotEditInfo("1", botEditInfo);

        // setTimeout(() => {
        //     window.location.href = '/botchat';
        // }, 1000);
    };

    useEffect(() => {
        const regex = /\+\+\{(.+?)\}/g;
        let newPromptKeys: string[] = [];

        fewShots.forEach(fewShot => {
            let match;
            while ((match = regex.exec(fewShot.content)) !== null) {
                newPromptKeys.push(match[1]);
            }
        });

        setPromptKeys(newPromptKeys);
    }, [fewShots]);

    return [
        <Navigator/>,
        <div className='main-container bot-edit-container'>
             <form onSubmit={onSubmit}>

                <BotEditBasicPart  
                    avatarImg={avatarImg} 
                    setAvatarImg={setAvatarImg} 
                    defaultName={botEditInfo.name}
                    defaultDescription={botEditInfo.description}
                    defaultApi={botEditInfo.baseModelAPI}
                />
                <Divider/>

                <BotEditPromptPart
                    promptCheck={promptCheck}
                    setPromptCheck={setPromptCheck}
                    promptKeys={promptKeys}
                    fewShots={fewShots}
                    setFewShots={setFewShots}
                />

                <Divider style={{marginTop:'20px'}}/>

                <BotEditMarketPart
                    publishCheck={publishCheck}
                    setPublishCheck={setPublishCheck}
                    photoImgs={photoImgs}
                    setPhotoImgs={setPhotoImgs}
                    defaultDetail={botEditInfo.detail}
                />

                <Button 
                    type="submit"
                    size='large' 
                    variant="contained" 
                    sx={{backgroundColor: 'primary.main'}}
                >
                    {t('Submit')}
                </Button>
            </form>
        </div>
    ];
}

export default BotEditPage;