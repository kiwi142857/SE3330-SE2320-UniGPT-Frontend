import { fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import PluginEditPage from '../../src/page/PluginEditPage';
import { LanguageContext } from '../../src/provider/LanguageProvider';
import { createPlugin, testPlugin } from '../../src/service/PluginEdit';
import { imageUpload } from '../../src/service/upload';

jest.mock('../../src/service/upload', () => ({
    imageUpload: jest.fn(),
}));

jest.mock('../../src/service/PluginEdit', () => ({
    createPlugin: jest.fn(),
    testPlugin: jest.fn(),
}));

jest.mock('react-router-dom'), () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn()
})

jest.mock('react-monaco-editor', () => {
    return {
      __esModule: true,
      default: () => {
        return 'MockedMonacoEditor';
      },
      default: ({ onChange }) => (
        <textarea onChange={(e) => onChange(e.target.value)} data-testid="mock-editor" />
      ),
    };
});

const mockLanguageContext = {
    language: 'en',
    changeLanguage: jest.fn(),
};

const Content = () => {
    return (
            <Router>
                <LanguageContext.Provider value={mockLanguageContext}>
                    <PluginEditPage/>
                </LanguageContext.Provider>
            </Router>
    );
}

describe('Plugin Create display', () => {
    beforeEach(async () => { 
        createPlugin.mockImplementation(() => Promise.resolve({ok: true}));
        testPlugin.mockImplementation(() => Promise.resolve({ok: true}));
        imageUpload.mockImplementation(() => Promise.resolve({ok: true}));
        
        await act(async () => {
            render (
                <Content/>
            );
        });
    });

    it('Plugin Create display', async () => {
        await waitFor(() => {
            expect(screen.getByText('Parameter')).toBeInTheDocument();
            expect(screen.getByText('Start Test')).toBeInTheDocument();
            expect(screen.queryByText('Submit')).not.toBeInTheDocument();
        });
    });

    it('Plugin Create Submit', async () => {
        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
            fireEvent.click(checkboxs[1]);
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'Plugin 1' } });
            fireEvent.change(textboxs[1], { target: { value: 'Description 1' } });
            fireEvent.change(textboxs[2], { target: { value: 'Detail 1' }});
        });

        const img = new File(['hello'], 'hello.png', { type: 'image/png' });

        await act (async () => {
            const upload = screen.getByTestId('imageUpload');
            fireEvent.change(upload, { target: { files: [img] } });
        });

        await act(async () => {
            const addButton = screen.getByTestId('add-param-button');
            fireEvent.click(addButton);
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'www' } });
            fireEvent.change(textboxs[1], { target: { value: 'for test' } });
            fireEvent.click(screen.getByText("string"));
        });

        await act(async () => {
            const confirm = screen.getByText('Confirm');
            fireEvent.click(confirm);
        });

        await waitFor(async () => {
            const names = screen.getAllByText('www');
            expect(names).toHaveLength(2);
            expect(screen.getByText('for test')).toBeInTheDocument();
        });

        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[3], { target: { value: 'Value 2' }});
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('delete-param-button'));
        });

        await act(async () => {
            const addButton = screen.getByTestId('add-param-button');
            fireEvent.click(addButton);
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'www' } });
            fireEvent.change(textboxs[1], { target: { value: 'for test' } });
        });

        await act(async () => {
            const confirm = screen.getByText('Confirm');
            fireEvent.click(confirm);
        });

        await act(async () => {
            const test = screen.getByText('Start Test');
            fireEvent.click(test);
        });

        await act(async () => {
            const submit = screen.getByText('Submit');
            fireEvent.click(submit);
        });
    });
});


describe('Plugin Create test fail', () => {
    beforeEach(async () => { 
        createPlugin.mockImplementation(() => Promise.resolve({ok: true}));
        testPlugin.mockImplementation(() => Promise.resolve({ok: false}));
        
        await act(async () => {
            render (
                <Content/>
            );
        });
    });

    it('Plugin Create Submit Fail', async () => {
        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'Plugin 1' } });
            fireEvent.change(textboxs[1], { target: { value: 'Description 1' } });
        });

        await act(async () => {
            const test = screen.getByText('Start Test');
            fireEvent.click(test);
        });
    });
});

describe('Plugin Create fail', () => {
    beforeEach(async () => { 
        createPlugin.mockImplementation(() => Promise.resolve({ok: false}));
        testPlugin.mockImplementation(() => Promise.resolve({ok: true}));
        
        await act(async () => {
            render (
                <Content/>
            );
        });
    });

    it('Plugin Create Submit Fail', async () => {
        await act(async () => {
            const checkboxs = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxs[0]);
        });

        await act(async () => {
            const textboxs = screen.getAllByRole('textbox');
            fireEvent.change(textboxs[0], { target: { value: 'Plugin 1' } });
            fireEvent.change(textboxs[1], { target: { value: 'Description 1' } });
        });

        await act(async () => {
            const test = screen.getByText('Start Test');
            fireEvent.click(test);
        });

        await act(async () => {
            const submit = screen.getByText('Submit');
            fireEvent.click(submit);
        });
    });
});