import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BotChatPage from '../page/botChat.tsx';
import BotDetailPage from '../page/botDetail.tsx';
import BotEditPage from '../page/botEdit.tsx';
import HomePage from '../page/home.tsx';
import MarketPage from '../page/market.tsx';
import ProfilePage from '../page/profile.tsx';

// react路由，根据url显示不同的页面
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} index/>
                <Route path="/botChat" element={<BotChatPage/>} />
                <Route path="/market" element={<MarketPage/>} />
                <Route path="/botDetail" element={<BotDetailPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/botEdit" element={<BotEditPage />} />
                <Route path="/*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>  
    );
}

export default AppRouter;