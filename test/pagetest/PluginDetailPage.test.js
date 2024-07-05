import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PluginDetailPage from '../../src/page/PluginDetailPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { getPluginDetail } from '../../src/service/PluginDetail';

jest.mock('../../src/service/PluginDetail', () => ({
    getPluginDetail: jest.fn(),
}));

jest.mock('react-router-dom'), () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn()
})

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

const generatePlugin = (asCreator, asAdmin) => {
    const plugin = {
        id: '1',
        name: 'Plugin 1',
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
    };
    return plugin;
}

const user1 = { id: 1, name: 'User 1', description: 'Description 1', avatar: 'Avatar 1', asAdmin: true};

const Content = () => {
    return (
        <Routes>
            <Route path="/plugindetail/:id" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <PluginDetailPage />
                </LanguageContext.Provider>
            }/>
            <Route path="/plugindetail/" element={
                <LanguageContext.Provider value={mockLanguageContext}>
                    <PluginDetailPage />
                </LanguageContext.Provider>
            }/>
        </Routes>
    );
}

describe('PluginDetailPage display (has id)', () => {

    beforeEach(async () => { 
        const plugin = generatePlugin(true, false);
        getPluginDetail.mockResolvedValue(plugin);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/plugindetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('PluginDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Plugin 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            // expect(screen.getByText('Edit')).toBeInTheDocument();
            // 目前没有编辑插件功能，有编辑功能之后再解开注释
        });
    });
});


describe('PluginDetailPage display (not creator or admin)', () => {

    beforeEach(async () => { 
        const plugin = generatePlugin(false, false);
        getPluginDetail.mockResolvedValue(plugin);

        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/plugindetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('PluginDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Plugin 1')).toBeInTheDocument();
            expect(screen.getByText('Description 1')).toBeInTheDocument();
            expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        });
    });
});

describe('PluginDetailPage get plugin error', () => {

    beforeEach(async () => { 
        getPluginDetail.mockRejectedValue(new Error('error'));
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/plugindetail/1`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('PluginDetailPage display', async () => {
        // await act(async () => {
        //     fireEvent.click(screen.getByText('Confirm'));
        // });

        await waitFor(() => {
            expect(screen.queryByText('Plugin 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
        });
    });
});

describe('PluginDetailPage id undefined', () => {

    beforeEach(async () => { 
        const plugin = generatePlugin(true, false);
        getPluginDetail.mockResolvedValue(plugin);
        
        await act(async () => {
            render (
                <MemoryRouter initialEntries={[`/plugindetail`]}>
                    <Content/>
                </MemoryRouter>
            );
        });
    });

    it('PluginDetailPage display', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Bot 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
        });
    });
});