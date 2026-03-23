import { tasksAPI, progressAPI } from './shared/api.js';
import { auth } from './shared/auth.js';

let allTasks = [];
let allProgress = [];

export async function renderApp() {
  try {
    const [tasksResponse, progressResponse] = await Promise.all([
      tasksAPI.getAll(),
      progressAPI.getAll()
    ]);

    allTasks = tasksResponse.data || [];
    allProgress = progressResponse.data || [];

    return `
      <div class="app-header">
        <div>
          <div class="app-title">My 30-Year Life Masterplan</div>
          <div class="app-sub">2026 — 2056 · Nairobi, Kenya</div>
        </div>
        <div class="header-right">
          <div class="global-prog">
            <div class="prog-track"><div class="prog-fill" id="g-fill"></div></div>
            <div class="prog-label" id="g-label">0% complete</div>
          </div>
          <button class="btn" onclick="window.authLogout()">Logout</button>
        </div>
      </div>

      <div class="tab-bar">
        <button class="tab-btn active" onclick="window.switchTab('home', this)">Home</button>
        <button class="tab-btn" onclick="window.switchTab('metrics', this)">Metrics</button>
        <button class="tab-btn" onclick="window.switchTab('quarterly', this)">Quarterly</button>
        <button class="tab-btn" onclick="window.switchTab('identity', this)">Identity</button>
        <button class="tab-btn" onclick="window.switchTab('vision', this)">Vision</button>
        <button class="tab-btn" onclick="window.switchTab('career', this)">Career</button>
        <button class="tab-btn" onclick="window.switchTab('health', this)">Health</button>
        <button class="tab-btn" onclick="window.switchTab('finance', this)">Finance</button>
        <button class="tab-btn" onclick="window.switchTab('family', this)">Family</button>
        <button class="tab-btn" onclick="window.switchTab('faith', this)">Faith</button>
        <button class="tab-btn" onclick="window.switchTab('music', this)">Music</button>
        <button class="tab-btn" onclick="window.switchTab('community', this)">Community</button>
        <button class="tab-btn" onclick="window.switchTab('habits', this)">Habits</button>
        <button class="tab-btn" onclick="window.switchTab('risk', this)">Risk</button>
        <button class="tab-btn" onclick="window.switchTab('review', this)">Review</button>
        <button class="tab-btn" onclick="window.switchTab('relationships', this)">Relationships</button>
      </div>

      <div id="tab-container"></div>
    `;
  } catch (error) {
    console.error('Failed to load app:', error);
    return '<div style="padding: 40px; text-align: center;">Failed to load. Please refresh.</div>';
  }
}

window.authLogout = () => {
  auth.logout();
};

window.switchTab = async (tabName, btn) => {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const container = document.getElementById('tab-container');
  
  try {
    const module = await import(`./features/${tabName}/${tabName}.js`);
    container.innerHTML = module.render(allTasks, allProgress);
    
    if (module.init) {
      module.init();
    }
    
    updateGlobalProgress();
  } catch (error) {
    console.error(`Failed to load ${tabName}:`, error);
    container.innerHTML = `<div class="tab-content active"><p>Failed to load ${tabName} tab.</p></div>`;
  }
};

function updateGlobalProgress() {
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter(t => t.is_done).length;
  const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const fill = document.getElementById('g-fill');
  const label = document.getElementById('g-label');
  
  if (fill) fill.style.width = `${percentage}%`;
  if (label) label.textContent = `${percentage}% complete (${doneTasks}/${totalTasks})`;
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#/' || !window.location.hash) {
    window.switchTab('home');
  }
});
