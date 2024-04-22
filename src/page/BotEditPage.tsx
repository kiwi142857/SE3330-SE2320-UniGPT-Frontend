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
    const [fewShots, setFewShots] = useState<fewShot[]>([]);
    const [promptCheck, setPromptCheck] = useState<boolean>(false);
    const [publishCheck, setPublishCheck] = useState<boolean>(false);

    const setInfo = async () => {
        console.log('setInfo');
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
        };

        const name = target.name.value; 
        const description = target.description.value; 
        const api = target.api.value;

        if (promptCheck && items.length === 0) {
            alert('Please add at least one item when prompt check is enabled.');
            return;
        }

        console.log(`name:${name}, description:${description}`, `api:${api}`);

        items.forEach((item, index) => {
            console.log(`item${index}: ${item.itemName}, prompt${index}: ${item.prompt}`);
        });

        setTimeout(() => {
            window.location.href = '/botchat';
        }, 1000);
    };

    return [
        <Navigator/>,
        <div className='main-container bot-edit-container'>
             <form onSubmit={onSubmit}>

                <BotEditBasicPart  
                    avatarImg={avatarImg} 
                    setAvatarImg={setAvatarImg} 
                />
                <Divider/>

                <BotEditPromptPart
                    promptCheck={promptCheck}
                    setPromptCheck={setPromptCheck}
                    items={items}
                    setItems={setItems}
                />

                <Divider style={{marginTop:'20px'}}/>

                <BotEditMarketPart
                    publishCheck={publishCheck}
                    setPublishCheck={setPublishCheck}
                    photoImgs={photoImgs}
                    setPhotoImgs={setPhotoImgs}
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