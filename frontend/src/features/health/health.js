import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const healthTasks = tasks.filter(t => t.domain === 'health');
  
  const phases = {
    'M 1-2': { title: 'Foundation — Months 1–2 · Medical baseline + Walking', badge: 'Start Now', badgeClass: 'c3 bg3', num: 'PHASE 1', open: true },
    'M 3-6': { title: 'Build Strength — Months 3–6 · Gym + C25K', badge: 'Months 3–6', badgeClass: 'c3 bg3', num: 'PHASE 2', open: false },
    'M 7-12': { title: 'Race Ready — Months 7–12 · Run your first race', badge: 'Months 7–12', badgeClass: 'c3 bg3', num: 'PHASE 3', open: false }
  };

  const tasksByPhase = {};
  Object.keys(phases).forEach(phase => {
    tasksByPhase[phase] = healthTasks.filter(t => t.phase === phase);
  });

  return `
    <div class="tab-content active" id="tab-health">
      <div class="search-wrap">
        <input class="search-input" type="text" placeholder="Search health tasks..." oninput="doSearch('health',this.value)">
      </div>
      <div class="sec-eyebrow">Section 8 · Health & Fitness</div>
      <div class="sec-title">−30kg + Run a Race<br><em>in 12 Months</em></div>
      <div class="sec-desc">From sedentary to marathon-ready. Medical checkup Week 1. Walking → Gym → C25K → 10K → Race day. Sleep repair. Nutrition overhaul. Sustainable systems.</div>

      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-num c3">−30kg</div><div class="kpi-label">12-month goal</div></div>
        <div class="kpi"><div class="kpi-num c3">10K</div><div class="kpi-label">Race distance</div></div>
        <div class="kpi"><div class="kpi-num c3">7.5hrs</div><div class="kpi-label">Sleep target</div></div>
        <div class="kpi"><div class="kpi-num c3">4x/week</div><div class="kpi-label">Exercise frequency</div></div>
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
                <span class="phase-cnt" data-sec="health">0/${phaseTasks.length}</span>
                <span class="phase-chev">${chevron}</span>
              </div>
            </div>
            <div class="phase-body ${phaseOpen}">
              ${phaseTasks.map(task => `
                <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'health')" data-task-key="${task.task_key}">
                  <div class="step-cb">${task.is_done ? '✓' : ''}</div>
                  <div class="step-bd">
                    <div class="step-main">${task.title}</div>
                    ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                    ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
                  </div>
                </div>
              `).join('')}
              
              ${idx === 2 ? '<div class="milestone bd3"><div class="milestone-lbl c3">✦ 12-Month Health Milestone</div><div class="milestone-text">−30kg achieved. 10K race completed. 4x/week exercise automatic. 7.5 hrs sleep consistent. Annual medical checkup scheduled. You are a different person.</div></div>' : ''}
            </div>
          </div>
        `;
      }).join('')}

      <div class="dom-prog-row">
        <span id="health-prog-text">0 / ${healthTasks.length} tasks</span>
        <span class="c3">KPIs: weight · race · sleep · exercise frequency · medical checkups</span>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Health tab initialized');
  window.updateCounts();
}
