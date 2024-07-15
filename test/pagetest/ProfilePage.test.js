import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from '../../src/page/ProfilePage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { logout } from '../../src/service/auth';
import { imageUpload } from '../../src/service/upload';
import { banUser, getMe, getUser, getUserCreatedBots, getUserFavoriteBots, isUserBanned, putUser } from '../../src/service/user';

jest.mock('../../src/service/user', () => ({
    getUser: jest.fn(),
    getMe: jest.fn(),
    getUserCreatedBots: jest.fn(),
    getUserFavoriteBots: jest.fn(),
    putUser: jest.fn(),
    isUserBanned: jest.fn(),
    banUser: jest.fn(),
}));

jest.mock('../../src/service/upload', () => ({
    imageUpload: jest.fn(),
}));

jest.mock('../../src/service/auth', () => ({
    logout: jest.fn(),
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

const user = { id: 1, name: 'User 1', description: 'Description 1', avatar: 'Avatar 1', account: 'Account 1', canvasUrl:"url 1", asAdmin: false };
const me1 = { id: 3, name: 'User 3', description: 'Description 3', avatar: 'Avatar 3', account: 'Account 3', canvasUrl:"url 3", asAdmin: false };
const me2 = { id: 2, name: 'User 2', description: 'Description 2', avatar: 'Avatar 2', account: 'Account 2', canvasUrl:"url 2", asAdmin: true };

const Content = () => {
    return(
        <Routes>
            <Route path="/profile/:id" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <ProfilePage />
                </LanguageContext.Provider>
            }/>
            <Route path="/profile/me" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <ProfilePage />
                </LanguageContext.Provider>
            }/>
        </Routes>
    );
}

describe('ProfilePage display (has id & not me & admin & ban)', () => {

    beforeEach(async () => { 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me2);
        isUserBanned.mockResolvedValue({ok: true, message: 'false'});
        banUser.mockResolvedValue({ok: true});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content />
                </MemoryRouter>
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

    it('ProfilePage ban', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Ban'));
        });
    });
});

describe('ProfilePage display (has id & not me & admin & unban)', () => {

    beforeEach(async () => { 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me2);
        isUserBanned.mockResolvedValue({ok: true, message: 'true'});
        banUser.mockResolvedValue({ok: true});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage unban', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Unban'));
        });
    });
});

describe('ProfilePage display (has id & not me & not admin)', () => {

    beforeEach(async () => { 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me1);
        isUserBanned.mockResolvedValue({ok: true, message: 'false'});
        banUser.mockResolvedValue({ok: true});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage ban', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Ban')).not.toBeInTheDocument();
        });
    });
});

describe('ProfilePage display (has id & is me)', () => {

    beforeEach(async () => {
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(user);
        putUser.mockResolvedValue({ok: true});
        isUserBanned.mockResolvedValue({ok: true, message: 'false'});
        imageUpload.mockResolvedValue({ok: true});
        logout.mockResolvedValue({ok: true});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });

    it('ProfilePage change info', async () => {
        const img = new File(['hello'], 'hello.png', { type: 'image/png' });

        await act (async () => {
            const upload = screen.getByTestId('avatar-input');
            fireEvent.change(upload, { target: { files: [img] } });
        });

        await act(async () => {
            fireEvent.click(screen.getByText('change'));
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Cancel'));
        });

        await act(async () => {
            fireEvent.click(screen.getByText('change'));
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'new name' } });
            fireEvent.change(textboxs[1], { target: { value: 'new description' } });
            fireEvent.change(textboxs[2], { target: { value: 'new url' } });
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Update'));
        });
    });

    it('ProfilePage logout', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Logout'));
        });
    });
});

describe('ProfilePage display (no id)', () => {

    beforeEach(async () => {
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me1);
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/me`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });
});


describe('ProfilePage get user error(has id)', () => {

    beforeEach(async () => {
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockRejectedValue(new Error('error'));
        getMe.mockRejectedValue(new Error('error'));
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

describe('ProfilePage get user error(no id)', () => {

    beforeEach(async () => {
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockRejectedValue(new Error('error'));
        getMe.mockRejectedValue(new Error('error'));
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/me`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage bot created', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

describe('ProfilePage get bot error', () => {

    beforeEach(async () => {
        getUserCreatedBots.mockRejectedValue(new Error('error'));
        getUserFavoriteBots.mockRejectedValue(new Error('error'));
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(user);
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/me`]}>
                    <Content />
                </MemoryRouter>
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

describe('ProfilePage put user error & logout error', () => {

    beforeEach(async () => {
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(user);
        putUser.mockResolvedValue({ok: false});
        isUserBanned.mockResolvedValue({ok: true, message: 'false'});
        imageUpload.mockResolvedValue({ok: true});
        logout.mockResolvedValue({ok: false});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage change info', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('change'));
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: '' } });
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Update'));
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'new name' } });
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Update'));
        });
    });

    it('ProfilePage logout', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Logout'));
        });
    });
});


describe('ProfilePage get ban error and ban error)', () => {

    beforeEach(async () => { 
        getUserCreatedBots.mockResolvedValue({ total : 20, bots: bots});
        getUserFavoriteBots.mockResolvedValue({ total : 20, bots: bots});
        getUser.mockResolvedValue(user);
        getMe.mockResolvedValue(me2);
        isUserBanned.mockRejectedValue(new Error('error'));
        banUser.mockResolvedValue({ok: false});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/profile/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ProfilePage ban', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Ban'));
        });
    });
});