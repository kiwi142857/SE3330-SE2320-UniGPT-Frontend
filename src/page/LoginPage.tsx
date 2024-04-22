import React from 'react';
import '../css/LoginInPage.css';

const LoginPage: React.FC = () => {
    return (
        <div>
            <a href="https://i.sjtu.edu.cn/jaccountlogin" className="video-left-link"></a>
            <video className='home-bg' autoPlay loop muted>
                <source src="/assets/loginpage.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default LoginPage;