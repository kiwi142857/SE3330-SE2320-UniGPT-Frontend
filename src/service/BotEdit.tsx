import { DUMMY_RESPONSE, getJsonOrThrow, post, PREFIX, put, ResponseData } from './common';
import { Plugin } from './market';

export enum PromptChatType {
    USER, ASSISTANT, SYSTEM
}

export interface fewShot {
    type: PromptChatType;
    content: string;
}

export interface botEditInfo {
    name: string;
    avatar: string;
    description: string;
    temperature: number;
    baseModelAPI: number;
    published: boolean;
    detail: string | null;
    photos: string[] | [];
    prompted: boolean;
    promptChats: fewShot[] | [];
    promptKeys: string[] | [];
    plugins: Plugin[];
}

export async function createBot(data: botEditInfo): Promise<ResponseData> {
    const url = `${PREFIX}/bots`;
    let res;

    try {
        res = await post(url, data);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    console.log(res);
    return res;
}

export async function getBotEditInfo(id: string): Promise<botEditInfo> {
    const url = `${PREFIX}/bots/${id}?info=edit`;
    let res = await getJsonOrThrow(url);
    return res;
}

export async function updateBot(id: string, info: botEditInfo): Promise<ResponseData> {
    const url = `${PREFIX}/bots/${id}`;
    let res;

    try {
        res = await put(url, info);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}