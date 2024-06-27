import { DUMMY_RESPONSE, PREFIX, ResponseData, del, getJsonOrThrow, post } from './common';

// 聊天类
export type BotChat = {
    id: number;
    historyId: number;  // 聊天对应的历史记录id
    name: string;
    avatar: string;
    content: string;
    type: boolean; // true: 机器人，false: 用户
}
// 聊天记录类
export type BotChatHistory = {
    id: number; // 聊天历史记录id，聊天生成时的UNIX时间戳
    title: string; // 侧边栏的历史标题
    content: string; // 侧边栏的历史信息
}

export interface BotBriefInfo {
    id: string;
    name: string;
    description: string;
    avatar: string;
    asCreator: boolean;
    asAdmin: boolean;
}

export interface Prompt {
    promptKey: string;
    promptValue: string;
}

export async function getBotBrief(botID: string | undefined): Promise<BotBriefInfo | null> {
    if (botID === undefined) return null;

    const url = `${PREFIX}/bots/${botID}?info=brief`;
    let res = getJsonOrThrow(url);
    return res;
}

export async function getBotChatHistoryList(botID: string | undefined, page: number, pagesize: number){
    const url = `${PREFIX}/bots/${botID}/histories?page=${page}&pagesize=${pagesize}`;
    let res = getJsonOrThrow(url);
    return res;
}

export async function getEmptyPromptList(botID: string | undefined): Promise<Prompt[]> {
    if (botID === undefined) return [];

    const url = `${PREFIX}/bots/${botID}?info=detail`;
    let res;

    try {
        res = await getJsonOrThrow(url);
    } catch (e) {
        res = null;
    }

    //create a Prompt[] based on the promptKeys
    let promptList: Prompt[] = [];
    for (let i = 0; i < res?.promptKeys.length; i++) {
        promptList.push({ promptKey: res.promptKeys[i], promptValue: "" });
    }

    return promptList;
}

export async function getPromptList(historyId: number): Promise<Prompt[]> {
    const url = `${PREFIX}/histories/${historyId}/promptlist`;
    let res;

    try {
        res = await getJsonOrThrow(url);
    }
    catch (e) {
        console.error(e);
        res = [];
    }

    return res;
}

export async function getBotChatList(historyId: number): Promise<BotChat[]> {
    const url = `${PREFIX}/histories/${historyId}/chats`;

    try {
        let res = await getJsonOrThrow(url);
        console.log(res);

        return res['chats'] as BotChat[];
    }
    catch (e) {
        return [];
    }
}

export async function createHistory(botID: string, promptList: Prompt[]) {

    const url = `${PREFIX}/bots/${botID}/histories`
    let res;

    try {
        res = await post(url, promptList);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function deleteHistory(historyId: number): Promise<ResponseData> {
    const url = `${PREFIX}/histories/${historyId}`;
    let res;

    try {
        res = await del(url, {});
        console.log(res);
    }
    catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}