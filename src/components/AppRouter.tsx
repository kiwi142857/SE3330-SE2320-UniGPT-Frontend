import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BotChatPage from '../page/BotChatPage';
import BotDetailPage from '../page/BotDetailPage';
import BotEditPage from '../page/BotEditPage';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
import MarketPage from '../page/MarketPage';
import ProfilePage from '../page/ProfilePage';

// react路由，根据url显示不同的页面
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                    index
                />
                <Route
                    path="/botchat"
                    element={<BotChatPage />}
                />
                <Route
                    path="/market"
                    element={<MarketPage />}
                />
                <Route
                    path="/botdetail/:id"
                    element={<BotDetailPage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
                <Route
                    path="/botcreate"
                    element={<BotEditPage edit={false}/>}
                />
                <Route
                    path="/botedit/:id"
                    element={<BotEditPage edit={true}/>}
                />
                <Route
                    path="/*"
                    element={<HomePage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
