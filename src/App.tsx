import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import AppRouter from './components/AppRouter';
import theme from './components/theme';
import './css/App.css';
import i18n from './i18n'; // make sure to import your i18n settings
import { LanguageProvider } from './provider/LanguageProvider'; // make sure to import LanguageProvider

const App = () => {
    useEffect(() => {
      window.addEventListener('error', e => {
          if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
              const resizeObserverErrDiv = document.getElementById(
                  'webpack-dev-server-client-overlay-div'
              );
              const resizeObserverErr = document.getElementById(
                  'webpack-dev-server-client-overlay'
              );
              if (resizeObserverErr) {
                  resizeObserverErr.setAttribute('style', 'display: none');
              }
              if (resizeObserverErrDiv) {
                  resizeObserverErrDiv.setAttribute('style', 'display: none');
              }
          }
      });
    }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <AppRouter />
          </LanguageProvider>
        </ThemeProvider>
      </div>
    </I18nextProvider>
  );
}

export default App;