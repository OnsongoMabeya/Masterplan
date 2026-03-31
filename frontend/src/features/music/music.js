import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const musicTasks = tasks.filter(t => t.domain === 'music');
  
  const phases = {
    'M 1-6': { title: 'Bass Guitar Mastery — Daily structured practice, theory, church performance', badge: 'Bass First', badgeClass: 'c6 bg6', num: 'M 1–6', open: true },
    'Y 2-3': { title: 'Home Studio + Music Production + Income', badge: 'Studio', badgeClass: 'c6 bg6', num: 'Y 2–3', open: false }
  };

  const tasksByPhase = {};
  Object.keys(phases).forEach(phase => {
    tasksByPhase[phase] = musicTasks.filter(t => t.phase === phase);
  });

  return `
    <div class="tab-content active" id="tab-music">
      <div class="sec-eyebrow">Section 8 · Music & Artistry</div>
      <div class="sec-title">Your Art Is<br><em>Also Your Asset</em></div>

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
                <span class="phase-cnt" data-sec="music">0/${phaseTasks.length}</span>
                <span class="phase-chev">${chevron}</span>
              </div>
            </div>
            <div class="phase-body ${phaseOpen}">
              ${idx === 0 ? '<div class="callout bg6 bd6"><div class="callout-lbl c6">The Focus Rule</div>You play 6 instruments at beginner level. For 12 months, bass guitar gets intentional daily practice. Other instruments get 1–2x/week maintenance. Depth on one unlocks all others faster.</div>' : ''}
              ${phaseTasks.map(task => `
                <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'music')" data-task-key="${task.task_key}">
                  <div class="step-cb">${task.is_done ? '✓' : ''}</div>
                  <div class="step-bd">
                    <div class="step-main">${task.title}</div>
                    ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                    ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
                  </div>
                </div>
              `).join('')}
              ${idx === 1 ? '<div class="milestone bd6"><div class="milestone-lbl c6">✦ 3-Year Music Milestone</div><div class="milestone-text">Intermediate-advanced bassist. Home studio operational. One original track produced. Music income stream active (KES 10–24k/month). Church ministry elevated.</div></div>' : ''}
            </div>
          </div>
        `;
      }).join('')}
      <div class="dom-prog-row"><span id="music-prog-text">0 / ${musicTasks.length} tasks</span><span class="c6">KPIs: practice streak · skills level · studio built · music income generated</span></div>
    </div>
  `;
}

export function init() {
  console.log('Music tab initialized');
  window.updateCounts();
}
