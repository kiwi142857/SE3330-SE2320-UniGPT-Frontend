import { Grid, Typography } from '@mui/material';
import React from 'react';
import '../css/BotEditPage.css';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const EditLayout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <Grid container>
            <Grid item xs={2}>
                <Typography
                    className='edit-label'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    sx={{ color: 'primary.main' }}
                >
                    <p>{title}</p>
                </Typography>
            </Grid>
            <Grid item xs={10}>
                {children}
            </Grid>
        </Grid>
    );
};

export default EditLayout;