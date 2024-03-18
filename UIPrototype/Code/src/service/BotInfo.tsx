export type BotInfo = {
    id: string;
    name: string;
    author: string;
    description: string;
    avator: string;
};

export default function GetBotInfo(id: string) {
    let BotDefault: BotInfo = {
        id: '0',
        name: 'bot0',
        author: 'user0',
        avator: '/assets/bot-default.png',
        description: 'Write your description here...',
    };
    let BotInfo1: BotInfo = {
        id: '1',
        name: 'bot1',
        author: 'user1',
        avator: '/assets/bot-default.png',
        description: 'Write your description here...',
    };
    let BotInfo2: BotInfo = {
        id: '2',
        name: 'bot2',
        author: 'user2',
        avator: '/assets/bot2.png',
        description: 'Write your description here...',
    };
    let BotInfo3: BotInfo = {
        id: '3',
        name: 'bot3',
        author: 'user3',
        avator: '/assets/bot3.png',
        description: 'Write your description here...',
    };
    let BotInfo4: BotInfo = {
        id: '4',
        name: 'bot4',
        author: 'user4',
        avator: '/assets/bot4.png',
        description: 'Write your description here...',
    };
    let BotInfo5: BotInfo =
    {
        id: '5',
        name: 'bot5',
        author: 'user5',
        avator: '/assets/bot5.png',
        description: 'Write your description here...Write your description here...Write your description here...Write your description here...Write your description here...Write your description here...Write your description here...',
    };
    let BotInfo6: BotInfo =
    {
        id: '6',
        name: 'bot6',
        author: 'user6',
        avator: '/assets/bot6.png',
        description: 'Write your description here...',
    };

    let BotInfoList = [BotInfo1, BotInfo2, BotInfo3, BotInfo4, BotInfo5, BotInfo6];
    let botInfo = BotInfoList.find((item) => item.id === id);
    if (botInfo === undefined) {
        botInfo = BotDefault;
    }
    return (
        botInfo
    );
}