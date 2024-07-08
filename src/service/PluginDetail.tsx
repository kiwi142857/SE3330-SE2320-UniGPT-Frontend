
export interface pluginDetailInfo {
    id: string;
    name: string;
    creator: string;
    creatorId: string;
    description: string;
    detail: string;
    avatar: string;
    photos: string[] | [];
    likeNumber: number;
    starNumber: number;
    liked: boolean;
    starred: boolean;
    asCreator: boolean;
    asAdmin: boolean;
}

export async function getPluginDetail(id: string): Promise<pluginDetailInfo | null> {

    // const url = `${PREFIX}/bots/${id}?info=detail`;
    // let res = await getJsonOrThrow(url);
    // return res;
    return {
        id: `${id}`,
        name: `Plugin ${id}`,
        creator: 'kiwi',
        creatorId: '1',
        description: 'test description',
        detail: 'test detail test detail test detail test detail test detail test detail test detail test detail test detail test detail',
        avatar: `/assets/bot${Number(id) % 6 + 1}.png`,
        photos: ["/assets/bot-detail-1.png", "/assets/bot-detail-2.png", "/assets/bot-detail-3.png"],
        likeNumber: 12,
        starNumber: 11,
        liked: true,
        starred: true,
        asCreator: true,
        asAdmin: true,
    };
}

export async function likePlugin(id: string) {
    // const url = `${PREFIX}/bots/${id}/likes`;
    // let res;

    // try {
    //     res = await put(url, {});
    //     console.log(res);
    // } catch (e) {
    //     console.error(e);
    //     res = DUMMY_RESPONSE;
    // }

    // return res;
}

export async function disLikePlugin(id: string) {
    // const url = `${PREFIX}/bots/${id}/likes`;
    // let res;

    // try {
    //     res = await del(url, {});
    //     console.log(res);
    // } catch (e) {
    //     console.error(e);
    //     res = DUMMY_RESPONSE;
    // }

    // return res;
}

export async function starPlugin(id: string) {
    // const url = `${PREFIX}/bots/${id}/stars`;
    // let res;

    // try {
    //     res = await put(url, {});
    //     console.log(res);
    // } catch (e) {
    //     console.error(e);
    //     res = DUMMY_RESPONSE;
    // }

    // return res;
}

export async function unStarPlugin(id: string) {
    // const url = `${PREFIX}/bots/${id}/stars`;
    // let res;

    // try {
    //     res = await del(url, {});
    //     console.log(res);
    // } catch (e) {
    //     console.error(e);
    //     res = DUMMY_RESPONSE;
    // }

    // return res;
}
