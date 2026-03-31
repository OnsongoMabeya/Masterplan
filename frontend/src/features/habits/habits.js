import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const habitsTasks = tasks.filter(t => t.domain === 'habits');
  
  const phases = {
    'Week 1': { title: 'Full Day Architecture — Built around your 1-hour matatu commute each way', badge: 'Non-Negotiable', badgeClass: 'c3 bg3', num: 'Week 1', open: true },
    'Now': { title: 'Fix 5 Sabotaging Habits — Delete apps, set boundaries, eat frogs', badge: 'Fix Now', badgeClass: 'c3 bg3', num: 'Now', open: false },
    'This Week': { title: 'Build Your Operating System — Notion + Weekly Review + Monthly Review', badge: 'This Week', badgeClass: 'c3 bg3', num: 'This Week', open: false }
  };

  const tasksByPhase = {};
  Object.keys(phases).forEach(phase => {
    tasksByPhase[phase] = habitsTasks.filter(t => t.phase === phase);
  });

  return `
    <div class="tab-content active" id="tab-habits">
      <div class="sec-eyebrow">Section 9 · Habits & Systems That Guarantee Success</div>
      <div class="sec-title">Fix the Engine Room.<br><em>Everything Else Follows.</em></div>
      <div class="sec-desc">5 sabotaging habits identified. No morning routine. Phone addiction. No tracking system. These are systems problems, not character flaws. Here are the systems.</div>

      ${Object.entries(phases).map(([phaseKey, phaseData]) => {
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
                <span class="phase-cnt" data-sec="habits">0/${phaseTasks.length}</span>
                <span class="phase-chev">${chevron}</span>
              </div>
            </div>
            <div class="phase-body ${phaseOpen}">
              ${phaseTasks.map(task => `
                <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'habits')" data-task-key="${task.task_key}">
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
      <div class="dom-prog-row"><span id="habits-prog-text">0 / ${habitsTasks.length} tasks</span><span class="c3">KPIs: morning routine streak · phone time · weekly reviews · monthly reviews · Notion OS</span></div>
    </div>
  `;
}

export function init() {
  console.log('Habits tab initialized');
  window.updateCounts();
}
