import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import MarketPage from '../../src/page/MarketPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { getSearchBotList, getSearchPluginList } from '../../src/service/market';

jest.mock('../../src/service/market', () => ({
    getSearchBotList: jest.fn(),
    getSearchPluginList: jest.fn(),
}));

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

const bots = [];
for (let i = 0; i < 20; i++) {
  bots.push({ id: i, name: `Bot ${i}`, description: `Description ${i}`, avatar: `Avatar ${i}` });
}

const plugins = [];
for (let i = 0; i < 20; i++) {
  plugins.push({ id: i, name: `Plugin ${i}`, description: `Description ${i}`, avatar: `Avatar ${i}` });
}

describe('MarketPage display', () => {

    beforeEach(async () => {
        getSearchBotList.mockResolvedValue({ total : 20, bots: bots})
        getSearchPluginList.mockResolvedValue({ total : 20, plugins: plugins})
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <MarketPage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('bot market lattest', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot Market')).toBeInTheDocument();
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.queryByText('Plugin 1')).not.toBeInTheDocument();
        });
    });

    it('bot market search', async () => {
        await act(async () => {
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'Bot 1' } });
        });

        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });

    it('bot market pagination', async () => {
        await act(async () => {
            const pageButton = screen.getByLabelText('page 1');
            userEvent.click(pageButton);
        });

        await waitFor(() => {
            expect(screen.getByText('Bot 17')).toBeInTheDocument();
        });
    });

    it('plugin market lattest', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Plugin Market'));
        });

        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
            expect(screen.getByText('Plugin 1')).toBeInTheDocument();
        });
    });

    it('bot market like', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Latest'));
        });

        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.queryByText('Plugin 1')).not.toBeInTheDocument();
        });
    });
});

describe('MarketPage display: page exactly', () => {

    beforeEach(async () => {
        getSearchBotList.mockResolvedValue({ total : 15, bots: bots})
        getSearchPluginList.mockResolvedValue({ total : 15, plugins: plugins})
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <MarketPage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('bot market lattest', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot Market')).toBeInTheDocument();
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.queryByText('Plugin 1')).not.toBeInTheDocument();
        });
    });

    it('plugin market lattest', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Plugin Market'));
        });

        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
            expect(screen.getByText('Plugin 1')).toBeInTheDocument();
        });
    });
});

describe('MarketPage error handling', () => {

    beforeEach(async () => {
        getSearchBotList.mockRejectedValue(new Error('Error getting bot list'));
        getSearchPluginList.mockRejectedValue(new Error('Error getting plugin list'));
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <MarketPage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('bot market lattest', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });

    it('plugin market lattest', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Plugin Market'));
        });

        await waitFor(() => {
            expect(screen.queryByText('Plugin 1')).not.toBeInTheDocument();
        });
    });
});