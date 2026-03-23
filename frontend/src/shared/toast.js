let toastTimeout;

export function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) {
    existing.remove();
  }

  const toastEl = document.createElement('div');
  toastEl.className = `toast ${type}`;
  toastEl.textContent = message;
  document.body.appendChild(toastEl);

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toastEl.remove();
  }, 3000);
}

export const toast = {
  show(message, type = 'info') {
    showToast(message, type);
  },

  success(message) {
    showToast(message, 'success');
  },

  error(message) {
    showToast(message, 'error');
  },

  info(message) {
    showToast(message, 'info');
  }
};
