import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Navigator from '../../src/components/Navigator';
import { getMe } from '../../src/service/user';

jest.mock('../../src/service/user', () => ({
    getMe: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: jest.fn()
}));

describe('Navigator', () => {
  it('getMe fails', async () => {
    getMe.mockRejectedValue(new Error('Unauthorized'));
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);

    render(
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    );

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/login'));
  });

  it('regular display', async () => {
    getMe.mockResolvedValue({ avatar: '/assets/user-default.png', asAdmin: false });
    localStorage.setItem('language', 'de');

    render(
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByAltText('/assets/user-default.png')).toBeInTheDocument();
    });

    await act(async () => {
        fireEvent.click(screen.getByText('中'));
        fireEvent.click(screen.getByText('EN'));
    });

    await act(async () => {
        const button = screen.getByTestId("list-button");
        fireEvent.mouseEnter(button);
    });

    await act(async () => {
        fireEvent.click(screen.getByText('Market'));
    });
  });

  it('no user info', async () => {
    getMe.mockResolvedValue({});

    render(
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    );
  });

  it('navigates to profile page', async () => {
    getMe.mockResolvedValue({ avatar: '/assets/user-default.png', asAdmin: false });
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);

    render(
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    );

    const avatarButton = await screen.findByAltText('/assets/user-default.png');
    fireEvent.click(avatarButton);
  });

  it('in login', async () => {
    Object.defineProperty(window, 'location', {
        value: {
          pathname: '/login',
        },
        writable: true,
    });
    
    getMe.mockResolvedValue({ avatar: '/assets/user-default.png', asAdmin: true });

    render(
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    );
  });
});