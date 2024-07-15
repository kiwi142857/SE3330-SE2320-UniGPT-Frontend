import { createHistory, deleteHistory, getBotBrief, getBotChatHistoryList, getBotChatList, getEmptyPromptList, getPromptList } from '../../src/service/BotChat';
import { del, DUMMY_RESPONSE, getJsonOrThrow, post } from '../../src/service/common';

jest.mock('../../src/service/common', () => ({
  post: jest.fn(), 
  del: jest.fn(),
  getJsonOrThrow: jest.fn(),
}));

describe('getBotBrief', () => {
    it('botID is undefined', async () => {
      const result = await getBotBrief(undefined);
      expect(result).toBeNull();
    });

    it('right', async () => {
      const mockBotBriefInfo = { name: 'testBot', description: 'testDescription' };
      getJsonOrThrow.mockResolvedValue(mockBotBriefInfo);

      const result = await getBotBrief('123');
      expect(result).toEqual(mockBotBriefInfo);
    });
});

describe('getBotChatHistoryList', () => {
    it('right', async () => {
      const mockBotChatHistoryList = { chatHistoryList: [] };
      getJsonOrThrow.mockResolvedValue(mockBotChatHistoryList);

      const result = await getBotChatHistoryList('123',1,5);
      expect(result).toEqual(mockBotChatHistoryList);
    });
});

describe('getEmptyPromptList', () => {
  it('botID is undefined', async () => {
    const result = await getEmptyPromptList(undefined);
    expect(result).toEqual([]);
  });

  it('throw error', async () => {
    getJsonOrThrow.mockRejectedValue(new Error('Failed to get empty prompt list'));

    const result = await getEmptyPromptList('123');
    expect(result).toEqual([]);
  });

  it('right', async () => {
    const mockEmptyPromptList = {promptKeys: ["testPromptKey1", "testPromptKey2"]};
    getJsonOrThrow.mockResolvedValue(mockEmptyPromptList);

    const result = await getEmptyPromptList('123');
    expect(result).toEqual([{"promptKey": "testPromptKey1", "promptValue": ""}, {"promptKey": "testPromptKey2", "promptValue": ""}])
  });
});

describe('getPromptList', () => {
  it('right', async () => {
    const mockPromptList = {promptKeys: ["testPromptKey1", "testPromptKey2"]};
    getJsonOrThrow.mockResolvedValue(mockPromptList);

    const result = await getPromptList(123);
    expect(result).toEqual(mockPromptList);
  });

  it('throw error', async () => {
    getJsonOrThrow.mockRejectedValue(new Error('Failed to get prompt list'));

    const result = await getPromptList(123);
    expect(result).toEqual([]);
  });
});

describe('getBotChatList', () => {
  it('right', async () => {
    const mockBotChatList = {chatList: ["testChat1", "testChat2"]};
    getJsonOrThrow.mockResolvedValue(mockBotChatList);

    await getBotChatList(123);
  });

  it('throw error', async () => {
    getJsonOrThrow.mockRejectedValue(new Error('Failed to get bot chat list'));

    const result = await getBotChatList(123);
    expect(result).toEqual([]);
  });
});

describe('createHistory', () => {
  it('right', async () => {
    const mockResponseData = { success: true };
    post.mockResolvedValue(mockResponseData);

    const result = await createHistory(1,"testChat");
    expect(result).toEqual(mockResponseData);
  });

  it('error', async () => {
    post.mockRejectedValue(new Error());

    const result = await createHistory(1,"testChat");
    expect(result).toEqual(DUMMY_RESPONSE);
  });
});

describe('deleteHistory', () => {
  it('right', async () => {
    const mockResponseData = { success: true };
    del.mockResolvedValue(mockResponseData);

    const result = await deleteHistory(1);
    expect(result).toEqual(mockResponseData);
  });

  it('error', async () => {
    del.mockRejectedValue(new Error());

    const result = await deleteHistory(1);
    expect(result).toEqual(DUMMY_RESPONSE);
  });
});