import React from 'react';
import Navigator from '../components/Navigator.tsx';

// 首页
const HomePage: React.FC = () => {
    return (
        <div>
            <Navigator></Navigator>
            <h1>HomePage</h1>
        </div>
    );
}

export default HomePage;