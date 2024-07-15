import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BotDetailPage from '../../src/page/BotDetailPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { disLikeBot, getBotComments, getBotDetail, likeBot, postCommentToBot, starBot, unStarBot } from '../../src/service/BotDetail';
import { getMe } from '../../src/service/user';

jest.mock('../../src/service/BotDetail', () => ({
    getBotDetail: jest.fn(),
    getBotComments: jest.fn(),
    postCommentToBot: jest.fn(),
    likeBot: jest.fn(),
    starBot: jest.fn(),
    disLikeBot: jest.fn(),
    unStarBot: jest.fn(),
}));

jest.mock('../../src/service/user', () => ({
    getMe: jest.fn(),
}));

jest.mock('react-router-dom'), () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn()
})

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

const generateBot = (asCreator, asAdmin) => {
    const bot = {
        id: '1',
        name: 'Bot 1',
        creator: 'User 1',
        creatorId: '1',
        description: 'Description 1',
        detail: 'Detail 1',
        avatar: 'Avatar 1',
        baseModelAPI: 1,
        photos: ['Photo 1', 'Photo 2'],
        likeNumber: 10,
        starNumber: 10,
        liked: true,
        starred: true,
        asCreator: asCreator,
        asAdmin: asAdmin,
        plugins: [ { id: 1, name: 'Plugin 1', description: 'Description 1', avatar: 'Avatar 1', }, ],
    };
    return bot;
}

const comments = {
    total: 2,
    comments: [
        { id: 1, content: 'Comment 1', time: new Date(), userId: 1, userName: 'User 1', avatar: 'Avatar 1', botID: 1, },
        { id: 2, content: 'Comment 2', time: new Date(), userId: 2, userName: 'User 2', avatar: 'Avatar 2', botID: 1, },
    ],
}

const user1 = { id: 1, name: 'User 1', description: 'Description 1', avatar: 'Avatar 1', asAdmin: true};

const Content = () => {
    return (
        <Routes>
            <Route path="/botdetail/:id" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <BotDetailPage />
                </LanguageContext.Provider>
            }/>
            <Route path="/botdetail/" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <BotDetailPage />
                </LanguageContext.Provider>
            }/>
        </Routes>
    );
}

describe('BotDetailPage display (has id)', () => {

    beforeEach(async () => { 
        const bot = generateBot(true, false);
        getBotDetail.mockResolvedValue(bot);
        getBotComments.mockResolvedValue(comments);
        postCommentToBot.mockResolvedValue({ id: 3, content: 'Good!' });
        getMe.mockResolvedValue(user1);
        starBot.mockResolvedValue({ ok: true });
        unStarBot.mockResolvedValue({ ok: true });
        likeBot.mockResolvedValue({ ok: true });
        disLikeBot.mockResolvedValue({ ok: true });
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botdetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('BotDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.getByText('Comment 1')).toBeInTheDocument();
            expect(screen.getByText('Edit')).toBeInTheDocument();
        });
    });

    it('BotDetailPage send message', async () => {
        await act(async () => {
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'Good!' } });
            const tab = screen.getByTestId('send-button');
            fireEvent.click(tab);
        });

        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.getByText('Good!')).toBeInTheDocument();
        });

        await act(async () => {
            const input = screen.getByRole('textbox');
            userEvent.type(input, 'Value 1{enter}');
        });
    });

    it('BotDetailPage like & star', async () => {
        await act(async () => {
            const dislike = screen.getByTestId('dislike');
            fireEvent.click(dislike);
        });

        await act(async () => {
            const unstar = screen.getByTestId('unstar');
            fireEvent.click(unstar);
        });

        await act(async () => {
            const like = screen.getByTestId('like');
            fireEvent.click(like);
        });

        await act(async () => {
            const star = screen.getByTestId('star');
            fireEvent.click(star);
        });

    });
});


describe('BotDetailPage display (not creator or admin)', () => {

    beforeEach(async () => { 
        const bot = generateBot(false, false);
        getBotDetail.mockResolvedValue(bot);
        getBotComments.mockResolvedValue(comments);
        postCommentToBot.mockResolvedValue({ id: 3, content: 'Good!' });
        getMe.mockResolvedValue(user1);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botdetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('BotDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.getByText('Comment 1')).toBeInTheDocument();
            expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        });
    });
});

describe('BotDetailPage get bot error', () => {

    beforeEach(async () => { 
        getBotDetail.mockRejectedValue(new Error('error'));
        getBotComments.mockResolvedValue(comments);
        getMe.mockResolvedValue(user1);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botdetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('BotDetailPage display', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('Confirm'));
        });

        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Comment 1')).not.toBeInTheDocument();
        });
    });
});

describe('BotDetailPage get comments error', () => {

    beforeEach(async () => { 
        getBotDetail.mockResolvedValue(generateBot(true, false));
        getBotComments.mockRejectedValue(new Error('error'));
        getMe.mockResolvedValue(user1);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botdetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('BotDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.queryByText('Comment 1')).not.toBeInTheDocument();
        });
    });
});

describe('BotDetailPage get user error', () => {

    beforeEach(async () => { 
        getBotDetail.mockResolvedValue(generateBot(true, false));
        getBotComments.mockResolvedValue(comments);
        getMe.mockRejectedValue(new Error('error'));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botdetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('BotDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.getByText('Comment 1')).toBeInTheDocument();
        });
    });
});


describe('BotDetailPage id undefined', () => {

    beforeEach(async () => { 
        getBotDetail.mockResolvedValue(generateBot(true, false));
        getBotComments.mockResolvedValue(comments);
        getMe.mockResolvedValue(user1);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botdetail`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('BotDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Comment 1')).not.toBeInTheDocument();
        });
    });
});