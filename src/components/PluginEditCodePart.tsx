import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import { paramTest } from '../service/PluginEdit';
import BasicInput from './BasicInput';
import CheckTitle from './CheckTitle';
import CodeEditor from './CodeEditor';
import EditLayout from './EditLayout';
import { TypeSelect } from './SelectInputs';
import theme from "./theme";

function ThreeWordsLayout({index, forTitle, texts, handleDelete}: 
    {forTitle: boolean, texts: string[], handleDelete: (index: number) => void, index: number}) {
    return (
        <Grid container>
            {forTitle ? <Grid item xs= {1}/> : 
                <Grid item xs= {1}>
                    <div className='oneprompt-element'>
                        <IconButton
                            sx={{ backgroundColor: 'secondary.main' }}
                            onClick={() => handleDelete(index)}
                            data-testid='delete-param-button'
                        >
                            <RemoveIcon />
                        </IconButton>
                    </div>
                </Grid>
            }
            {texts.map((text, index) => (
                <Grid item xs={3}>
                    <Typography
                        className='edit-label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        sx={{ color: 'primary.main' }}
                    >
                        <p>{text}</p>
                    </Typography>
                </Grid>
            ))}
            <Grid item xs={2}/>
        </Grid>
    );
}

function PluginEditCodePart({code, setCode, params, setParams}:
    {   code: string, 
        setCode: (code: string) => void, 
        params: paramTest[],
        setParams: (params: paramTest[]) => void
    }) {

    const context = React.useContext(LanguageContext);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { t, i18n } = useTranslation();

    const handleDelete = (index: number) => {
        const newParams = [...params];
        newParams.splice(index, 1);
        setParams(newParams);
    }

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

  return (
    <div className='prompts-list-container'>
        <CheckTitle
            check={true}
            onCheck={() => {}}
            title={t('Plugin Running Logic')}
        />

        {/* <EditLayout title={t('File name')} leftSpace={2} rightSpace={4}>
            <BasicInput
                placeholder={t('no need to add suffix .py')}
                name='fileName'
                maxLength={255}
                required
            />
        </EditLayout> */}

        <EditLayout title={t('Parameter')} leftSpace={2}>
            <ThreeWordsLayout 
                forTitle={true}
                texts={[t('Name'), t('Type'), t('Parameter description')]}
                handleDelete={handleDelete}
                index={-1}
            />
            <div className='prompts-list-container'>
                {params.map((param, index) => (
                    <ThreeWordsLayout 
                        forTitle={false}
                        texts={[param.name, param.type, param.description]}
                        handleDelete={handleDelete}
                        index={index}
                    />
                ))}
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <IconButton
                            sx={{backgroundColor: 'secondary.main'}}
                            onClick={() => setOpen(true)}
                            data-testid='add-param-button'
                        >
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </EditLayout>

        <EditLayout title={t('Code')} leftSpace={2}>
            <CodeEditor 
                code={code}
                setCode={setCode}
            />
        </EditLayout>

        <EditLayout title={t('Test your code')} leftSpace={2}>
            <Grid container>
                <Grid item xs={3}>
                    <Typography
                        className='edit-label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        sx={{ color: 'primary.main' }}
                    >
                        {t('Parameter Name')}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography
                        className='edit-label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        sx={{ color: 'primary.main' }}
                    >
                        {t('Value for test')}
                    </Typography>
                </Grid>
                <Grid item xs={6}/>
            </Grid>
                <div className='prompts-list-container'>
                    {params.map((param, index) => (
                        <EditLayout title={param.name} leftSpace={3} rightSpace={9}>
                            <BasicInput
                                placeholder={t('input value for test')}
                                name='paramValue'
                                onChange={(event) => {
                                    const newParams = [...params];
                                    newParams[index].value = event.target.value;
                                    setParams(newParams);
                                }}
                                required
                            />
                        </EditLayout>
                    ))}
                </div>
        </EditLayout>
                
                <Dialog
                    open={open}
                    PaperProps={{
                        component: 'form',
                        style: {
                            borderRadius: 32,
                            padding: 50,
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }
                    }}
                >
                    <DialogTitle className="table-create-title">
                        {t('Add a new parameter')}
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <EditLayout title={t('Name')} leftSpace={6} rightSpace={12}>
                                <BasicInput
                                    placeholder={t("Maximum 25 characters input")}
                                    name='param name'
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    maxLength={25}
                                    required
                                />
                            </EditLayout>
                            <EditLayout title={t('Type')} leftSpace={6} rightSpace={12}>
                                <TypeSelect
                                    value={type}
                                    defaultValue="string"
                                    setValue={setType}
                                />
                            </EditLayout>
                            <EditLayout title={t('Parameter description')} leftSpace={6} rightSpace={12}>
                                <BasicInput
                                    placeholder={t("Maximum 255 characters input")}
                                    name='param description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                />
                            </EditLayout>
                        </div>
                    </DialogContent>
                    <DialogActions
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            className="drawer-button"
                            style={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                            }}
                            onClick={() => {
                                setParams([...params, {name: name, type: type, description: description, value: ''}]);
                                setOpen(false);
                            }}
                        >
                            {t('Confirm')}
                        </Button>
                    </DialogActions>
                </Dialog>
    </div>
  );
}

export default PluginEditCodePart;