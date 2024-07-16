import { getJsonOrThrow } from '../../src/service/common';
import { getPluginDetail } from '../../src/service/PluginDetail';

jest.mock('../../src/service/common', () => ({
    getJsonOrThrow: jest.fn(),
}));

describe('getPluginDetail', () => {
    it('right', async () => {
        const mockPluginDetailInfo = { name: 'testPlugin', description: 'testDescription' };
        getJsonOrThrow.mockResolvedValue(mockPluginDetailInfo);

        const result = await getPluginDetail('123');
        expect(result).toEqual(mockPluginDetailInfo);
    });
});