import React from 'react';
import { Tabs, Tab, Grid, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import '../css/market.css';

export function SearchTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Latest" className='search-tab'/>
                <Tab label="Hottest" className='search-tab'/>
            </Tabs>
        </div>
    );
}

function SearchBox() {
    return (
        <div className='search-box'>
            <Input disableUnderline inputProps={{ 'aria-label': 'search' }} className='input-box'/>
        </div>
    );
}

export default function MarketSearch() {
    return (
        <Grid container spacing={0} className='market-search' >
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
                <SearchTabs></SearchTabs>
            </Grid>
            <Grid item xs={3}>
                <SearchBox></SearchBox>
            </Grid>
            <Grid item xs={2}>
                <IconButton style={{ backgroundColor: '#D9D9D9', color:'#FFFFFF', marginLeft:'-50%' }}>
                    <SearchOutlinedIcon fontSize='large'/>
                </IconButton>
            </Grid>
        </Grid>
    );
}