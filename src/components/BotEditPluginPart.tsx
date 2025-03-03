import ChecklistIcon from '@mui/icons-material/Checklist';
import IconButton from '@mui/material/IconButton';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import '../css/DetailPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import { Plugin } from '../service/market';
import CheckTitle from './CheckTitle';
import PluginSelectDialog from './PluginSelectDialog';

function BotEditPluginPart({pluginCheck, setPluginCheck, plugins, setPlugins}:
     {pluginCheck: boolean, setPluginCheck: React.Dispatch<React.SetStateAction<boolean>>, 
    plugins: Plugin[], setPlugins: React.Dispatch<React.SetStateAction<Plugin[]>>}) {

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [open, setOpen] = useState(false);

    const handleClickClose = () => {
        setOpen(false);
    }

    const onPluginCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setPluginCheck(event.target.checked);
        if (!event.target.checked) {
            setPlugins([]);
        }
    }

    return (
      <div className='edit-prompts-container'>
          <CheckTitle
              check={pluginCheck}
              onCheck={onPluginCheck}
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
                      onClick={() => setOpen(true)}
                      data-testid='add-plugin-button'
                  >
                      <ChecklistIcon />
                  </IconButton>
                </div>
              </div>
          }

          <PluginSelectDialog
              open={open}
              handleClickClose={handleClickClose}
              plugins={plugins}
              setPlugins={setPlugins}
          />
      </div>
    );
}

export default BotEditPluginPart;