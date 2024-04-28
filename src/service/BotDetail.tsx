import { PREFIX, del, getJson, put } from './common';

export interface botDetailInfo{
    id: string;
    name: string;
    creator: string;
    description: string;
    detail: string;
    avatar: string;
    baseModelAPI: string;
    photos: string[] | [];
    likeNumber: number;
    starNumber: number;
    liked: boolean;
    starred: boolean;
    asCreator: boolean;
}
  
export interface Comment {
    id: string;
    name: string;
    avatar: string;
    content: string;
}

export async function getBotDetail(id: string): Promise<botDetailInfo | null> {

    const url = `${PREFIX}/bots/${id}?info=detail`;
    let res;

    try{
        res = await getJson(url);
        // console.log(res);
    } catch (e) {
        console.error(e);
        res = null;
    }

    return res;
}

export async function likeBot(id: string) {
    const url = `${PREFIX}/bots/${id}/likes`;
    let res;

    try{
        res = await put(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = null;
    }

    return res;
}

export async function disLikeBot(id: string) {
    const url = `${PREFIX}/bots/${id}/likes`;
    let res;

    try{
        res = await del(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = null;
    }

    return res;
}

export async function starBot(id: string) {
    const url = `${PREFIX}/bots/${id}/stars`;
    let res;

    try{
        res = await put(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = null;
    }

    return res;
}

export async function unStarBot(id: string) {
    const url = `${PREFIX}/bots/${id}/stars`;
    let res;

    try{
        res = await del(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = null;
    }

    return res;
}

export async function getBotComments(id: string) {
    let comments = {
        total: 3,
        items: [
            {
                id: '1',
                name: '古金鱼单推人',
                avatar: '/assets/user-1.png',
                content: '非常好机器人，使我的数据结构课程满绩。',
            },
            {
                id: '5',
                name: '坩埚今天吃什么',
                avatar: '/assets/user-2.png',
                content: '借楼吐槽自动化系大三某门编程课，每次上这门课鼠鼠都感到莫大的头痛。每节课信息量极大，还没有教材，参考资料就是课件。老师上课讲的内容往往从脑子里滑过去就什么痕迹都没有留下。所以不得不课后看回放补笔记。然而面对大作业和平时的课后作业时，还是要翻阅百来页的ppt查找遗漏的细节，而且很大概率无济于事，最终还是得转向csdn求助。代码是一点也不会然后bug一堆，还得靠AI。',
            },
            {
                id: '2',
                name: '三三得九',
                avatar: '/assets/user-1.png',
                content: '要debug最好还是先不打扰助教，先自己搜索或者来问机器人',
            },
            {
                id: '3',
                name: '考不进复旦不改名',
                avatar: '/assets/user-3.png',
                content: '好好好，和直接问助教一样及时',
            },

            {
                id: '4',
                name: '楼上是我大哥',
                avatar: '/assets/user-2.png',
                content: '提交表单里能不能加一项“debug要求”？',
            },
        ]
    }

    // const res = await get(`/bot/${id}/comments`);

    return comments;
}
