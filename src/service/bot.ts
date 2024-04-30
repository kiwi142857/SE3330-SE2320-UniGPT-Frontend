import {get, PREFIX} from './common';

export interface Bot {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

export async function getSearchBotList(page: number, pageSize: number, q: string) {
    const url = `${PREFIX}/bots?page=${page}&pagesize=${pageSize}&q=${q}`;
    try{
        console.log("url", url);
        const response = await get(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("response", data);
        return data;
    }
    catch(e){
        console.log("GetSearchBotListError: ", e);
    }
}