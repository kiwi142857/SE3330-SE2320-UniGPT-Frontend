
import { DUMMY_RESPONSE, post } from '../../src/service/common';
import { createPlugin, testPlugin } from '../../src/service/PluginEdit';

jest.mock('../../src/service/common', () => ({
    post: jest.fn(), 
}));

describe('createPlugin', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        post.mockResolvedValue(mockResponseData);

        const result = await createPlugin({name: 'testPlugin', description: 'testDescription'});
        expect(result).toEqual(mockResponseData);
    });

    it('create failure', async () => {
        post.mockRejectedValue(new Error('Failed to create'));

        const result = await createPlugin({name: 'testPlugin', description: 'testDescription'});
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('testPlugin', () => {
    it('right', async () => {
        const mockResponseData = { success: true };
        post.mockResolvedValue(mockResponseData);

        const result = await testPlugin('123');
        expect(result).toEqual(mockResponseData);
    });

    it('test failure', async () => {
        post.mockRejectedValue(new Error('Failed to test'));

        const result = await testPlugin('123');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});
