import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const relationshipsTasks = tasks.filter(t => t.domain === 'relationships');

  return `
    <div class="tab-content active" id="tab-relationships">
      <div class="sec-eyebrow">Section 11 · Relationships & Network</div>
      <div class="sec-title">Your Network Is<br><em>Your Net Worth</em></div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Actions</div>
            <div class="phase-title">Mentors, Brotherhood, Professional Communities, Annual Audit</div>
          </div>
          <div class="phase-hdr-right">
            <span class="badge c5 bg5">Essential</span>
            <span class="phase-cnt" data-sec="relationships">0/${relationshipsTasks.length}</span>
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          ${relationshipsTasks.map(task => `
            <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'relationships')" data-task-key="${task.task_key}">
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
      <div class="dom-prog-row"><span id="relationships-prog-text">0 / ${relationshipsTasks.length} tasks</span><span class="c5">KPIs: mentors active · brotherhood meetings · communities joined · annual audit</span></div>
    </div>
  `;
}

export function init() {
  console.log('Relationships tab initialized');
  window.updateCounts();
}
