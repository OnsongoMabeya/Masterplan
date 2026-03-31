import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const familyTasks = tasks.filter(t => t.domain === 'family');

  return `
    <div class="tab-content active" id="tab-family">
      <div class="sec-eyebrow">Section 8 · Family & Relationships</div>
      <div class="sec-title">Love That Lasts,<br><em>Legacy That Leads</em></div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Now</div>
            <div class="phase-title">Break the Isolation Pattern — Build brotherhood first</div>
          </div>
          <div class="phase-hdr-right">
            <span class="badge c5 bg5">Inner Work</span>
            <span class="phase-cnt" data-sec="family">0/${familyTasks.length}</span>
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          ${familyTasks.map(task => `
            <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'family')" data-task-key="${task.task_key}">
              <div class="step-cb">${task.is_done ? '✓' : ''}</div>
              <div class="step-bd">
                <div class="step-main">${task.title}</div>
                ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
              </div>
            </div>
          `).join('')}
          <div class="milestone bd5"><div class="milestone-lbl c5">✦ 3-Year Relationship Milestone</div><div class="milestone-text">Isolation pattern broken. Brotherhood meeting monthly. 3 mentors active. Financially ready. Partner found who shares your values and vision. Married at 31.</div></div>
        </div>
      </div>
      <div class="dom-prog-row"><span id="family-prog-text">0 / ${familyTasks.length} tasks</span><span class="c5">Married by 31 · Father by 33 · Safe place for your family always</span></div>
    </div>
  `;
}

export function init() {
  console.log('Family tab initialized');
  window.updateCounts();
}
