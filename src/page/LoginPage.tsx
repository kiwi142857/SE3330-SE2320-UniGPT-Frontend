import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigator from '../components/Navigator';
import '../css/LoginInPage.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { login } from '../service/auth';

const LoginPage: React.FC = () => {
    const loginRequestUrl = `http://jaccount.sjtu.edu.cn/oauth2/authorize?response_type=code&scope=profile&client_id=ov3SLrO4HyZSELxcHiqS&redirect_uri=${encodeURIComponent(window.location.origin)}/login`;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    const {messageError, ErrorSnackbar} = useErrorHandler();

    const navigate = useNavigate();
    useEffect(() => {
        const fetchLogin = async () => {
            if (code) {
                const result = await login(code);
                if (result.ok) {
                    navigate('/home');
                } else {
                    messageError("登录失败:" + result.message);
                }
            }
        };
        fetchLogin();
    }, [code]);

    console.log("code", code);

    return (
        <div>
            <Navigator></Navigator>
            <a href={loginRequestUrl} className="video-left-link"></a>
            <video className='home-bg' autoPlay loop muted>
                <source src="/assets/loginpage.mp4" type="video/mp4" />
            </video>
            <ErrorSnackbar />
        </div>
    );
};

export default LoginPage;