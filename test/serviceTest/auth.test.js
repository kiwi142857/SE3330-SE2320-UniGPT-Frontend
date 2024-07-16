import { login, logout } from '../../src/service/auth';
import * as commonModule from '../../src/service/common';

jest.mock('../../src/service/common', () => ({
  post: jest.fn(), 
}));

  describe('login', () => {
    it('successful login', async () => {
      const mockResponseData = { success: true };
      commonModule.post.mockResolvedValue(mockResponseData);

      const result = await login('testCode');
      expect(result).toEqual(mockResponseData);
    });

    it('login failure', async () => {
      commonModule.post.mockRejectedValue(new Error('Failed to login'));

      const result = await login('testCode');
      expect(result).toEqual(commonModule.DUMMY_RESPONSE);
    });
});

describe('logout', () => {
    it('successful logout', async () => {
      const mockResponseData = { success: true };
      commonModule.post.mockResolvedValue(mockResponseData);

      const result = await logout();
      expect(result).toEqual(mockResponseData);
    });

    it('logout failure', async () => {
      commonModule.post.mockRejectedValue(new Error('Failed to logout'));

      const result = await logout();
      expect(result).toEqual(commonModule.DUMMY_RESPONSE);
    });
});