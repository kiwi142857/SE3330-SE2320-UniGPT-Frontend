import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';
import '../css/Market.css';
import { Plugin } from '../service/market';
import { MarketCreateCard } from './BotList';
import { default as ListCard, SelectListCard } from './ListCard';

export function PluginList({ plugins }: { plugins: Plugin[] | null; }) {
    return (
        <>
            {plugins == null ? <></> :
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container item spacing={4}>
                        <Grid item xs={4}>
                            <Card className='create-bot-card'>
                                <MarketCreateCard link='/plugincreate' text='Create your new plugin'></MarketCreateCard>
                            </Card>
                        </Grid>
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

export function PluginSelectList({ allPlugins,selectedPlugins, setSelectedPlugins }:
    {   allPlugins: Plugin[], 
        selectedPlugins: Plugin[], 
        setSelectedPlugins: React.Dispatch<React.SetStateAction<Plugin[]>> 
    }) {
    const handleSelectChange = (plugin: Plugin, selected: boolean) => {
        if (selected) {
            setSelectedPlugins([...selectedPlugins, plugin]);
        } else {
            setSelectedPlugins(selectedPlugins.filter(p => p.id !== plugin.id));
        }
    };

    return (
        <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container item spacing={4}>
                        {/* <Grid item xs={4}>
                            <Card className='create-bot-card'>
                                <MarketCreateCard link='/plugincreate' text='Create your new plugin'></MarketCreateCard>
                            </Card>
                        </Grid> */}
                        {allPlugins.map(plugin => (
                            <Grid item xs={4} key={plugin.id}>
                                <SelectListCard
                                    link={'/plugindetail/' + plugin.id}
                                    avatar={plugin.avatar}
                                    name={plugin.name}
                                    description={plugin.description}
                                    selected={selectedPlugins.some(p => p.id === plugin.id)}
                                    onSelectChange={(selected) => handleSelectChange(plugin, selected)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
        </>
    );
};