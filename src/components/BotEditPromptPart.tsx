import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';
import { OnePromptInput } from './Inputs';

interface item {
    itemName: string;
    prompt: string;
}

function BotEditPromptPart({promptCheck, setPromptCheck, items, setItems} :
    {promptCheck: boolean, setPromptCheck: React.Dispatch<React.SetStateAction<boolean>>, items: item[], setItems: React.Dispatch<React.SetStateAction<item[]>> }
) {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const onPromptCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setPromptCheck(event.target.checked);
        if (!event.target.checked) {
            setItems([]);
        } else {
            setItems([{itemName: '', prompt: ''}]);
        }
    }

    const onItemNameChange = (index: number, newValue: string) => {
        setItems(items.map((item, i) => i === index ? {...item, itemName: newValue} : item));
    };
    
    const onPromptChange = (index: number, newValue: string) => {
        setItems(items.map((item, i) => i === index ? {...item, prompt: newValue} : item));
    };

    return (
        <div className='edit-prompts-container'>
            <div className='edit-title-container'>
                <Checkbox
                    checked={promptCheck}
                    onChange={onPromptCheck}
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
                    <EditLayout title={t('System Prompt')}>
                        <BasicInput
                            placeholder={t("System prompt for your assistant")}
                            name='system-prompt'
                            required
                        />
                    </EditLayout>

                    <EditLayout title={t('Few-shot')}>
                            <div className='prompts-list-container'>
                                {items.map((item, index) => (
                                    <OnePromptInput 
                                        key={index}
                                        index={index} 
                                        item={item} 
                                        onItemNameChange={(event) => onItemNameChange(index, event.target.value)} 
                                        onPromptChange={(event) => onPromptChange(index, event.target.value)}
                                        handleDelete={() => setItems(items.filter((_, i) => i !== index))}
                                    />
                                ))}
                                <Grid container spacing={2}>
                                    <Grid item xs={1}>
                                        <IconButton
                                            sx={{backgroundColor: 'secondary.main'}}
                                            onClick={() => setItems([...items, {itemName: '', prompt: ''}])}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>
                    </EditLayout>

                    <EditLayout title={t('User')}>
                            <div className='prompts-list-container'>
                                {items.map((item, index) => (
                                    <OnePromptInput 
                                        key={index}
                                        index={index} 
                                        item={item} 
                                        onItemNameChange={(event) => onItemNameChange(index, event.target.value)} 
                                        onPromptChange={(event) => onPromptChange(index, event.target.value)}
                                        handleDelete={() => setItems(items.filter((_, i) => i !== index))}
                                    />
                                ))}
                                <Grid container spacing={2}>
                                    <Grid item xs={1}>
                                        <IconButton
                                            sx={{backgroundColor: 'secondary.main'}}
                                            onClick={() => setItems([...items, {itemName: '', prompt: ''}])}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>
                    </EditLayout>
                </div>
            )}
        </div>
    );
}

export default BotEditPromptPart;