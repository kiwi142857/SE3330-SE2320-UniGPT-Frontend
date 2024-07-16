import { getJsonOrThrow } from '../../src/service/common';
import { getSearchBotList, getSearchPluginList } from '../../src/service/market';

jest.mock('../../src/service/common', () => ({
    getJsonOrThrow: jest.fn(),
}));

describe('getSearchBotList', () => {
    it('right', async () => {
        const mockSearchBotList = [{ name: 'testBot', description: 'testDescription' }];
        getJsonOrThrow.mockResolvedValue(mockSearchBotList);

        const result = await getSearchBotList(1,2,"test","hottest");
        expect(result).toEqual(mockSearchBotList);
    });
});

describe('getSearchPluginList', () => {
    it('right', async () => {
        const mockSearchPluginList = [{ name: 'testPlugin', description: 'testDescription' }];
        getJsonOrThrow.mockResolvedValue(mockSearchPluginList);

        const result = await getSearchPluginList(1,2,"test","hottest");
        expect(result).toEqual(mockSearchPluginList);
    });
});
