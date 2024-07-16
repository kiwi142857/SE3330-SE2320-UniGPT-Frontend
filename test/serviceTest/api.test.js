import { apiToString, stringToApi } from '../../src/utils/api';

describe('apiToString', () => {
  it('converts api id 1 to its string representation', () => {
    expect(apiToString(1)).toBe('claude-instant-1.2');
  });

  it('converts api id 2 to its string representation', () => {
    expect(apiToString(2)).toBe('llama3-70b-8192');
  });

  it('converts api id 3 to its string representation', () => {
    expect(apiToString(3)).toBe('moonshot-v1-8k');
  });

  it('returns default string for unknown id', () => {
    expect(apiToString(999)).toBe('gpt-3.5-turbo');
  });
});

describe('stringToApi', () => {
  it('converts string "claude-instant-1.2" to its api id', () => {
    expect(stringToApi('claude-instant-1.2')).toBe(1);
  });

  it('converts string "llama3-70b-8192" to its api id', () => {
    expect(stringToApi('llama3-70b-8192')).toBe(2);
  });

  it('converts string "moonshot-v1-8k" to its api id', () => {
    expect(stringToApi('moonshot-v1-8k')).toBe(3);
  });

  it('returns 0 for unknown string', () => {
    expect(stringToApi('unknown-api')).toBe(0);
  });
});