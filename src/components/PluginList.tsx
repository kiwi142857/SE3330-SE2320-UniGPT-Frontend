import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { Plugin } from '../service/market';
import ListCard from './ListCard';

export function PluginList({ plugins }: { plugins: Plugin[] | null; }) {
    return (
        <>
            {plugins == null ? <></> :
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container item spacing={4}>
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