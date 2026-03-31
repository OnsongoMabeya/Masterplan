import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const financeTasks = tasks.filter(t => t.domain === 'finance');
  
  const phases = {
    'M 1-3': { title: 'Emergency Fund + Debt Payoff — Months 1–3', badge: 'Start Now', badgeClass: 'c2 bg2', num: 'PHASE 1', open: true },
    'M 4-12': { title: 'Build Income Streams — Months 4–12', badge: 'Months 4–12', badgeClass: 'c2 bg2', num: 'PHASE 2', open: false },
    'Y 2-5': { title: 'Wealth Building — Years 2–5 · 7 Income Streams', badge: 'Years 2–5', badgeClass: 'c2 bg2', num: 'PHASE 3', open: false }
  };

  const tasksByPhase = {};
  Object.keys(phases).forEach(phase => {
    tasksByPhase[phase] = financeTasks.filter(t => t.phase === phase);
  });

  return `
    <div class="tab-content active" id="tab-finance">
      <div class="search-wrap">
        <input class="search-input" type="text" placeholder="Search finance tasks..." oninput="doSearch('finance',this.value)">
      </div>
      <div class="sec-eyebrow">Section 8 · Finances & Wealth</div>
      <div class="sec-title">7 Income Streams<br><em>by Year 5</em></div>
      <div class="sec-desc">From paycheck-to-paycheck to financially free by 45. Emergency fund. Debt freedom. Multiple income streams. Real estate. Investments. Legacy wealth.</div>

      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-num c2">KES 50k</div><div class="kpi-label">Emergency fund</div></div>
        <div class="kpi"><div class="kpi-num c2">7</div><div class="kpi-label">Income streams</div></div>
        <div class="kpi"><div class="kpi-num c2">0</div><div class="kpi-label">Debt target</div></div>
        <div class="kpi"><div class="kpi-num c2">45</div><div class="kpi-label">Financial freedom age</div></div>
      </div>

      ${Object.entries(phases).map(([phaseKey, phaseData], idx) => {
        const phaseTasks = tasksByPhase[phaseKey] || [];
        const phaseOpen = phaseData.open ? 'open' : '';
        const chevron = phaseData.open ? '▲' : '▼';
        
        return `
          <div class="phase">
            <div class="phase-hdr ${phaseOpen}" onclick="ph(this)">
              <div class="phase-hdr-left">
                <div class="phase-num">${phaseData.num}</div>
                <div class="phase-title">${phaseData.title}</div>
              </div>
              <div class="phase-hdr-right">
                <span class="badge ${phaseData.badgeClass}">${phaseData.badge}</span>
                <span class="phase-cnt" data-sec="finance">0/${phaseTasks.length}</span>
                <span class="phase-chev">${chevron}</span>
              </div>
            </div>
            <div class="phase-body ${phaseOpen}">
              ${phaseTasks.map(task => `
                <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'finance')" data-task-key="${task.task_key}">
                  <div class="step-cb">${task.is_done ? '✓' : ''}</div>
                  <div class="step-bd">
                    <div class="step-main">${task.title}</div>
                    ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                    ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}

      <div class="dom-prog-row">
        <span id="finance-prog-text">0 / ${financeTasks.length} tasks</span>
        <span class="c2">KPIs: emergency fund · debt cleared · income streams · net worth · giving</span>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Finance tab initialized');
  window.updateCounts();
}
