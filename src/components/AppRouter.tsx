import React from 'react';
import BotChatPage from '../page/BotChatPage';
import BotDetailPage from '../page/BotDetailPage';
import BotEditPage from '../page/BotEditPage';
import HomePage from '../page/HomePage';
import MarketPage from '../page/MarketPage';
import ProfilePage from '../page/ProfilePage';
import LoginPage from '../page/LoginPage';
import Navigator from './Navigator';

import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element:
            <div>
                <Navigator />
                <Outlet />
            </div>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/botchat",
                element: <BotChatPage />
            },
            {
                path: "/market",
                element: <MarketPage />
            },
            {
                path: "/botdetail/:id",
                element: <BotDetailPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/botedit",
                element: <BotEditPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ],
    }
]);

// react路由，根据url显示不同的页面
const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;
