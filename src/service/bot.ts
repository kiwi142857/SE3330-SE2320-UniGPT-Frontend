import { PREFIX, getJsonOrThrow } from './common';

export interface Bot {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

interface BotResponse {
    bots: Bot[];
    total: number;
}

export async function getSearchBotList(page: number, pageSize: number, q: string, order: string): Promise<BotResponse>  {
    const url = `${PREFIX}/bots?page=${page}&pagesize=${pageSize}&q=${q}&order=${order}`;
    let data = await getJsonOrThrow(url);
    return data;
}