import { AppBar, Avatar, IconButton, Link, Toolbar } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import React from 'react';
import '../css/Navigator.css';
import theme from './theme.tsx';

// 顶部导航栏
const Navigator: React.FC<{}> = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar 
                position="static" 
                className='navigator'
            >
                <Toolbar>
                        
                    {/* logo与标题 */}
                    <Box 
                        className='navigator-title-box' 
                        sx={{ flexGrow: 1}}
                    >
                        <Link 
                            href="/" 
                            underline="none" 
                            sx={{color: 'primary.dark'}}
                        >
                            <IconButton>
                                <img 
                                    src="/assets/logo.png" 
                                    alt='logo'
                                    style={{ width: '60px' }} 
                                />
                            </IconButton>
                            <span className='navigator-title'>
                                AI Assistant
                            </span>
                        </Link>
                    </Box>

                    {/* 用户头像 */}
                    <Link href="/profile">
                            <IconButton className='navigator-user'>
                                <Avatar 
                                    alt="/assets/user-default.jpg" 
                                    src="/assets/user-default.jpg" 
                                />
                            </IconButton>
                    </Link>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
        
    );
}

export default Navigator;