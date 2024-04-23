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
import { PromptType, botEditInfo, fewShot, getBotEditInfo, postBotEditInfo } from '../service/BotEdit';

// bot创建/修改页

interface item {
    itemName: string;
    prompt: string;
}

const BotEditPage = ({edit} : {edit: boolean}) => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        if (edit) {
            setInfo();
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
    const [items, setItems] = useState<item[]>([]);
    const [fewShots, setFewShots] = useState<fewShot[]>([
        {
            type: PromptType.SYSTEM,
            content: ''
        }
    ]);
    const [promptCheck, setPromptCheck] = useState<boolean>(false);
    const [publishCheck, setPublishCheck] = useState<boolean>(false);

    const setInfo = async () => {
        let info = await getBotEditInfo("1")
        setBotEditInfo(info);
        setAvatarImg(info.avatar);
        setPhotoImgs(info.photos);
        setPromptCheck(info.isPrompted);
        //setItems
        setFewShots(info.promptChats);
        setPublishCheck(info.isPublished);
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

        setBotEditInfo({
            name: name,
            avatar: avatarImg,
            description: description,
            baseModelAPI: api,
            isPublished: publishCheck,
            detail: detail,
            photos: photoImgs,
            isPrompted: promptCheck,
            promptChats: fewShots,
            promptKeys: botEditInfo.promptKeys
        });

        console.log(botEditInfo);

        postBotEditInfo("1", botEditInfo);

        // setTimeout(() => {
        //     window.location.href = '/botchat';
        // }, 1000);
    };

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
                    items={items}
                    setItems={setItems}
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