let deferredPrompt;

export function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    hideInstallBanner();
    deferredPrompt = null;
  });
}

function showInstallBanner() {
  const banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-width: 90%;
  `;

  banner.innerHTML = `
    <div style="flex: 1;">
      <div style="font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 4px;">Install Masterplan</div>
      <div style="font-size: 11px; color: var(--muted);">Add to home screen for offline access</div>
    </div>
    <button id="install-btn" class="btn btn-primary" style="white-space: nowrap;">Install</button>
    <button id="dismiss-btn" class="btn" style="white-space: nowrap;">Not Now</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Install prompt outcome: ${outcome}`);
      deferredPrompt = null;
      hideInstallBanner();
    }
  });

  document.getElementById('dismiss-btn').addEventListener('click', () => {
    hideInstallBanner();
  });
}

function hideInstallBanner() {
  const banner = document.getElementById('install-banner');
  if (banner) {
    banner.remove();
  }
}
