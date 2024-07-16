import { DUMMY_RESPONSE, getJsonOrThrow, put } from '../../src/service/common';
import { banUser, getMe, getSearchUserList, getUerUsedBots, getUser, getUserCreatedBots, getUserFavoriteBots, isUserBanned, putUser } from '../../src/service/user';

jest.mock('../../src/service/common', () => ({
    getJsonOrThrow: jest.fn(),
    put: jest.fn(),
}));

describe('getUerUsedBots', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({bots: []});

        const result = await getUerUsedBots('123',1,2);
        expect(result).toEqual({bots: []});
    });
});

describe('getUserFavoriteBots', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({bots: []});

        const result = await getUserFavoriteBots('123',1,2);
        expect(result).toEqual({bots: []});
    });
});

describe('getUserCreatedBots', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({bots: []});

        const result = await getUserCreatedBots('123',1,2);
        expect(result).toEqual({bots: []});
    });
});

describe('getMe', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({user: {id: '123'}});

        const result = await getMe();
        expect(result).toEqual({user: {id: '123'}});
    });
});

describe('getUser', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({user: {id: '123'}});

        const result = await getUser('123');
        expect(result).toEqual({user: {id: '123'}});
    });
});

describe('putUser', () => {
    it('right', async () => {
        put.mockResolvedValue({ok: true});

        const result = await putUser({name: 'test'}, '123');
        expect(result).toEqual({ok: true});
    });

    it('put failure', async () => {
        put.mockRejectedValue(new Error('Failed to put'));

        const result = await putUser({name: 'test'}, '123');
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('getSearchUserList', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({users: []});

        const result = await getSearchUserList('test', 1, 2);
        expect(result).toEqual({users: []});
    });
});

describe('banUser', () => {
    it('right', async () => {
        put.mockResolvedValue({ok: true});

        const result = await banUser('123',true);
        expect(result).toEqual({ok: true});
    });

    it('put failure', async () => {
        put.mockRejectedValue(new Error('Failed to put'));

        const result = await banUser('123',true);
        expect(result).toEqual(DUMMY_RESPONSE);
    });
});

describe('isUserBanned', () => {
    it('right', async () => {
        getJsonOrThrow.mockResolvedValue({banned: true});

        const result = await isUserBanned('123');
        expect(result).toEqual({banned: true});
    });
});