import { auth } from '../../shared/auth.js';
import { router } from '../../shared/router.js';
import { toast } from '../../shared/toast.js';

export function renderSetup() {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div style="max-width: 400px; width: 100%;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-family: var(--serif); font-size: 42px; color: var(--gold); margin-bottom: 8px;">Welcome</h1>
          <p style="color: var(--muted); font-size: 13px;">Set up your 4-digit PIN to secure your masterplan</p>
        </div>
        
        <form id="setup-form" style="background: var(--card); border: 1px solid var(--border); border-radius: 4px; padding: 32px;">
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;">Create PIN</label>
            <input 
              type="password" 
              id="pin" 
              class="input" 
              placeholder="Enter 4-digit PIN" 
              maxlength="4" 
              pattern="[0-9]{4}"
              required
              autocomplete="off"
            />
          </div>
          
          <div style="margin-bottom: 24px;">
            <label style="display: block; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;">Confirm PIN</label>
            <input 
              type="password" 
              id="confirm-pin" 
              class="input" 
              placeholder="Re-enter PIN" 
              maxlength="4" 
              pattern="[0-9]{4}"
              required
              autocomplete="off"
            />
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Create Account
          </button>
        </form>
      </div>
    </div>
  `;
}

document.addEventListener('submit', async (e) => {
  if (e.target.id === 'setup-form') {
    e.preventDefault();
    
    const pin = document.getElementById('pin').value;
    const confirmPin = document.getElementById('confirm-pin').value;
    
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      toast.error('PIN must be exactly 4 digits');
      return;
    }
    
    if (pin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }
    
    try {
      await auth.setupPin(pin);
      toast.success('Account created successfully!');
      router.navigate('/');
    } catch (error) {
      toast.error(error.message || 'Setup failed');
    }
  }
});
