import { DUMMY_RESPONSE, get, getJson, PREFIX, put } from './common';

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
    let data;

    try{
        console.log("url", url);
        data = await getJson(url);
    }
    catch(e){
        console.log("GetUserUsedBotsError: ", e);
        data = null;
    }

    return data;
}

export async function getUserFavoriteBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/starred-bots?page=${page}&pagesize=${pageSize}`;
    let data;

    try{
        console.log("url", url);
        data = await getJson(url);
    }
    catch(e){
        console.log("GetUserFavoriteBotsError: ", e);
        data = null;
    }

    return data;
}

export async function getUserCreatedBots(userId: number, page: number, pageSize: number) {
    const url = `${PREFIX}/users/${userId}/created-bots?page=${page}&pagesize=${pageSize}`;
    let data;

    try{
        console.log("url", url);
        data = await getJson(url);
    }
    catch(e){
        console.log("GetUserCreatedBotsError: ", e);
        data = null;
    }

    return data;
}

export async function getMe() {
    const url = `${PREFIX}/users/me`;
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
        console.log("GetMeError: ", e);
    }
}

export async function getMeStatus() {
    const url = `${PREFIX}/users/me`;
    try{
        console.log("url", url);
        const response = await get(url);
        const statusCode = response.status; // 获取状态码
        console.log("Status Code: ", statusCode); // 打印状态码
        
        return statusCode;
    }
    catch(e){
        console.log("GetMeError: ", e);
    }
}

export async function getUser(userId: string) {
    const url = `${PREFIX}/users/${userId}`;
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
        console.log("GetMeError: ", e);
    }
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
        console.log("GetSearchUserListError: ", e);
    }
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
        console.log("IsUserBannedError: ", e);
    }
}