import { BotBriefInfo } from './BotChat';
import { PREFIX, getJsonOrThrow } from './common';

export interface pluginDetailInfo {
    id: string;
    name: string;
    creator: string;
    creatorId: string;
    description: string;
    detail: string;
    avatar: string;
    photos: string[] | [];
    asCreator: boolean;
    asAdmin: boolean;
    bots: BotBriefInfo[];
}

export async function getPluginDetail(pluginid: string): Promise<pluginDetailInfo | null> {
    const url = `${PREFIX}/plugin/${pluginid}`;
    let res = await getJsonOrThrow(url);
    return res;
}