import { DUMMY_RESPONSE, PREFIX } from '../../src/service/common';
import { imageUpload, knowFileUpload } from '../../src/service/upload';

global.fetch = jest.fn();
global.FormData = jest.fn(() => ({
  append: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('imageUpload', () => {
  it('successful upload', async () => {
    const mockResponse = { success: true };
    fetch.mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const file = new File([''], 'filename');
    const response = await imageUpload(file);

    expect(response).toEqual(mockResponse);
  });

  it('fetch error', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    const file = new File([''], 'filename');
    const response = await imageUpload(file);

    expect(response).toEqual(DUMMY_RESPONSE);
  });
});

describe('knowFileUpload', () => {
    it('successful upload', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
        });
    
        const file = new File([''], 'filename');
        const response = await knowFileUpload('2',file);
    
        expect(response).toEqual(mockResponse);
    });
    
    it('fetch error', async () => {
        fetch.mockRejectedValue(new Error('Network error'));
    
        const file = new File([''], 'filename');
        const response = await knowFileUpload('2',file);
    
        expect(response).toEqual(DUMMY_RESPONSE);
    });
});