import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  const careerTasks = tasks.filter(t => t.domain === 'career');
  
  // Group tasks by phase
  const phases = {
    'M 1-3': { title: 'Senior Full Stack Mastery — Months 0–12 · $50–80k/yr', badge: 'Active Now', badgeClass: 'c1 bg1', num: 'PHASE 1', open: true },
    'M 4-6': { title: 'DevSecOps Entry — Months 12–24 · $80–120k/yr', badge: 'Months 12–24', badgeClass: 'c2 bg2', num: 'PHASE 2', open: false },
    'M 7-12': { title: 'Security Specialist — Months 24–36 · $120–160k/yr', badge: 'Months 24–36', badgeClass: 'c4 bg4', num: 'PHASE 3', open: false },
    'Y 2-3': { title: 'Quantum Computing Entry — Years 3–4 · $150–200k/yr', badge: 'Years 3–4', badgeClass: 'c3 bg3', num: 'PHASE 4', open: false },
    'Y 4-5': { title: 'Founder — Year 5 · $200k+ company', badge: 'Year 5', badgeClass: 'c5 bg5', num: 'PHASE 5', open: false }
  };

  const tasksByPhase = {};
  Object.keys(phases).forEach(phase => {
    tasksByPhase[phase] = careerTasks.filter(t => t.phase === phase);
  });

  return `
    <div class="tab-content active" id="tab-career">
      <div class="search-wrap">
        <input class="search-input" type="text" placeholder="Search career tasks, commands, resources..." oninput="doSearch('career',this.value)">
      </div>
      <div class="sec-eyebrow">Section 8 · Career & Business · 5-Phase Plan</div>
      <div class="sec-title">Full Stack → DevSecOps<br><em>→ Quantum → Founder</em></div>
      <div class="sec-desc">From KES 50k/month freelancer to quantum security company founder. Every week, every task, every command. Income arc: $380/month → $200k+/year in 5 years.</div>

      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-num c1">$50–80k</div><div class="kpi-label">Year 1 target</div></div>
        <div class="kpi"><div class="kpi-num c2">$80–120k</div><div class="kpi-label">Year 2 target</div></div>
        <div class="kpi"><div class="kpi-num c4">$120–160k</div><div class="kpi-label">Year 3 target</div></div>
        <div class="kpi"><div class="kpi-num c3">$150–200k</div><div class="kpi-label">Year 4 target</div></div>
        <div class="kpi"><div class="kpi-num c5">$200k+</div><div class="kpi-label">Year 5 company</div></div>
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
                <span class="phase-cnt" data-sec="career">0/${phaseTasks.length}</span>
                <span class="phase-chev">${chevron}</span>
              </div>
            </div>
            <div class="phase-body ${phaseOpen}">
              ${idx === 0 ? '<div class="callout bg1 bd1"><div class="callout-lbl c1">Goal</div>Elevate your JS/TS + Java + React to senior level. Land $40–60/hr remote contracts. Build 2 production-quality portfolio projects. Pass AWS Cloud Practitioner.</div>' : ''}
              
              ${phaseTasks.map(task => `
                <div class="step ${task.is_done ? 'done' : ''}" onclick="ts(this,'career')" data-task-key="${task.task_key}">
                  <div class="step-cb">${task.is_done ? '✓' : ''}</div>
                  <div class="step-bd">
                    <div class="step-main">${task.title}</div>
                    ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                    ${task.tags ? `<div class="step-tags">${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}</div>` : ''}
                  </div>
                </div>
              `).join('')}
              
              ${idx === 0 ? '<div class="milestone bd1"><div class="milestone-lbl c1">✦ Phase 1 Complete</div><div class="milestone-text">Senior-level TS/NestJS/Next.js developer billing $50–70/hr remotely. 2 production portfolio apps. AWS cert. OSS contributions. 3 articles published. Growing LinkedIn presence.</div></div>' : ''}
            </div>
          </div>
        `;
      }).join('')}

      <div class="dom-prog-row">
        <span id="career-prog-text">0 / ${careerTasks.length} tasks</span>
        <span class="c1">5 phases · $50k → $200k+ · Full Stack → Quantum → Founder</span>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Career tab initialized');
  window.updateCounts();
}
