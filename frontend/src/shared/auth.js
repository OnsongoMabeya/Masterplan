import { authAPI } from './api.js';

export const auth = {
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  setToken(token) {
    localStorage.setItem('auth_token', token);
  },

  clearToken() {
    localStorage.removeItem('auth_token');
  },

  async checkStatus() {
    try {
      const response = await authAPI.checkStatus();
      return response.data;
    } catch (error) {
      console.error('Auth status check failed:', error);
      return { needsSetup: true, hasUser: false };
    }
  },

  async setupPin(pin) {
    const response = await authAPI.setupPin(pin);
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  },

  async login(pin) {
    const response = await authAPI.login(pin);
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  },

  async verify() {
    try {
      const response = await authAPI.verify();
      return response.success;
    } catch (error) {
      this.clearToken();
      return false;
    }
  },

  logout() {
    this.clearToken();
    window.location.hash = '#/login';
  }
};
