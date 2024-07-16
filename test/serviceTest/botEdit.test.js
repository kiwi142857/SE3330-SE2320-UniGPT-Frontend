import { createBot, getBotEditInfo, updateBot } from '../../src/service/BotEdit';
import { DUMMY_RESPONSE, getJsonOrThrow, post, put } from '../../src/service/common';

jest.mock('../../src/service/common', () => ({
    post: jest.fn(), 
    getJsonOrThrow: jest.fn(),
    put: jest.fn(),
}));

describe('createBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        post.mockResolvedValue(mockResponseData);

        const result = await createBot({name: 'testBot', description: 'testDescription'});
        expect(result).toEqual(mockResponseData);
    });

    it('create failure', async () => {
        post.mockRejectedValue(new Error('Failed to create'));

        const result = await createBot({name: 'testBot', description: 'testDescription'});
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('updateBot', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        put.mockResolvedValue(mockResponseData);

        const result = await updateBot('123', {name: 'testBot', description: 'testDescription'});
        expect(result).toEqual(mockResponseData);
    });

    it('update failure', async () => {
        put.mockRejectedValue(new Error('Failed to update'));

        const result = await updateBot('123', {name: 'testBot', description: 'testDescription'});
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('getBotEditInfo', () => {
    it('right', async () => {
        const mockBotEditInfo = { name: 'testBot', description: 'testDescription' };
        getJsonOrThrow.mockResolvedValue(mockBotEditInfo);

        const result = await getBotEditInfo('123');
        expect(result).toEqual(mockBotEditInfo);
    });
});