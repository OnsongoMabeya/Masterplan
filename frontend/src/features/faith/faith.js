import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const faithTasks = tasks.filter(t => t.domain === 'faith');

  return `
    <div class="tab-content active" id="tab-faith">
      <div class="sec-eyebrow">Section 8 · Spiritual Life</div>
      <div class="sec-title">The Anchor That<br><em>Holds Everything</em></div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Month 1</div>
            <div class="phase-title">Build the Daily Altar — 20 minutes before phone, before everything</div>
          </div>
          <div class="phase-hdr-right">
            <span class="badge c4 bg4">Daily Practice</span>
            <span class="phase-cnt" data-sec="faith">0/${faithTasks.length}</span>
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          ${faithTasks.map(task => `
            <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'faith')" data-task-key="${task.task_key}">
              <div class="step-cb">${task.is_done ? '✓' : ''}</div>
              <div class="step-bd">
                <div class="step-main">${task.title}</div>
                ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
              </div>
            </div>
          `).join('')}
          <div class="milestone bd4"><div class="milestone-lbl c4">✦ 12-Month Faith Milestone</div><div class="milestone-text">Daily 20-min devotion consistent 10+ months. Bible read in full. 12 months of journal entries. Monthly fasting established. Spiritual mentor meeting regularly. Deep roots, clear calling.</div></div>
        </div>
      </div>
      <div class="dom-prog-row"><span id="faith-prog-text">0 / ${faithTasks.length} tasks</span><span class="c4">KPIs: devotion streak · Bible read · journal entries · fasting days · mentor meetings</span></div>
    </div>
  `;
}

export function init() {
  console.log('Faith tab initialized');
  window.updateCounts();
}
