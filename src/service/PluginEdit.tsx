import { DUMMY_RESPONSE, post, PREFIX, ResponseData } from './common';

export interface param {
    name: string;
    type: string;
    description: string;
}

export interface paramTest {
    name: string;
    type: string;
    description: string;
    value: string;
}

export interface pluginEditInfo {
    name: string;
    avatar: string;
    description: string;
    detail: string | null;
    photos: string[] | [];
    parameters: param[];
    code: string;
    isPublished: boolean;
}

export interface testPluginEditInfo {
    name: string;
    avatar: string;
    description: string;
    detail: string | null;
    photos: string[] | [];
    parameters: param[];
    code: string;
    isPublished: boolean;
    paramsValue: string[];
}

export async function createPlugin(data: pluginEditInfo): Promise<ResponseData> {
    const url = `${PREFIX}/plugin/create`;
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

export async function testPlugin(data: testPluginEditInfo): Promise<ResponseData> {
    const url = `${PREFIX}/plugin/test`;
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