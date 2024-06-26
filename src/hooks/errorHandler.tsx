import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';

export function useErrorHandler() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const messageError = (errorMsg: string) => {
    setMessage(errorMsg);
    setOpen(true);
  };

  const ErrorSnackbar: React.FC = () => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ marginTop: '70px'}}
        onClose={() => setOpen(false)}
        message={message}
        ContentProps={
            { style: {background: '#ffffff', color: '#ff0000', fontWeight: 'bold'}}
        }
    />
  );

  return {messageError, ErrorSnackbar};
}