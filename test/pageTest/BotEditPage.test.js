import { fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BotEditPage from '../../src/page/BotEditPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { createBot, getBotEditInfo, PromptChatType, updateBot } from '../../src/service/BotEdit';
import { getSearchPluginList } from '../../src/service/market';
import { imageUpload, knowFileUpload } from '../../src/service/upload';

jest.mock('../../src/service/upload', () => ({
    imageUpload: jest.fn(),
    knowFileUpload: jest.fn(),
}));

jest.mock('../../src/service/BotEdit', () => ({
    createBot: jest.fn(),
    updateBot: jest.fn(),
    getBotEditInfo: jest.fn(),
    PromptChatType: {
        SYSTEM: 2,
        USER: 0,
        ASSISTANT: 1,
    },
}));

jest.mock('../../src/service/market', () => ({
    getSearchPluginList: jest.fn(),
}));

jest.mock('react-router-dom'), () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn()
})

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

const generateBot = (hasPlugin) => {
    const bot = {
        name: 'Bot 1',
        avatar: '/assets/bot-default.png',
        description: 'Description 1',
        temperature: 0.5,
        baseModelAPI: 0,
        published: true,
        detail: 'Detail 1',
        photos: ['Photo 1', 'Photo 2'],
        prompted: true,
        promptChats: [{type: PromptChatType.SYSTEM, content: '你是一个机器人，你非常擅长数学'}, 
            {type: PromptChatType.USER, content: '1+1=?'}, {type: PromptChatType.ASSISTANT, content: '1+1=2'},
            {type: PromptChatType.USER, content: '++{userAsk}'}],
        promptKeys: ['userAsk'],
        plugins: hasPlugin? [  {id: 1, name: 'sqrt', description: 'get the sqrt root of a number',
                avatar: '/assets/bot-default.png', asCreator: true, asAdmin: true}] : []
    }
    return bot;
}

const plugins = [];
for (let i = 0; i < 20; i++) {
  plugins.push({ id: i, name: `Plugin ${i}`, description: `Description ${i}`, avatar: `Avatar ${i}` });
}

const inputPrompt = async () => {
    await act(async () => {
        const textboxs = screen.getAllByRole('textbox');
        fireEvent.change(textboxs[2], { target: { value: '你是一个机器人，你非常擅长数学' }});
        fireEvent.change(textboxs[3], { target: { value: '1+1=?' } });
        fireEvent.change(textboxs[4], { target: { value: '1+1=2' } });
        fireEvent.change(textboxs[5], { target: { value: '++{userAsk}' } });
    });
}

const uploadFile = async () => {
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });
        
    await act (async () => {
        const upload = screen.getByText('Upload Files');
        userEvent.upload(upload, file);
    });
}

const updateImage = async (testId) => {
    const img = new File(['hello'], 'hello.png', { type: 'image/png' });

    await act (async () => {
        const upload = screen.getByTestId(testId);
        fireEvent.change(upload, { target: { files: [img] } });
    });
}

const clickSubmit = async () => {
    await act(async () => {
        const submit = screen.getByText('Submit');
        fireEvent.click(submit);
    });
}

const Content = () => {
    return (
        <Routes>
            <Route path="/botedit/:id" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <BotEditPage edit={true}/>
                </LanguageContext.Provider>
            }/>
            <Route path="/botedit" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <BotEditPage edit={true}/>
                </LanguageContext.Provider>
            }/>
            <Route path="/botcreate" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <BotEditPage edit={false}/>
                </LanguageContext.Provider>
            }/>
        </Routes>
    );
}

