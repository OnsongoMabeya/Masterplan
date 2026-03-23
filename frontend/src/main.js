import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './features/metrics/metrics.css';
import './features/quarterly/quarterly.css';
import { router } from './shared/router.js';
import { auth } from './shared/auth.js';
import { renderApp } from './app.js';
import { initInstallPrompt } from './pwa/install.js';

async function init() {
  initInstallPrompt();
  const app = document.getElementById('app');
  
  router.register('/setup', async () => {
    const { renderSetup } = await import('./features/auth/setup.js');
    app.innerHTML = renderSetup();
  });

  router.register('/login', async () => {
    const { renderLogin } = await import('./features/auth/login.js');
    app.innerHTML = renderLogin();
  });

  router.register('/', async () => {
    if (!auth.isAuthenticated()) {
      router.navigate('/login');
      return;
    }
    app.innerHTML = await renderApp();
  });

  router.register('/404', () => {
    app.innerHTML = '<div style="padding: 40px; text-align: center;"><h1>404 - Not Found</h1></div>';
  });

  router.init();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}

init();
