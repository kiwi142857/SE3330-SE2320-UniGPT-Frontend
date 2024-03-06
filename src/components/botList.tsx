import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeBotCard from './HomeBotCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from '@mui/material/Link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GetBotInfo from '../service/BotInfo';
import { Favorite, MarginRounded } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export type botListType = { Favorite: string, Recent: string; };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



function HomeMarketCard() {
    return (
        <Link href='/bot1' style={{ textDecoration: 'none', width: '30%', height: '30%', borderRadius: '20px' }}>
            <Card elevation={0}>
                <ShoppingCartOutlinedIcon style={{ width: '30%', height: '30%', marginTop:'25px', color:'#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                        More form market
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

function HomeCreateCard() {
    return (
        <Link href='/bot1' style={{ textDecoration: 'none' }} >
            <Card elevation={0}>
                <AddCircleOutlineIcon style={{ width: '30%', height: '30%', marginTop:'25px', color:'#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                        Craete your new bot
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function RecentUsedHeader() {
    return (
        <div style={{marginLeft:'20px', marginTop:'10px'}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton>
                        <AccessTimeFilledIcon fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>Recently Used</Typography>
                </Grid>
            </Grid>
            <Divider  className='Divider'/>
        </div>
    );
}

export function FavoriteHeader() {
    return (
        <div style={{marginLeft:'60px', marginTop:'10px'}}>
            <Grid container alignItems="center" spacing={3}>
                <Grid item>
                    <IconButton>
                        <Favorite fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>Favorite</Typography>
                </Grid>
            </Grid>
            <Divider  className='Divider'/>
        </div>
    );
}

export interface BotListProps {
    type: 'Favorite' | 'Recently used';
}

export default function BotList({ type }: BotListProps) {
    const ids = ['1', '2', '3', '4', '5', '6'];
    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginLeft: type === 'Favorite' ? '60px' : '0', marginRight: type === 'Favorite' ? '0' : '80px' }}>
            <Grid container spacing={1}>
                <Grid container item spacing={2}>
                    <Grid item xs={4}>
                    {type === 'Favorite' ? <HomeMarketCard /> : <HomeCreateCard></HomeCreateCard>}
                    </Grid>
                    {ids.map(id => (
                        <Grid item xs={4} key={id}>
                            <HomeBotCard BotInfo={GetBotInfo(id)} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}