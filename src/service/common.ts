type FetchOptions = {
    method: string;
    body?: string;
    headers?: {
        'Content-Type': string;
    };
    credentials: RequestCredentials;
};

export interface ResponseData {
    ok: boolean;
    message: string;
}

export async function getJsonOrThrow(url: string): Promise<any> {
    let result;
    try {
        result = await getJsonBasic(url);
    } catch(e) {
        throw {ok: false, message: 'network error'};
    }

    if (result.status !== 200) {
        throw {ok: false, message: result.json.message ?? 'network error'};
    }
    return result.json;
}

export async function getJsonBasic(url: string): Promise<any> {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    checkStatus(res);
    return {
        json: await res.json(),
        status: res.status,
    };
}

export async function getJson(url: string): Promise<any> {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    checkStatus(res);
    return res.json();
}

export async function get(url: string): Promise<Response> {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    checkStatus(res);
    return res;
}

export async function put(url: string, data: any): Promise<any> {
    let opts: FetchOptions = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    checkStatus(res);
    return res.json();
}

export async function del(url: string, data: any): Promise<any> {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    checkStatus(res);
    return res.json();
}

export async function post(url: string, data: any): Promise<any> {
    let opts: FetchOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    checkStatus(res);
    return res.json();
}

function checkStatus(res: Response) {
    if (res.status === 401) {
        console.log('Unauthorized');
        window.location.href = '/login';
        throw new Error('Unauthorized');
    } else if (res.status === 403) {
        console.log('Forbidden');
        alert("您已被封禁");
        window.location.href = '/login';
        throw new Error('Forbidden');
    }
}

export const BACKEND_SERVER_IP = process.env.REACT_APP_IP ?? 'localhost';
export const websocketUrl = `wss://${BACKEND_SERVER_IP}:8080/chat`;
export const BASEURL: string = `https://${BACKEND_SERVER_IP}:8080`; 
export const PREFIX: string = `${BASEURL}/api`;
export const API_DOCS_URL: string = `${BASEURL}/api-docs`;
export const DUMMY_RESPONSE: ResponseData = {
    ok: false,
    message: "网络错误！"
}
