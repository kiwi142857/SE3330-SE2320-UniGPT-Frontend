import React from 'react';
import Navigator from '../components/Navigator';
import '../css/LoginInPage.css';

const LoginPage: React.FC = () => {

    const loginRequestUrl = "http://jaccount.sjtu.edu.cn/oauth2/authorize?response_type=code&scope=profile&client_id=ov3SLrO4HyZSELxcHiqS&redirect_uri=http://localhost:3000/login";
    return (
        <div>
            <Navigator></Navigator>
            <a href={loginRequestUrl} className="video-left-link"></a>
            <video className='home-bg' autoPlay loop muted>
                <source src="/assets/loginpage.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default LoginPage;