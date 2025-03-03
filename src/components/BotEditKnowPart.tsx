import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import EditLayout from './EditLayout';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function BotEditKnowPart({knowFiles, setKnowFiles} :
    { knowFiles: File[], setKnowFiles: React.Dispatch<React.SetStateAction<File[]>>}) {
            
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setKnowFiles(prevFiles => [...prevFiles, ...fileArray]);
        }
    }

    const onFileDelete = (index: number) => {
        setKnowFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }

    return (
        <div className='edit-prompts-container'>
                        <EditLayout title={t('Add files to knowledge base')} leftSpace={3} rightSpace={4}>
                            {
                                knowFiles && knowFiles.length > 0 &&
                                <div>
                                    {Array.from(knowFiles).map((file, index) => (
                                        <Grid container spacing={2}>
                                            <Grid item xs={1}>
                                                <div className='oneprompt-element'>
                                                    <IconButton
                                                        sx={{ backgroundColor: 'secondary.main' }}
                                                        onClick={() => onFileDelete(index)}
                                                        data-testid='delete-file-button'
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <AttachFileIcon style={{ fontSize: 30, height:"100%" }} />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography>
                                                    <p className='edit-file-name'>{file.name}</p>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </div>
                            }
                            <br/>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                {t('Upload Files')}
                                <VisuallyHiddenInput 
                                    type="file"
                                    onChange={onFileUpload}
                                    accept=".txt,.pdf"
                                />
                            </Button>
                        </EditLayout>
        </div>
    );
}

export default BotEditKnowPart;