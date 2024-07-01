import ChecklistIcon from '@mui/icons-material/Checklist';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import '../css/DetailPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import { Plugin } from '../service/market';
import CheckTitle from './CheckTitle';

function BotEditPluginPart({pluginCheck, setPluginCheck} :
    {pluginCheck: boolean, setPluginCheck: React.Dispatch<React.SetStateAction<boolean>>}) {

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

      useEffect(() => {
          i18n.changeLanguage(context?.language);
      }, [context?.language, i18n]);

      const [plugins, setPlugins] = useState<Plugin[]>([]);

      useEffect(() => {
          const array = [] as Plugin[];
          for (let i = 1; i < 4; i++) {
              array.push({
                  id: i,
                  name: 'Plugin ' + i,
                  avatar: '/assets/bot' + i + '.png',
                  description: 'This is a plugin'
              });
          }
          setPlugins(array);
      }, []);

    return (
      <div className='edit-prompts-container'>
          <CheckTitle
              check={pluginCheck}
              onCheck={(event) => setPluginCheck(event.target.checked)}
              title={t('Add plugins')}
          />
          {pluginCheck &&
              <div style={{marginLeft: '90px'}}>
                <div className='detail-calls-group'>
                  {plugins.map((plugin, index) => (
                      <div key={index} className='detail-calls-group'>
                        <a href={"/plugindetail/" + plugin.id} target="_blank" rel="noopener noreferrer">
                          <img 
                              src={plugin.avatar} 
                              alt={plugin.name} 
                              className='detail-card-small-avatar'
                          />
                        </a>
                        <p className='detail-calls-name'>{plugin.name}</p>
                      </div>
                  ))}
                  <IconButton
                      sx={{backgroundColor: 'secondary.main'}}
                      onClick={() => setPlugins([...plugins, {
                          id: plugins.length + 1,
                          name: 'Plugin ' + (plugins.length + 1),
                          avatar: '/assets/bot' + (plugins.length % 5 + 1) + '.png',
                          description: 'This is a plugin'
                      }])}
                  >
                      <ChecklistIcon />
                  </IconButton>
                </div>
              </div>
          }
      </div>
    );
}

export default BotEditPluginPart;