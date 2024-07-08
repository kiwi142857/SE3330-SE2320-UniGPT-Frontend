import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../../src/page/LoginPage';
import { login } from '../../src/service/auth';
import { getMe } from '../../src/service/user';

jest.mock('../../src/service/auth', () => ({
    login: jest.fn(),
}));

jest.mock('../../src/service/user', () => ({
    getMe: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}));

const loginRequestUrl = `http://jaccount.sjtu.edu.cn/oauth2/authorize?response_type=code&scope=profile&client_id=ov3SLrO4HyZSELxcHiqS&redirect_uri=${encodeURIComponent(window.location.origin)}/login`;
  
describe('LoginPage display', () => {

    beforeEach(() => {
        require('react-router-dom').useLocation.mockImplementation( () => ({
            search: '?code=1234'
        }));
        getMe.mockResolvedValue({ id: 'user1', name: 'Test User', avatar: 'test.jpg', asAdmin: false });
        login.mockResolvedValue({ ok: true });
        const navigateMock = jest.fn();
        require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);
    });

    it('Login page displays', async () => {
        await act(async () => {
            render(
              <Router>
                <LoginPage />
              </Router>
            );
        });

        const loginLinks = screen.getAllByRole('link');
        const targetLink = loginLinks.find(link => link.className === 'video-left-link');
        expect(targetLink).toHaveAttribute('href', expect.stringContaining(loginRequestUrl));
    });
});

describe('LoginPage navigate', () => {

    beforeEach(() => {
        require('react-router-dom').useLocation.mockImplementation( () => ({
            search: '?code=1234'
        }));
    });

    it('navigates to /home on successful login', async () => {
      login.mockResolvedValue({ ok: true });
      const navigateMock = jest.fn();
      require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);
  
      await act(async () => {
        render(
          <Router>
            <LoginPage />
          </Router>
        );
      });
  
      await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/home'));
    });
  
    it('failed login', async () => {
      const errorMessage = "登录失败: Invalid code";
      login.mockResolvedValue({ ok: false, message: errorMessage });
  
      await act(async () => {
        render(
          <Router>
            <LoginPage />
          </Router>
        );
      });
  
        const loginLinks = screen.getAllByRole('link');
        const targetLink = loginLinks.find(link => link.className === 'video-left-link');
        expect(targetLink).toHaveAttribute('href', expect.stringContaining(loginRequestUrl));
    });
});

describe('LoginPage code null', () => {

    beforeEach(() => {
        require('react-router-dom').useLocation.mockImplementation( () => ({
            search: '?code='
        }));
    });

    it('nothing happen', async () => {
        const navigateMock = jest.fn();
        require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);
  
        await act(async () => {
          render(
            <Router>
              <LoginPage />
            </Router>
          );
        });
  
        const loginLinks = screen.getAllByRole('link');
        const targetLink = loginLinks.find(link => link.className === 'video-left-link');
        expect(targetLink).toHaveAttribute('href', expect.stringContaining(loginRequestUrl));
    });
});