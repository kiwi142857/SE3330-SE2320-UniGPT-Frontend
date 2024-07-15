import fetch from 'jest-fetch-mock';
import { del, getJsonOrThrow, post, put } from '../../src/service/common';

global.fetch = jest.fn(fetch);

test('getJsonOrThrow returns JSON on success', async () => {
    const mockResponse = { key: 'value' };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await getJsonOrThrow('https://example.com');
    expect(result).toEqual(mockResponse);
});

test('getJsonOrThrow throws on network error', async () => {
  fetch.mockReject(new Error('network error'));

  await expect(getJsonOrThrow('https://example.com')).rejects.toEqual({
    ok: false,
    message: 'network error',
  });
});

test('getJsonOrThrow throws not 401 & 403', async () => {
    const mockResponse = { message: 'Not Found' };
    fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 404 });

    await expect(getJsonOrThrow('https://example.com')).rejects.toEqual({
        ok: false,
        message: 'Not Found',
    });
});

test('put', async () => {
    fetch.mockResponseOnce(JSON.stringify({ ok: true }), { status: 200 });

    await put('https://example.com', { key: 'value' });
});

test('post', async () => {
    fetch.mockResponseOnce(JSON.stringify({ ok: true }), { status: 200 });
    
    await post('https://example.com', { key: 'value' });
});

test('delete', async () => {
    fetch.mockResponseOnce(JSON.stringify({ ok: true }));
    
    await del('https://example.com');
});

test('getJsonOrThrow throws 401', async () => {
    const mockResponse = { message: 'Not Found' };
    fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 401 });

    await getJsonOrThrow('https://example.com').catch((error) => {
        
    });
});

test('getJsonOrThrow throws 403', async () => {
    const mockResponse2 = { message: 'Not Found' };
    fetch.mockResponseOnce(JSON.stringify(mockResponse2), { status: 403 });

    await getJsonOrThrow('https://example.com').catch((error) => {
        
    });
});