import { auth } from './auth.js';

const routes = {};
let currentRoute = null;

export const router = {
  register(path, handler) {
    routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = `#${path}`;
  },

  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/').filter(Boolean);
    const route = `/${path || ''}`;

    if (route !== '/login' && route !== '/setup' && !auth.isAuthenticated()) {
      const status = await auth.checkStatus();
      if (status.needsSetup) {
        this.navigate('/setup');
      } else {
        this.navigate('/login');
      }
      return;
    }

    const handler = routes[route] || routes['/404'];
    if (handler) {
      currentRoute = route;
      await handler(params);
    }
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  getCurrentRoute() {
    return currentRoute;
  }
};
