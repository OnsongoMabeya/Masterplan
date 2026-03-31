import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const riskTasks = tasks.filter(t => t.domain === 'risk');

  return `
    <div class="tab-content active" id="tab-risk">
      <div class="sec-eyebrow">Section 10 · Risk Management</div>
      <div class="sec-title">Protect What<br><em>You're Building</em></div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Actions</div>
            <div class="phase-title">Insurance, Emergency Fund, Will, Currency Hedge</div>
          </div>
          <div class="phase-hdr-right">
            <span class="badge c1 bg1">Essential</span>
            <span class="phase-cnt" data-sec="risk">0/${riskTasks.length}</span>
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          ${riskTasks.map(task => `
            <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'risk')" data-task-key="${task.task_key}">
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
      <div class="dom-prog-row"><span id="risk-prog-text">0 / ${riskTasks.length} tasks</span><span class="c1">KPIs: health insurance · emergency fund · will · USD hedge · T-Bills</span></div>
    </div>
  `;
}

export function init() {
  console.log('Risk tab initialized');
  window.updateCounts();
}
