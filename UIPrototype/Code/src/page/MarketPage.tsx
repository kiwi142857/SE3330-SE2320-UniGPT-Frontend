import React from 'react';
import Navigator from '../components/Navigator';
import MarketSearch from '../components/MarketSearch';
import MarketCard from '../components/MarketCard';
// bot市场
const MarketPage: React.FC = () => {
    return (
        <div className='nav'>
            <Navigator ></Navigator>
            <div style={{ marginTop: '100px' }}>
                <MarketSearch></MarketSearch>
            </div>
            <div style={{ marginTop: '20px' }}>
                <MarketCard></MarketCard>
            </div>
        </div>
    );
};

export default MarketPage;