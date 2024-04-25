import {get, PREFIX} from './common';

export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    role: string;
}

export async function getUerUsedBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/used-bots?page=${page}&pagesize=${pageSize}`;
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
        console.log("GetUserUsedBotsError: ", e);
    }
}

export async function getUserFavoriteBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/starred-bots?page=${page}&pagesize=${pageSize}`;
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
        console.log("GetUserFavoriteBotsError: ", e);
    }
}