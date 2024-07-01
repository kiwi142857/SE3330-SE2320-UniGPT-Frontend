import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/DetailPage.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { Plugin } from '../service/market';

function CallsCard({plugins}: {plugins: Plugin[]}) {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

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

export default CallsCard;