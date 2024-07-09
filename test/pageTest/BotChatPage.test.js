import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BotChatPage from '../../src/page/BotChatPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { createHistory, deleteHistory, getBotBrief, getBotChatHistoryList, getBotChatList, getEmptyPromptList, getPromptList } from '../../src/service/BotChat';
import { getMe } from '../../src/service/user';

jest.mock('../../src/service/user', () => ({
    getMe: jest.fn(),
}));

jest.mock('../../src/service/BotChat', () => ({
    createHistory: jest.fn(),
    deleteHistory: jest.fn(),
    getBotBrief: jest.fn(),
    getBotChatHistoryList: jest.fn(),
    getBotChatList: jest.fn(),
    getEmptyPromptList: jest.fn(),
    getPromptList: jest.fn(),
}));

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

afterEach(() => {
    jest.clearAllMocks();
});  

const me = { id: 1, name: 'User 1', description: 'Description 1', avatar: 'Avatar 1' };
const bot = {id: 1, name: 'Bot 1', description: 'Description 1', avatar: 'Avatar 1', asCreator: true, asAdmin: false};
const historyList = {total: 2, histories:[{id : 1, title: 'Title 1', content: 'Content 1'}, {id : 2, title: 'Title 2', content: 'Content 2'}]};
const chatList = [{id: 1, historyId: 1, name: 'User 1', avatar: 'Avatar 1', content: 'Chat 1', type: false}, 
    {id: 2, historyId: 1, name: 'Bot 1', avatar: 'Avatar 2', content: 'Chat 2', type: true}];
const emptyPromptList = [{promptKey: 'Key 1', promptValue: ''}, {promptKey: 'Key 2', promptValue: ''}];
const promptList = [{promptKey: 'Key 1', promptValue: 'Value 1'}, {promptKey: 'Key 2', promptValue: 'Value 2'}];
const createHistoryResponse = {ok: true, historyId: 3, userAsk: 'Chat 1'};

const Content = () => {
    return(
        <Routes>
            <Route path="/botchat/:botID" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <BotChatPage />
                </LanguageContext.Provider>
            }/>
        </Routes>
    );
}

describe('ChatPage display', () => {
    beforeEach(async () => { 
        getMe.mockResolvedValue(me);
        getBotBrief.mockResolvedValue(bot);
        getBotChatHistoryList.mockResolvedValue(historyList);
        getBotChatList.mockResolvedValue(chatList);
        getEmptyPromptList.mockResolvedValue(emptyPromptList);
        getPromptList.mockResolvedValue(promptList);
        createHistory.mockResolvedValue(createHistoryResponse);
        deleteHistory.mockResolvedValue({ok: true});
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botchat/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ChatPage display init', async () => {
        await waitFor(() => {
            expect(screen.getByText('Edit')).toBeInTheDocument();
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Title 1')).toBeInTheDocument();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });
    });

    it('ChatPage fill table', async () => {
        await act(async () => {
            const tab = screen.getByTestId('create-table-button');
            fireEvent.click(tab);
        });

        await waitFor(() => {
            expect(screen.getByText('Prompt Table')).toBeInTheDocument();
            expect(screen.getByText('Key 1')).toBeInTheDocument();
            expect(screen.getByText('Key 2')).toBeInTheDocument();
        });

        await act(async () => {
            const submitButton = screen.getByText('Submit');
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
            const bot1Elements = screen.getAllByText('Chat 1');
            expect(bot1Elements).toHaveLength(2);
        });

        await act(async () => {
            const tab = screen.getByTestId('create-table-button');
            fireEvent.click(tab);
        });

        await waitFor(() => {
            expect(screen.getByText('Prompt Table')).toBeInTheDocument();
            expect(screen.getByText('Key 1')).toBeInTheDocument();
        });
    });
});