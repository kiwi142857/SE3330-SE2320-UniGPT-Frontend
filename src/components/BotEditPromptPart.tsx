import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import { PromptType, fewShot } from '../service/BotEdit';
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';
import { OneFewShotInput, OnePromptInput } from './Inputs';

interface item {
    itemName: string;
    prompt: string;
}

function BotEditPromptPart(
    {
        promptCheck, 
        setPromptCheck, 
        items, 
        setItems,
        fewShots,
        setFewShots
    } :
    {
        promptCheck: boolean, 
        setPromptCheck: React.Dispatch<React.SetStateAction<boolean>>, 
        items: item[], 
        setItems: React.Dispatch<React.SetStateAction<item[]>> 
        fewShots: fewShot[],
        setFewShots: React.Dispatch<React.SetStateAction<fewShot[]>>
    }
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
            setFewShots([]);
        } else {
            setItems([{itemName: '', prompt: ''}]);
            setFewShots([{type: PromptType.SYSTEM, content: ''}, {type: PromptType.USER, content: ''}, {type: PromptType.BOT, content: ''}]);
        }
    }

    const onItemNameChange = (index: number, newValue: string) => {
        setItems(items.map((item, i) => i === index ? {...item, itemName: newValue} : item));
    };
    
    const onPromptChange = (index: number, newValue: string) => {
        setItems(items.map((item, i) => i === index ? {...item, prompt: newValue} : item));
    };

    const onFewShotChange = (index: number, newValue: string) => {
        setFewShots(fewShots.map((fewShot, i) => i === index ? {...fewShot, content: newValue} : fewShot));
    }

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
                            defaultValue={fewShots[0]?.content}
                            required
                        />
                    </EditLayout>

                    <EditLayout title={t('Few-shot')}>
                        <div className='prompts-list-container'>
                            {fewShots.map((fewShot, index) => {
                                if (fewShot.type === PromptType.USER) {
                                    return <OneFewShotInput
                                        key={index}
                                        index={index}
                                        select={t('USER')}
                                        content={fewShot.content}
                                        onFewShotChange={(event) => onFewShotChange(index, event.target.value)}
                                        handleDelete={() => setFewShots(fewShots.filter((_, i) => i !== index && i !== (index + 1)))}
                                    />
                                } else if (fewShot.type === PromptType.BOT) {
                                    return <OneFewShotInput
                                        key={index}
                                        index={index}
                                        select={t('BOT')}
                                        content={fewShot.content}
                                        onFewShotChange={(event) => onFewShotChange(index, event.target.value)}
                                        handleDelete={() => setFewShots(fewShots.filter((_, i) => i !== index && i !== (index - 1)))}
                                    />
                                } 
                            })}
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <IconButton
                                        sx={{backgroundColor: 'secondary.main'}}
                                        onClick={() => setFewShots([...fewShots, {type: PromptType.USER, content: ''}, {type: PromptType.BOT, content: ''}])}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    </EditLayout>

                    <EditLayout title={t('User-Ask')}>
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