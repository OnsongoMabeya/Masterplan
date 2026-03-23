let toastTimeout;

export const toast = {
  show(message, type = 'info') {
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
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'error');
  },

  info(message) {
    this.show(message, 'info');
  }
};
