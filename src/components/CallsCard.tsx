import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../css/DetailPage.css';
import { Bot, Plugin } from '../service/market';

function BotCallsCard({plugins}: {plugins: Plugin[]}) {
    const { t } = useTranslation();

    return (
        <div className='detail-calls-container'>
            <Typography sx={{ color: 'primary.main' }}>
                <p className='detail-card-calls'>
                    {t("Plugins Called")}
                </p>
            </Typography>
            <div className='detail-calls-group'>
                {plugins.map((plugin, index) => (
                    <div key={index} className='detail-calls-group'>
                        <a href={'/plugindetail/' + plugin.id}>
                            <img 
                                src={plugin.avatar} 
                                alt={plugin.name} 
                                className='detail-card-small-avatar'
                            />
                        </a>
                        <p className='detail-calls-name'>{plugin.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PluginCallsCard({bots}: {bots: Bot[]}) {
    const { t } = useTranslation();

    return (
        <div className='detail-calls-container'>
            <Typography sx={{ color: 'primary.main' }}>
                <p className='detail-card-calls'>
                    {t("Bots Calling")}
                </p>
            </Typography>
            <div className='detail-calls-group'>
                {bots.map((bot, index) => (
                    <div key={index} className='detail-calls-group'>
                        <a href={'/botdetail/' + bot.id}>
                            <img 
                                src={bot.avatar} 
                                alt={bot.name} 
                                className='detail-card-small-avatar'
                            />
                        </a>
                        <p className='detail-calls-name'>{bot.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BotCallsCard;