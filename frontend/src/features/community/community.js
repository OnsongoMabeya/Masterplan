import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const communityTasks = tasks.filter(t => t.domain === 'community');

  return `
    <div class="tab-content active" id="tab-community">
      <div class="sec-eyebrow">Section 8 · Community Impact</div>
      <div class="sec-title">Raise Up the<br><em>Next Generation</em></div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Now → Y2</div>
            <div class="phase-title">Formalise Mentorship + Create Resources</div>
          </div>
          <div class="phase-hdr-right">
            <span class="badge c2 bg2">Start Now</span>
            <span class="phase-cnt" data-sec="community">0/${communityTasks.length}</span>
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          ${communityTasks.map(task => `
            <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'community')" data-task-key="${task.task_key}">
              <div class="step-cb">${task.is_done ? '✓' : ''}</div>
              <div class="step-bd">
                <div class="step-main">${task.title}</div>
                ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
              </div>
            </div>
          `).join('')}
          <div class="milestone bd2"><div class="milestone-lbl c2">✦ 5-Year Community Milestone</div><div class="milestone-text">2 mentored individuals thriving. 200+ youth reached. CBO registered. Bootcamp first cohort graduated. Your name = "the person who opens tech doors for Kenyan youth."</div></div>
        </div>
      </div>
      <div class="dom-prog-row"><span id="community-prog-text">0 / ${communityTasks.length} tasks</span><span class="c2">KPIs: mentees active · youth reached · bootcamp graduates · CBO registered</span></div>
    </div>
  `;
}

export function init() {
  console.log('Community tab initialized');
  window.updateCounts();
}
