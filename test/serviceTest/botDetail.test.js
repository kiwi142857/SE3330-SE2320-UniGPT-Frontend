import { disLikeBot, getBotComments, getBotDetail, likeBot, postCommentToBot, starBot, unStarBot } from '../../src/service/BotDetail';
import { del, DUMMY_RESPONSE, getJsonOrThrow, post, put } from '../../src/service/common';

jest.mock('../../src/service/common', () => ({
    post: jest.fn(), 
    del: jest.fn(),
    getJsonOrThrow: jest.fn(),
    put: jest.fn(),
}));

describe('getBotDetail', () => {
    it('right', async () => {
        const mockBotDetailInfo = { name: 'testBot', description: 'testDescription' };
        getJsonOrThrow.mockResolvedValue(mockBotDetailInfo);

        const result = await getBotDetail('123');
        expect(result).toEqual(mockBotDetailInfo);
    });
});

describe('likeBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        put.mockResolvedValue(mockResponseData);

        const result = await likeBot('123');
        expect(result).toEqual(mockResponseData);
    });

    it('like failure', async () => {
        put.mockRejectedValue(new Error('Failed to like'));

        const result = await likeBot('123');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('dislikeBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        del.mockResolvedValue(mockResponseData);

        const result = await disLikeBot('123');
        expect(result).toEqual(mockResponseData);
    });

    it('unlike failure', async () => {
        del.mockRejectedValue(new Error('Failed to unlike'));

        const result = await disLikeBot('123');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('starBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        put.mockResolvedValue(mockResponseData);

        const result = await starBot('123');
        expect(result).toEqual(mockResponseData);
    });

    it('star failure', async () => {
        put.mockRejectedValue(new Error('Failed to star'));

        const result = await starBot('123');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('unStarBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        del.mockResolvedValue(mockResponseData);

        const result = await unStarBot('123');
        expect(result).toEqual(mockResponseData);
    });

    it('unstar failure', async () => {
        del.mockRejectedValue(new Error('Failed to unstar'));

        const result = await unStarBot('123');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('getBotComments', () => {
    it('right', async () => {
        const mockCommentList = { comments: ["testComment1", "testComment2"] };
        getJsonOrThrow.mockResolvedValue(mockCommentList);

        await getBotComments('123',1,2);
    });
});

describe('postCommentToBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        post.mockResolvedValue(mockResponseData);

        const result = await postCommentToBot('123','testComment');
        expect(result).toEqual(mockResponseData);
    });

    it('error', async () => {
        post.mockRejectedValue(new Error());

        const result = await postCommentToBot('123','testComment');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});