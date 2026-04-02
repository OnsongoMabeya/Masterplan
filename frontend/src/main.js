import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './features/metrics/metrics.css';
import './features/quarterly/quarterly.css';
import { router } from './shared/router.js';
import { auth } from './shared/auth.js';
import { renderApp } from './app.js';
import { initInstallPrompt } from './pwa/install.js';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

// Offline detection and banner
function initOfflineDetection() {
  let offlineBanner = null;

  function showOfflineBanner() {
    if (offlineBanner) return;
    
    offlineBanner = document.createElement('div');
    offlineBanner.id = 'offline-banner';
    offlineBanner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f59e0b;
      color: white;
      padding: 12px 20px;
      text-align: center;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    offlineBanner.innerHTML = '📡 You are offline. Changes will sync when connection is restored.';
    document.body.prepend(offlineBanner);
  }

  function hideOfflineBanner() {
    if (offlineBanner) {
      offlineBanner.remove();
      offlineBanner = null;
    }
  }

  window.addEventListener('online', () => {
    hideOfflineBanner();
    console.log('Connection restored');
  });

  window.addEventListener('offline', () => {
    showOfflineBanner();
    console.log('Connection lost');
  });

  if (!navigator.onLine) {
    showOfflineBanner();
  }
}

async function init() {
  initInstallPrompt();
  initOfflineDetection();
  
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
}

init();
