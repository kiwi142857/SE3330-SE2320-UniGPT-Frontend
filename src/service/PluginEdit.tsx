import { DUMMY_RESPONSE, ResponseData } from './common';

export interface param {
    name: string;
    type: string;
    description: string;
}

export interface pluginEditInfo {
    name: string;
    avatar: string;
    description: string;
    fileName: string;
    code: string;
    param: param[];
    detail: string | null;
    photos: string[] | [];
}

export async function createPlugin(data: pluginEditInfo): Promise<ResponseData> {
    // const url = `${PREFIX}/bots`;
    let res;

    try {
        // res = await post(url, data);
        res = {
            ok: true,
            message: "插件创建成功"
        }
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    console.log(res);
    return res;
}