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
        description: 'this is bot0',
    };
    let BotInfo1: BotInfo = {
        id: '1',
        name: 'bot1',
        author: 'user1',
        avator: '/assets/bot-default.png',
        description: 'this is bot1',
    };
    let BotInfo2: BotInfo = {
        id: '2',
        name: 'bot2',
        author: 'user2',
        avator: '/assets/bot-default.png',
        description: 'this is bot2',
    };
    let BotInfo3: BotInfo = {
        id: '3',
        name: 'bot3',
        author: 'user3',
        avator: '/assets/bot-default.png',
        description: 'this is bot3',
    };
    let BotInfo4: BotInfo = {
        id: '4',
        name: 'bot4',
        author: 'user4',
        avator: '/assets/bot-default.png',
        description: 'this is bot4',
    };
    let BotInfo5: BotInfo =
    {
        id: '5',
        name: 'bot5',
        author: 'user5',
        avator: '/assets/bot-default.png',
        description: 'this is bot5',
    };

    let BotInfoList = [BotInfo1, BotInfo2, BotInfo3, BotInfo4, BotInfo5];
    let botInfo = BotInfoList.find((item) => item.id === id);
    if (botInfo === undefined) {
        botInfo = BotInfo1;
    }
    return (
        botInfo
    );
}