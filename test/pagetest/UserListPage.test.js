import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import UserListPage from '../../src/page/UserListPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { getSearchUserList } from '../../src/service/user';

jest.mock('../../src/service/user', () => ({
    getSearchUserList: jest.fn(),
}));

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

const users = [];
for (let i = 0; i < 20; i++) {
    users.push({ id: i, name: `User ${i}`, description: `Description ${i}`, avatar: `Avatar ${i}` });
}

describe('UserListPage display', () => {

    beforeEach(async () => {
        getSearchUserList.mockResolvedValue({ total : 20, users: users})
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <UserListPage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('userList name', async () => {
        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
        });
    });

    it('userList search', async () => {
        await act(async () => {
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'User 1' } });
        });

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
        });
    });

    it('userList pagination', async () => {
        await act(async () => {
            const pageButton = screen.getByLabelText('page 1');
            userEvent.click(pageButton);
        });

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
        });
    });

    it('userList id', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('ID'));
        });

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
        });
    });
});

describe('userList display: page exactly', () => {

    beforeEach(async () => {
        getSearchUserList.mockResolvedValue({ total : 15, users: users})
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <UserListPage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('userlist name', async () => {
        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
        });
    });
});

describe('userlist error handling', () => {

    beforeEach(async () => {
        getSearchUserList.mockRejectedValue(new Error('error'))
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                    <UserListPage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('userlist name', async () => {
        await waitFor(() => {
            expect(screen.queryByText('User 1')).not.toBeInTheDocument();
        });
    });
});