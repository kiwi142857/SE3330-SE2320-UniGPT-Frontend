import { DUMMY_RESPONSE, getJsonOrThrow, PREFIX, put } from './common';

export interface User {
    id: number;
    name: string;
    avatar: string;
    description: string;
    account: string;
    canvasUrl: string;
}

export interface PostUser {
    name: string;
    avatar: string;
    description: string;
    canvasUrl: string;
}

export async function getUerUsedBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/used-bots?page=${page}&pagesize=${pageSize}`;
    let data = await getJsonOrThrow(url);
    return data;
}

export async function getUserFavoriteBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/starred-bots?page=${page}&pagesize=${pageSize}`;
    let data = await getJsonOrThrow(url);
    return data;
}

export async function getUserCreatedBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/created-bots?page=${page}&pagesize=${pageSize}`;
    let data = await getJsonOrThrow(url);
    return data;
}

export async function getMe() {
    const url = `${PREFIX}/users/me`;
    const response = await getJsonOrThrow(url);
    return response;
}

export async function getUser(userId: string) {
    const url = `${PREFIX}/users/${userId}`;
    const response = await getJsonOrThrow(url);
    return response;
}

export async function putUser(user: PostUser, id : number) {
    console.log("user", user);
    const url = `${PREFIX}/users/${id}`;
    let res;

    try{
        res = await put(url, user);
    } catch (e){
        console.log("PutUserError: ", e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function getSearchUserList(page: number, pageSize: number, q: string, type: string){
    const url = `${PREFIX}/users?page=${page}&pagesize=${pageSize}&q=${q}&type=${type}`;
    const response = await getJsonOrThrow(url);
    return response;
}

export async function banUser({userId, isBan}: {userId: number; isBan: boolean}){
    const url = `${PREFIX}/users/${userId}/ban?disable=${isBan}`;
    let res;

    try{
        res = await put(url, {});
    } catch(e){
        console.log("BanUserError: ", e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function isUserBanned(userId: number){
    const url = `${PREFIX}/users/${userId}/ban`;
    const response = await getJsonOrThrow(url);
    return response;
}