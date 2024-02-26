import React from 'react';

// 侧边栏(除了bot聊天页之外的)
const MainSideBar: React.FC = () => {
    return (
        <h1>MainSideBar</h1>
    );
}

// 侧边栏（bot聊天页用)
const ChatSideBar: React.FC = () => {
    return (
        <h1>ChatSideBar</h1>
    );
}

export { ChatSideBar, MainSideBar };