describe('Bot Create display', () => {
    beforeEach(async () => { 
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        imageUpload.mockImplementation(() => Promise.resolve({ok: true}));
        knowFileUpload.mockImplementation(() => Promise.resolve({ok: true}));
        getSearchPluginList.mockResolvedValue({ total : 20, plugins: plugins})
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botcreate`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Create display', async () => {
        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'Bot 1' } });
            fireEvent.change(textboxs[1], { target: { value: 'Description 1' } });
        });

        await act(async () => {
            const slider = screen.getByRole('slider');
            fireEvent.change(slider, { target: { value: '0.4' } });
        });

        await act(async () => {
            fireEvent.click(screen.getByText("gpt-3.5-turbo"));
        });

        await updateImage('imageUpload');

        await clickSubmit();

        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            for (let i = 0; i < 3; i++) 
                fireEvent.click(checkboxs[0]);
            fireEvent.click(checkboxs[1]);
            fireEvent.click(checkboxs[1]);
            fireEvent.click(checkboxs[2]);
            fireEvent.click(checkboxs[2]);
        });

        await act (async () => {
            fireEvent.click(screen.getByTestId('add-few-shot-button'));
        });

        await act (async () => {
            const deleteButtons = screen.getAllByTestId('delete-few-shot-button');
            fireEvent.click(deleteButtons[0]);
        });

        await act (async () => {
            fireEvent.click(screen.getByTestId('add-few-shot-button'));
        });

        await act (async () => {
            const deleteButtons = screen.getAllByTestId('delete-few-shot-button');
            fireEvent.click(deleteButtons[1]);
        });

        await inputPrompt();

        await act (async () => {
            const editButtons = screen.getAllByTestId('edit-markdown-button');
            fireEvent.click(editButtons[0]);
        });

        await act (async () => {
            fireEvent.click(screen.getByText('Exit'));
        });

        await waitFor(() => {
            expect(screen.getByText('userAsk')).toBeInTheDocument();
        });

        await uploadFile();

        await act (async () => {
            const deleteButton = screen.getByTestId('delete-file-button');
            fireEvent.click(deleteButton);
        });

        await uploadFile();

        expect(screen.getByText('hello.pdf')).toBeInTheDocument();

        await clickSubmit();
    });
});

describe('Bot Edit display', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(true)));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        knowFileUpload.mockImplementation(() => Promise.resolve({ok: true}));
        getSearchPluginList.mockResolvedValue({ total : 20, plugins: plugins})
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Bot 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.getByText('userAsk')).toBeInTheDocument();
            expect(screen.getByText('sqrt')).toBeInTheDocument();
        });
    });

    it('Bot Edit Submit', async () => {
        await act(async () => {
            fireEvent.click(screen.getByText('add image'));
        });

        await updateImage('photoUpload');

        await act (async () => {
            const deleteButtons = screen.getAllByTestId('remove-photo');
            fireEvent.click(deleteButtons[0]);
        });

        await uploadFile();

        expect(screen.getByText('hello.pdf')).toBeInTheDocument();
        await clickSubmit();
    });

    it('Bot Edit Select Plugin', async () => {
        await act (async () => {
            fireEvent.click(screen.getByTestId('add-plugin-button'));
        });

        await act(async () => {
            const pageButton = screen.getByLabelText('page 1');
            userEvent.click(pageButton);
        });

        await act (async () => {
            fireEvent.click(screen.getByText('Hottest'));
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'sqrt' } });
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[1]);
            fireEvent.click(checkboxs[2]);
            fireEvent.click(screen.getByText('Confirm'));
        });
    });
});

describe('Bot Edit display (no id)', () => {
    beforeEach(async () => {
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(false)));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));

        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit Submit', async () => {
        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
        });

        await inputPrompt();
        await clickSubmit();
    });
});

describe('Bot Edit display (no plugin)', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(false)));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit display', async () => {
        await waitFor(() => {
            expect(screen.queryByText('sqrt')).not.toBeInTheDocument();
        });
    });
});

describe('Bot Edit get bot fail', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.reject(new Error('error')));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit display', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
        });
    });
});

describe('Bot Edit fail', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(true)));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: false}));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit Submit', async () => {
        await clickSubmit();
    });
});

describe('Bot Create fail', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(true)));
        createBot.mockImplementation(() => Promise.resolve({ok: false}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botcreate`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Create Submit', async () => {
        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'Bot 1' } });
            fireEvent.change(textboxs[1], { target: { value: 'Description 1' } });
        });

        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
        });

        await inputPrompt();
        await clickSubmit();
    });
});

describe('Bot Edit File Update fail', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(true)));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        knowFileUpload.mockImplementation(() => Promise.resolve({ok: false}));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit File update fail', async () => {
        await uploadFile();
        await clickSubmit();
    });
});

describe('Bot Create File update fail', () => {
    beforeEach(async () => { 
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        imageUpload.mockImplementation(() => Promise.resolve({ok: false}));
        knowFileUpload.mockImplementation(() => Promise.resolve({ok: false}));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botcreate`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Create File update fail', async () => {
        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'Bot 1' } });
            fireEvent.change(textboxs[1], { target: { value: 'Description 1' } });
        });

        await updateImage('imageUpload');

        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
        });

        await inputPrompt();

        await waitFor(() => {
            expect(screen.getByText('userAsk')).toBeInTheDocument();
        });
        await uploadFile();

        await clickSubmit();
    });
});

describe('Bot Edit get plugin list fail', () => {
    beforeEach(async () => { 
        getBotEditInfo.mockImplementation(() => Promise.resolve(generateBot(true)));
        createBot.mockImplementation(() => Promise.resolve({ok: true}));
        updateBot.mockImplementation(() => Promise.resolve({ok: true}));
        knowFileUpload.mockImplementation(() => Promise.resolve({ok: true}));
        getSearchPluginList.mockRejectedValue(new Error('error'));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/botedit/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('Bot Edit Select Plugin', async () => {
        await act (async () => {
            fireEvent.click(screen.getByTestId('add-plugin-button'));
        });
    });
});