import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../../src/page/HomePage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import * as userService from '../../src/service/user';

// Mock the user service and context
jest.mock('../../src/service/user', () => ({
  getMe: jest.fn(),
  getUerUsedBots: jest.fn(),
  getUserFavoriteBots: jest.fn(),
}));

const mockLanguageContext = {
  language: 'en',
  changeLanguage: jest.fn(),
};

const bots = [];
for (let i = 0; i < 10; i++) {
  bots.push({ id: i, name: `Bot ${i}`, description: `Description ${i}`, avatar: `Avatar ${i}` });
}

describe('HomePage', () => {
  beforeEach(() => {
    // Setup mock return values for user service calls
    userService.getMe.mockResolvedValue({ id: 'user1', name: 'Test User' });
    userService.getUerUsedBots.mockResolvedValue({ bots: bots });
    userService.getUserFavoriteBots.mockResolvedValue({ bots: bots });
  });

  it('HomePage displays bots information', async () => {
    await act(async () => {
      render (
        <Router>
          <LanguageContext.Provider value={mockLanguageContext}>
            <HomePage />
          </LanguageContext.Provider>
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Favorite')).toBeInTheDocument();
      expect(screen.getByText('Recently Used')).toBeInTheDocument();
      
      const bot1Elements = screen.getAllByText('Bot 1');
      expect(bot1Elements).toHaveLength(2);
      expect(bot1Elements[0]).toHaveClass('bot-card-name');
    });
  });

});

describe('HomePage getMe error handling', () => {
  beforeEach(() => {
    userService.getMe.mockRejectedValue(new Error('Error getting user info'));
    userService.getUerUsedBots.mockResolvedValue({ bots: bots });
    userService.getUserFavoriteBots.mockResolvedValue({ bots: bots });
  });

  it('homePage error handle', async () => {
    await act(async () => {
      render (
        <Router>
          <LanguageContext.Provider value={mockLanguageContext}>
            <HomePage />
          </LanguageContext.Provider>
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText('Favorite')).not.toBeInTheDocument();
    });
  });
});

describe('HomePage getUserBots error handling', () => {
  beforeEach(() => {
    userService.getMe.mockResolvedValue({ id: 'user1', name: 'Test User' });
    userService.getUerUsedBots.mockRejectedValue(new Error('Error getting user used bots'));
    userService.getUserFavoriteBots.mockRejectedValue(new Error('Error getting user favorite bots'));
  });

  it('homePage error handle', async () => {
    await act(async () => {
      render (
        <Router>
          <LanguageContext.Provider value={mockLanguageContext}>
            <HomePage />
          </LanguageContext.Provider>
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
    });
  });
});
