import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeBotCard from './HomeBotCard';
import GetBotInfo from '../service/BotInfo';
import { Favorite } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export type botListType = {Favorite:string, Recent:string};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function FormRow({ ids }: { ids: string[]; }) {
    return (
        <React.Fragment>
            {ids.map(id => {
                const botInfo = GetBotInfo(id);
                return (
                    <Grid item xs={4} key={id}>
                        <HomeBotCard BotInfo={botInfo}></HomeBotCard>
                    </Grid>
                );
            })}
        </React.Fragment>
    );
}

function FavoriteHeader() {
    return (
        <div>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton>
                        <Favorite />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Favorite</Typography>
                </Grid>
            </Grid>
            <Divider style={{marginBottom:'50px'}}/>
        </div>
    );
}

export default function BotList() {
    return (
        <Box sx={{ flexGrow: 1 }} style={{marginLeft:'50px'}}>
            <FavoriteHeader />
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <FormRow ids={['1', '2', '3']} />
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow ids={['4', '5']} />
                </Grid>
            </Grid>
        </Box>
    );
}