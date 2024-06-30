import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Grid, Input, Tab, Tabs } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Market.css';
import { LanguageContext } from "../provider/LanguageProvider";

export function SearchTabs({tabValue, setTabValue, tabNames}: 
    {   tabValue: number, 
        setTabValue: React.Dispatch<React.SetStateAction<number>>,
        tabNames: string[]
    }) 
{
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Tabs value={tabValue} onChange={handleChange}>
                {tabNames.map((name, index) => (
                    <Tab label={t(name)} className='search-tab' key={index}/>
                ))}
            </Tabs>
        </div>
    );
}

export function SearchBox({onChange}: {onChange: (keyword: string) => void}) {
    return (
        <div className='search-box'>
            <Input 
                disableUnderline 
                inputProps={{ 'aria-label': 'search' }} 
                className='input-box'
                onChange={(e) => onChange(e.target.value)}>
            </Input>
        </div>
    );
}

export default function SearchBar({tabValue, setTabValue, onChange, tabNames}: 
    {   tabValue: number, 
        setTabValue: React.Dispatch<React.SetStateAction<number>>,
        onChange: (keyword: string) => void
        tabNames: string[]
    }) 
{
    return (
        <Grid container spacing={0} className='search-bar'>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
                <SearchTabs 
                    tabValue={tabValue} 
                    setTabValue={setTabValue}
                    tabNames={tabNames}>
                </SearchTabs>
            </Grid>
            <Grid item xs={3}>
                <SearchBox onChange={onChange}></SearchBox>
            </Grid>
            <Grid item xs={2}>
                <IconButton style={{ backgroundColor: '#D9D9D9', color:'#FFFFFF', marginLeft:'-50%' }}>
                    <SearchOutlinedIcon fontSize='large'/>
                </IconButton>
            </Grid>
        </Grid>
    );
}