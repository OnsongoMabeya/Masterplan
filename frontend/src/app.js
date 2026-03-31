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
  if (!container) {
    console.error('tab-container not found');
    return;
  }
  
  try {
    const module = await import(`./features/${tabName}/${tabName}.js`);
    
    let content;
    if (tabName === 'metrics' || tabName === 'quarterly') {
      content = await module.render();
    } else {
      content = module.render(allTasks, allProgress);
    }
    
    container.innerHTML = content;
    
    if (module.init) {
      module.init();
    }
    
    updateGlobalProgress();
    window.scrollTo(0, 0);
  } catch (error) {
    console.error(`Failed to load ${tabName}:`, error);
    container.innerHTML = `<div class="tab-content active"><p>Failed to load ${tabName} tab.</p></div>`;
  }
};

// Programmatic tab switching by finding button with matching text
window.switchTabById = (id) => {
  const btn = [...document.querySelectorAll('.tab-btn')].find(b => 
    b.textContent.toLowerCase().includes(id)
  );
  window.switchTab(id, btn);
};

// Phase toggle - expand/collapse phase with chevron rotation
window.ph = (headerElement) => {
  headerElement.classList.toggle('open');
  const body = headerElement.nextElementSibling;
  body.classList.toggle('open');
  const chevron = headerElement.querySelector('.phase-chev');
  if (chevron) {
    chevron.textContent = body.classList.contains('open') ? '▲' : '▼';
  }
};

// Task toggle - mark done/undone and update counts
window.ts = async (stepElement, section) => {
  stepElement.classList.toggle('done');
  updateCounts();
  
  // If task has a task_key data attribute, sync to backend
  const taskKey = stepElement.dataset.taskKey;
  if (taskKey) {
    try {
      await tasksAPI.toggle(taskKey);
      // Reload tasks and progress
      const [tasksResponse, progressResponse] = await Promise.all([
        tasksAPI.getAll(),
        progressAPI.getAll()
      ]);
      allTasks = tasksResponse.data || [];
      allProgress = progressResponse.data || [];
      updateGlobalProgress();
    } catch (error) {
      console.error('Failed to sync task:', error);
      // Revert toggle on error
      stepElement.classList.toggle('done');
      updateCounts();
    }
  }
};

// Update all counts - per-phase, per-section, global progress
window.updateCounts = () => {
  const sections = ['career', 'health', 'finance', 'family', 'faith', 'music', 'community', 'habits', 'risk', 'relationships'];
  
  // Per-section counts in phase headers
  sections.forEach(sec => {
    const counters = document.querySelectorAll(`[data-sec="${sec}"]`);
    counters.forEach(cntEl => {
      const phase = cntEl.closest('.phase');
      if (!phase) return;
      const allSteps = phase.querySelectorAll('.step').length;
      const doneSteps = phase.querySelectorAll('.step.done').length;
      cntEl.textContent = `${doneSteps}/${allSteps}`;
    });
  });

  // Global progress
  let totalTasks = 0;
  let doneTasks = 0;
  document.querySelectorAll('.step').forEach(s => {
    totalTasks++;
    if (s.classList.contains('done')) doneTasks++;
  });

  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const fill = document.getElementById('g-fill');
  const label = document.getElementById('g-label');
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}% complete (${doneTasks}/${totalTasks})`;

  // Domain progress texts
  ['career', 'health', 'finance', 'family', 'faith', 'music', 'community', 'habits', 'relationships'].forEach(sec => {
    const tabEl = document.getElementById(`tab-${sec}`);
    if (!tabEl) return;
    const allSteps = tabEl.querySelectorAll('.step').length;
    const doneSteps = tabEl.querySelectorAll('.step.done').length;
    const el = document.getElementById(`${sec}-prog-text`);
    if (el) el.textContent = `${doneSteps} / ${allSteps} tasks completed`;
  });
};

// Search within a tab - dims non-matching tasks, expands parent phases
window.doSearch = (tab, query) => {
  const q = query.toLowerCase().trim();
  const tabEl = document.getElementById(`tab-${tab}`);
  if (!tabEl) return;
  
  const steps = tabEl.querySelectorAll('.step');
  const phases = tabEl.querySelectorAll('.phase');
  
  if (!q) {
    // Clear search - show all
    steps.forEach(s => {
      s.style.display = '';
      s.style.opacity = '';
    });
    phases.forEach(p => p.style.display = '');
    return;
  }
  
  // Dim non-matching tasks (don't hide them)
  steps.forEach(s => {
    const matches = s.textContent.toLowerCase().includes(q);
    s.style.opacity = matches ? '' : '0.3';
  });
  
  // Show/hide phases based on whether they have visible matches
  phases.forEach(p => {
    const hasVisibleSteps = [...p.querySelectorAll('.step')].some(s => 
      s.style.opacity !== '0.3'
    );
    p.style.display = hasVisibleSteps ? '' : 'none';
    
    // Expand phases with matches
    if (hasVisibleSteps) {
      const phaseBody = p.querySelector('.phase-body');
      const phaseHdr = p.querySelector('.phase-hdr');
      if (phaseBody && phaseHdr) {
        phaseBody.classList.add('open');
        phaseHdr.classList.add('open');
        const chevron = phaseHdr.querySelector('.phase-chev');
        if (chevron) chevron.textContent = '▲';
      }
    }
  });
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
