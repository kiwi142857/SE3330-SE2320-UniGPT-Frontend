import { AppBar, Avatar, IconButton, Link, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navigator.css';
import { getMe } from '../service/user';
import LanguageButton from './LanguageButton';
import { ListButton } from './ListButton';

// 顶部导航栏
const Navigator: React.FC<{}> = () => {

    const [avatar, setAvatar] = React.useState<string>('/assets/user-default.png');
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const getAvatar = async () => {
        if (window.location.pathname === '/login') {
            return;
        }
        await getMe().then((user) => {
            if (user.avatar) setAvatar(user.avatar);
            if (user.asAdmin) setIsAdmin(true);
        }).catch(() => {
            navigate('/login');
        });
    };

    useEffect(() => {
        getAvatar();
    }, []);

    return (
        <AppBar
            position="fixed"
            className="navigator"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <ListButton isAdmin={isAdmin}></ListButton>
                <LanguageButton></LanguageButton>
                {/* logo与标题 */}
                <Box
                    className='navigator-title-box'
                    sx={{ flexGrow: 1 }}
                    flexDirection="column"
                    alignItems="center"
                    display="flex"
                    width="100%"
                >
                    <Link
                        href="/"
                        underline="none"
                        sx={{ color: 'primary.dark' }}
                    >
                        <IconButton>
                            <img
                                src="/assets/logo.png"
                                alt='logo'
                                style={{ width: '60px' }}
                            />
                        </IconButton>
                        <span className='navigator-title'>
                            UniGPT
                        </span>
                    </Link>
                </Box>

                {/* 用户头像 */}
                <Link href="/profile/me">
                    <IconButton className='navigator-user' size='medium'>
                        <Avatar
                            alt="/assets/user-default.png"
                            src={avatar}
                            sx={{ width: 50, height: 50 }}
                        />
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navigator;
