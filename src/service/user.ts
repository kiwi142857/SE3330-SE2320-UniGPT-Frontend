import {get, PREFIX} from './common';

export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    role: string;
}

export async function getUerUsedBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/user/${userId}/used-bots?page=${page}&pagesize=${pageSize}`;
    try{
        const response = await get(url);
        console.log(response);
        return response.json();
    }
    catch(e){
        console.log("GetUserUsedBotsError: ", e);
    }
}

