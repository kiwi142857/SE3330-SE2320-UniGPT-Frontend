import { Button, Checkbox, Grid, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../provider/LanguageProvider';
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';

interface image{
    name: string;
    src: string;
};

function BotEditMarketPart({publishCheck, setPublishCheck, photoImgs, setPhotoImgs} :
    {publishCheck: boolean, setPublishCheck: React.Dispatch<React.SetStateAction<boolean>>, photoImgs: string[], setPhotoImgs: React.Dispatch<React.SetStateAction<string[]>>}
) {
    
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const onPhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoImgs(prevImages => [...prevImages, reader.result as string]);
            };
        
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const onPhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
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
                <>
                    <EditLayout title={t('Detailed Description')}>
                        <BasicInput
                            placeholder={t('Your detail description for your assistant')}
                            name='detail'
                            required
                        />
                    </EditLayout>
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
                                        <img src={image} style={{width: '300px'}} />
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
            </>
            )}
        </div>
    );
}

export default BotEditMarketPart;