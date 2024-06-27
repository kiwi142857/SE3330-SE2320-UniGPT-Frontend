import { DUMMY_RESPONSE, PREFIX, ResponseData, post } from "./common";

export async function login(code: string): Promise<ResponseData> {
    const url = `${PREFIX}/auth/jaccountLogin`;
    let result: ResponseData;

    try {
        result = await post(url, { code });
    } catch (e) {
        console.log(e);
        result = DUMMY_RESPONSE;
    }
    return result;
}

export async function logout(): Promise<ResponseData> {
    const url = `${PREFIX}/auth/logout`;
    let result: ResponseData;

    try {
        result = await post(url, {});
    } catch (e) {
        console.log(e);
        result = DUMMY_RESPONSE;
    }
    return result;
}