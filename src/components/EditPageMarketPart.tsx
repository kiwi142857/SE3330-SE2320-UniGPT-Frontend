import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Grid, IconButton } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import { imageUpload } from '../service/upload';
import BasicInput from './BasicInput';
import CheckTitle from './CheckTitle';
import EditLayout from './EditLayout';

function EditPageMarketPart(
    {
        publishCheck, 
        setPublishCheck, 
        photoImgs, 
        setPhotoImgs,
        defaultDetail,
        forBot
    } :
    {
        publishCheck: boolean, 
        setPublishCheck: React.Dispatch<React.SetStateAction<boolean>>, 
        photoImgs: string[], 
        setPhotoImgs: React.Dispatch<React.SetStateAction<string[]>>
        defaultDetail: string | null,
        forBot: boolean
    }
) {
    
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const onPhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file){
            imageUpload(file).then((res) => {
                if (res.ok) {
                    setPhotoImgs(prevImages => [...prevImages, res.message]);
                }
            });
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
            <CheckTitle
                check={publishCheck}
                onCheck={(event) => setPublishCheck(event.target.checked)}
                title={t('Publish to market')}
            />
            
            {publishCheck && (
                <>
                    <EditLayout title={t('Detailed Description')}>
                        <BasicInput
                            placeholder={t(forBot ?'Your detail description for your assistant (max 255 characters)'
                                : 'Your detail description for your plugin (max 255 characters)')}
                            name='detail'
                            defaultValue={defaultDetail}
                            maxLength={255}
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
                        <EditLayout title={t('Photos')} leftSpace={2} rightSpace={4}>
                            {photoImgs.map((image, index) => [
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>
                                            <div className='oneprompt-element'>
                                                <IconButton
                                                    sx={{ backgroundColor: 'secondary.main' }}
                                                    onClick={() => setPhotoImgs(photoImgs.filter((_, i) => i !== index))}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <div key={index} className='edit-photo-container'>
                                                <img src={image} style={{width: '100%'}} />
                                            </div>
                                        </Grid>
                                    </Grid>
                            ])}
                            <br/>
                            <Button 
                                variant="contained" 
                                onClick={onPhotoClick}
                                sx={{backgroundColor: 'primary.light'}}
                            >
                                {t('add image')}
                            </Button>
                        </EditLayout>
                    </div>
            </>
            )}
        </div>
    );
}

export default EditPageMarketPart;