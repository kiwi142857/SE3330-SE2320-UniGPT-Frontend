import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../../src/page/ProfilePage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { getMe, getUser, getUserCreatedBots, getUserFavoriteBots } from '../../src/service/user';

jest.mock('../../src/service/user', () => ({
    getUser: jest.fn(),
    getMe: jest.fn(),
    getUserCreatedBots: jest.fn(),
    getUserFavoriteBots: jest.fn(),
}));

jest.mock('react-router-dom'), () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn()
})

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

afterEach(() => {
    jest.clearAllMocks();
});  

const bots = [];
for (let i = 0; i < 20; i++) {
    bots.push({ id: i, name: `Bot ${i}`, description: `Description ${i}`, avatar: `Avatar ${i}` });
}

const user = { id: 1, name: 'User 1', description: 'Description 1', avatar: 'Avatar 1', asAdmin: false };
const me1 = { id: 1, name: 'User 1', description: 'Description 1', avatar: 'Avatar 1', asAdmin: false };
const me2 = { id: 2, name: 'User 2', description: 'Description 2', avatar: 'Avatar 2', asAdmin: false };

describe('ProfilePage display (has id and not me)', () => {

    beforeEach(async () => { 
        require('react-router-dom').useParams.mockImplementation(() => ({id: "1"}));
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me2);
        
        await act(async () => {
            render (
                <Router>
                    <LanguageContext.Provider value={mockLanguageContext}>
                    <ProfilePage />
                    </LanguageContext.Provider>
                </Router>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });

    it('ProfilePage bot favorite', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Favorite'));
        });

        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });
});

describe('ProfilePage display (has id and is me)', () => {

    beforeEach(async () => {
        require('react-router-dom').useParams.mockImplementation(() => ({ id: "1" })); 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me1);
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <ProfilePage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });
});

describe('ProfilePage display (no id)', () => {

    beforeEach(async () => {
        require('react-router-dom').useParams.mockImplementation(() => ({})); 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me1);
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <ProfilePage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });
});


describe('ProfilePage error handle (has id)', () => {

    beforeEach(async () => {
        require('react-router-dom').useParams.mockImplementation(() => ({ id: "1" })); 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockRejectedValue(new Error('error'));
        getMe.mockRejectedValue(new Error('error'));
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <ProfilePage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

describe('ProfilePage error handle (no id)', () => {

    beforeEach(async () => {
        require('react-router-dom').useParams.mockImplementation(() => ({})); 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockRejectedValue(new Error('error'));
        getMe.mockRejectedValue(new Error('error'));
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <ProfilePage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

describe('ProfilePage error handle (get bot error)', () => {

    beforeEach(async () => {
        require('react-router-dom').useParams.mockImplementation(() => ({})); 
        getUserCreatedBots.mockRejectedValue(new Error('error'));
        getUserFavoriteBots.mockRejectedValue(new Error('error'));
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me1);
        await act(async () => {
            render (
              <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                  <ProfilePage />
                </LanguageContext.Provider>
              </Router>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });

    it('ProfilePage bot favorite', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Favorite'));
        });

        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

// describe('ProfilePage error handling', () => {

//     beforeEach(async () => {
//         getSearchUserList.mockRejectedValue(new Error('error'))
//         await act(async () => {
//             render (
//               <Router>
//                 <LanguageContext.Provider value={mockLanguageContext}>
//                     <ProfilePage />
//                 </LanguageContext.Provider>
//               </Router>
//             );
//         });
//     });

//     it('userlist name', async () => {
//         await waitFor(() => {
//             expect(screen.queryByText('User 1')).not.toBeInTheDocument();
//         });
//     });
// });