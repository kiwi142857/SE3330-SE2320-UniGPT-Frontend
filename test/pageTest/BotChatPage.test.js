import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import WS from "jest-websocket-mock";
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

const server = new WS('wss://localhost:8080/chat');

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

const mockingSocket = async () => {
    await act(async () => {
        const mockMessage = { type: 'token', message: 'T' };
        server.send(JSON.stringify(mockMessage));
    });

    await act(async () => {
        const mockMessage = { type: 'complete', message: 'Test' };
        server.send(JSON.stringify(mockMessage));
    });
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

    it('ChatPage previous history', async () => {
        await act(async () => {
            const menus = screen.getAllByTestId('menu-icon');
            const menu = menus[0];
            fireEvent.click(menu);
        });

        await act(async () => {
            const deleteButton = screen.getByText('Delete');
            fireEvent.click(deleteButton);
        });

        await waitFor(() => {
            expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
        });

        await act(async () => {
            const history = screen.getByText('Title 2');
            fireEvent.click(history);
        });

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
        });
    });

    it('ChatPage chat', async () => {
        await act(async () => {
            const history = screen.getByText('Title 2');
            fireEvent.click(history);
        });

        await act(async () => {
            const input = screen.getByRole('textbox');
            fireEvent.change(input, {target: {value: 'Chat 3'}});
        });

        await act(async () => {
            const sendButton = screen.getByTestId('send-button');
            fireEvent.click(sendButton);
        });

        await waitFor(() => {
            expect(screen.getByText('Chat 3')).toBeInTheDocument();
        });

        await act(async () => {
            const mockMessage = { type: 'token', message: 'T' };
            server.send(JSON.stringify(mockMessage));
        });

        await waitFor(() => {
            const Ts = screen.getAllByText('T');
            expect(Ts).toHaveLength(2);
        });

        await act(async () => {
            const mockMessage = { type: 'complete', message: 'Test' };
            server.send(JSON.stringify(mockMessage));
        });

        await waitFor(() => {
            expect(screen.getByText('Test')).toBeInTheDocument();
        });
    });

    it('ChatPage button test', async () => {
        await act(async () => {
            const history = screen.getByText('Title 2');
            fireEvent.click(history);
        });

        await act(async () => {
            const editButton = screen.getByTestId('edit-button');
            fireEvent.click(editButton);
        });
        await act(async () => {
            const saveButton = screen.getByTestId('save-button');
            fireEvent.click(saveButton);
        });

        mockingSocket();

        await waitFor(() => {
            expect(screen.getByText('Test')).toBeInTheDocument();
        });

        await act(async () => {
            const replayButton = screen.getByTestId('replay-button');
            fireEvent.click(replayButton);
        });

        mockingSocket();

        await waitFor(() => {
            expect(screen.getByText('Test')).toBeInTheDocument();
        });
    });
});

describe('ChatPage get bot error handle', () => {
    beforeEach(async () => { 
        getMe.mockResolvedValue(me);
        getBotBrief.mockRejectedValue(new Error('error'));
        getBotChatHistoryList.mockResolvedValue(historyList);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botchat/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ChatPage get bot error handle', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

describe('ChatPage get history error handle', () => {
    beforeEach(async () => { 
        getMe.mockResolvedValue(me);
        getBotBrief.mockResolvedValue(bot);
        getBotChatHistoryList.mockRejectedValue(new Error('error'));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botchat/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ChatPage get history error handle', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
        });
    });
});

describe('ChatPage fetch user error handle', () => {
    beforeEach(async () => { 
        getMe.mockRejectedValue(new Error('error'));
        getBotBrief.mockResolvedValue(bot);
        getBotChatHistoryList.mockResolvedValue(historyList);
        getBotChatList.mockResolvedValue(chatList);
        getEmptyPromptList.mockResolvedValue(emptyPromptList);
        getPromptList.mockResolvedValue(promptList);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botchat/1`]}>
                    <Content />
                </MemoryRouter>
            );
        });
    });

    it('ChatPage fetch user error handle', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
        });
    });
});