import { act, render } from '@testing-library/react';
import React from 'react';
import i18n from '../../src/i18n';
import { LanguageContext, LanguageProvider } from '../../src/provider/LanguageProvider';

// Mock i18n
jest.mock('../../src/i18n', () => ({
  language: 'en',
  on: jest.fn(),
  off: jest.fn(),
  changeLanguage: jest.fn(),
}));

// Helper component to consume the context
const ConsumerComponent = () => (
  <LanguageContext.Consumer>
    {({ language, changeLanguage }) => (
      <div>
        <span data-testid="language">{language}</span>
        <button onClick={() => changeLanguage('fr')}>Change Language</button>
      </div>
    )}
  </LanguageContext.Consumer>
);

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('sets initial language from localStorage if available', () => {
    localStorage.setItem('language', 'de');
    const { getByTestId } = render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(getByTestId('language').textContent).toBe('de');
  });

  it('sets initial language from i18n if localStorage is not set', () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(getByTestId('language').textContent).toBe('en');
  });

  it('changes language when changeLanguage is called', () => {
    const { getByText, getByTestId } = render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    act(() => {
      getByText('Change Language').click();
    });

    expect(i18n.changeLanguage).toHaveBeenCalledWith('fr');
  });

  it('updates language on i18n languageChanged event', () => {
    const mockOn = jest.fn((event, callback) => {
      if (event === 'languageChanged') {
        callback('fr');
      }
    });
    i18n.on = mockOn;
  
    const { getByTestId } = render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );
  
    expect(getByTestId('language').textContent).toBe('fr');
    expect(mockOn).toHaveBeenCalledWith('languageChanged', expect.any(Function));
  });
});