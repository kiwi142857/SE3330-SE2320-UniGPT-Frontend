import { PREFIX, getJsonOrThrow } from './common';

export interface Bot {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

export interface Plugin {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

interface BotResponse {
    bots: Bot[];
    total: number;
}

interface PluginResponse {
    plugins: Plugin[];
    total: number;
}

export async function getSearchBotList(page: number, pageSize: number, q: string, order: string): Promise<BotResponse>  {
    const url = `${PREFIX}/bots?page=${page}&pagesize=${pageSize}&q=${q}&order=${order}`;
    let data = await getJsonOrThrow(url);
    return data;
}

export async function getSearchPluginList(page: number, pageSize: number, q: string, order: string): Promise<PluginResponse>  {
    // const url = `${PREFIX}/bots?page=${page}&pagesize=${pageSize}&q=${q}&order=${order}`;
    // let data = await getJsonOrThrow(url);
    // return data;
    let plugins: Plugin[] = [];
    for (let i = 1; i < 11; i++) {
        plugins.push({
            id: i,
            name: `plugin${i}`,
            description: `description${i}`,
            avatar: `/assets/bot${i % 6 + 1}.png`
        });
    }
    return {plugins: plugins, total: 10};
}