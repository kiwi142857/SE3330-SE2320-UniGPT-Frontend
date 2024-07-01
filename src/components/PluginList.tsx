import { Box, Grid } from '@mui/material';
import * as React from 'react';
import '../css/Market.css';
import { Plugin } from '../service/market';
import ListCard from './ListCard';

export function PluginList({ plugins }: { plugins: Plugin[] | null; }) {
    return (
        <>
            {plugins == null ? <></> :
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container item spacing={4}>
                        {/* <Grid item xs={4}>
                            <Card className='create-bot-card'>
                                <MarketCreateCard link='/plugincreate' text='Create your new plugin'></MarketCreateCard>
                            </Card>
                        </Grid> */}
                        {plugins.map(plugin => (
                            <Grid item xs={4} key={plugin.id}>
                                <ListCard
                                    link={'/plugindetail/' + plugin.id}
                                    avatar={plugin.avatar}
                                    name={plugin.name}
                                    description={plugin.description}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
        </>
    );
};