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
        name: 'Programming Debug Assistant',
        author: '@UniGPT official',
        avator: '/assets/bot1.png',
        description: 'The robot can help you debug your code. It can help you find the bug in your code and give you some suggestions.',
    };
    let BotInfo2: BotInfo = {
        id: '2',
        name: 'Paper Proofreading Assistant',
        author: '@UniGPT official',
        avator: '/assets/bot2.png',
        description: 'The robot can help you polish your paper. It can help you find the grammar mistakes and give you some suggestions.',
    };
    let BotInfo3: BotInfo = {
        id: '3',
        name: "Paper Translation Assistant",
        author: '@UniGPT official',
        avator: '/assets/bot3.png',
        description: 'The robot can help you translate your paper. It can help you translate the paper to the language you want and give you some suggestions.',
    };
    let BotInfo4: BotInfo = {
        id: '4',
        name: 'Paper Abstract Assistant',
        author: '@UniGPT official',
        avator: '/assets/bot4.png',
        description: 'The robot can help you write the abstract of your paper. It can help you write the abstract and give you some suggestions.',
    };
    let BotInfo5: BotInfo =
    {
        id: '5',
        name: 'Emotional Communication Robot',
        author: '@UniGPT official',
        avator: '/assets/bot5.png',
        description: 'The robot can play a role in emotional communication. It can communicate with you and give you some suggestions.',
    };
    let BotInfo6: BotInfo =
    {
        id: '6',
        name: '红课论文小助手',
        author: 'user6',
        avator: '/assets/bot6.png',
        description: '本机器人为你的红课论文提供修改建议，快来试试吧~',
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