import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import AppRouter from './components/AppRouter';
import theme from './components/theme';
import './css/App.css';
import TableCreateForm from "./components/TableCreateDialog.tsx";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
