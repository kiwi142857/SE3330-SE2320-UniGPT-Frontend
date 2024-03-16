import { Button, Divider, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditInput, PromptListInput } from '../components/Inputs';
import Navigator from '../components/Navigator';
import '../css/App.css';
import '../css/BotEditPage.css';

// bot创建/修改页

interface image{
    name: string;
    src: string;
};

interface item {
    itemName: string;
    prompt: string;
}

const BotEditPage: React.FC = () => {
    const { t } = useTranslation();

    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');
    const [photoImgs, setPhotoImgs] = useState<image[]>([]);
    const [items, setItems] = useState<item[]>([]);
    const [promptCheck, setPromptCheck] = useState<boolean>(false);
    const [publishCheck, setPublishCheck] = useState<boolean>(false);

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

    const onPhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoImgs(prevImages => [...prevImages, {name: file.name, src: reader.result as string}]);
            };
        
            reader.readAsDataURL(file);
        }
        
    };

    const onPromptClick = () => {
        const itemNameInput = document.querySelector<HTMLInputElement>('[name="itemName"]');
        const promptInput = document.querySelector<HTMLInputElement>('[name="prompt"]');
        const itemName = itemNameInput?.value;
        const prompt = promptInput?.value;
        if (!itemName || !prompt) {
            return;
        }
        setItems(prevItems => [...prevItems, { itemName, prompt }]);
        if (itemNameInput) itemNameInput.value = '';
        if (promptInput) promptInput.value = '';
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const onPhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            description: { value: string };
        };

        const name = target.name.value; 
        const description = target.description.value; 

        if (promptCheck && items.length === 0) {
            alert('Please add at least one item when prompt check is enabled.');
            return;
        }

        console.log(`name:${name}, description:${description}, avatar:${avatarImg}, photos:${photoImgs}`);
        window.location.href = '/botchat';
    };

    return [
        <Navigator/>,
        <div className='main-container bot-edit-container'>
             <form onSubmit={onSubmit}>

                 {/* 第一层，基本信息 */}
                <div className='edit-basic-container'>
                    <div style={{ position: 'relative' }}>
                        <Avatar 
                            alt="bot-default" 
                            src={avatarImg} 
                            sx={{ width: 200, height: 200, borderRadius: 0 }} 
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={onAvatarUpload} 
                            style={{display: 'none'}} 
                            id="imageUpload" 
                        />
                        <label htmlFor="avatar-input">
                            <Typography className='avatar-overlay'>
                                {t("Change photo for your assistant")}
                            </Typography>
                        </label>
                    </div>
                    <div className='edit-basic-right'>
                        <EditInput 
                            title= {t('Assistant Name')}
                            placeholder={t("Your assistant name")}
                            name='name' 
                        />
                        <EditInput 
                            title={t('Description')}
                            placeholder={t('Your description for your assistant')} 
                            name='description' 
                        />
                    </div>
                </div>

                <Divider/>

                {/* 第二层，自定义prompt */}
                <div className='edit-prompts-container'>
                    <div className='edit-title-container'>
                        <Checkbox
                            checked={promptCheck}
                            onChange={(event) => setPromptCheck(event.target.checked)}
                        />
                        <Typography 
                            className='edit-label' 
                            style={{ display: 'flex', alignItems: 'center' }}
                            sx={{color: 'primary.main'}}
                        >
                            {t('Define your own prompt list')}
                        </Typography>
                    </div>
                    {promptCheck && (
                        <div className='prompts-list-container'>
                            {items.map((item, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={1.1}/>
                                    <Grid item xs={2}>
                                        <Typography 
                                            className='edit-prompt-label'
                                            sx={{color: 'primary.light'}}
                                        >
                                            {item.itemName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography 
                                            className='edit-prompt'
                                            sx={{color: 'primary.light'}}
                                        >
                                            {item.prompt}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                            <PromptListInput onPromptClick={onPromptClick}/>
                        </div>
                    )}
                </div>

                <Divider style={{marginTop:'20px'}}/>

                {/* 第三层，发布market的信息 */}
                <div className='edit-publish-container'>
                    <div className='edit-title-container'>
                        <Checkbox
                            checked={publishCheck}
                            onChange={(event) => setPublishCheck(event.target.checked)}
                        />
                        <Typography 
                            className='edit-label' 
                            style={{ display: 'flex', alignItems: 'center' }}
                            sx={{color: 'primary.main'}}
                        >
                            {t('Publish to market')}
                        </Typography>
                    </div>
                    
                    {publishCheck && (
                        <div>
                            <EditInput 
                                title={t('Detailed Description')}
                                placeholder={t('Your detail description for your assistant')} 
                                name='detail' 
                            />
                            <div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    onChange={onPhotoUpload} 
                                />
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Typography 
                                            className='edit-label' 
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            sx={{color: 'primary.main'}}
                                        >
                                            {t('Photos')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {photoImgs.map((image, index) => (
                                            <div key={index} className='edit-photo-container'>
                                                <img src={image.src} alt={image.name} style={{width: '30px'}} />
                                                <Typography sx={{color:'primary.light'}}>
                                                    {image.name}
                                                </Typography>
                                            </div>
                                        ))}
                                        <br/>
                                        <Button 
                                            variant="contained" 
                                            onClick={onPhotoClick}
                                            sx={{backgroundColor: 'primary.light'}}
                                        >
                                            {t('add image')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                    </div>
                    )}
                </div>

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