import { tasksAPI } from './api.js';
import { toast } from './toast.js';

export function renderDomainTab(domain, tasks, progress, config = {}) {
  const domainTasks = tasks.filter(t => t.domain === domain);
  const domainProgress = progress.find(p => p.domain === domain) || { percentage: 0, done_count: 0, total_count: 0 };
  
  const phases = {};
  domainTasks.forEach(task => {
    if (!phases[task.phase]) {
      phases[task.phase] = [];
    }
    phases[task.phase].push(task);
  });

  const phaseOrder = Object.keys(phases).sort();

  return `
    <div class="tab-content active">
      <div class="sec-eyebrow">${config.eyebrow || domain.toUpperCase()}</div>
      <h1 class="sec-title">${config.title || domain.charAt(0).toUpperCase() + domain.slice(1)}</h1>
      <p class="sec-desc">${config.description || ''}</p>

      <div class="kpi-grid" style="margin-bottom: 32px;">
        <div class="kpi">
          <div class="kpi-num ${config.colorClass || 'cg'}">${domainProgress.percentage}%</div>
          <div class="kpi-label">Progress</div>
        </div>
        <div class="kpi">
          <div class="kpi-num c1">${domainProgress.done_count}</div>
          <div class="kpi-label">Completed</div>
        </div>
        <div class="kpi">
          <div class="kpi-num c3">${domainProgress.total_count - domainProgress.done_count}</div>
          <div class="kpi-label">Remaining</div>
        </div>
      </div>

      ${config.customContent || ''}

      <div class="sec-divider"></div>

      ${phaseOrder.map((phase, idx) => {
        const phaseTasks = phases[phase];
        const phaseId = `phase-${domain}-${idx}`;
        const doneCount = phaseTasks.filter(t => t.is_done).length;
        const totalCount = phaseTasks.length;
        
        return `
          <div class="phase">
            <div class="phase-hdr" onclick="window.togglePhase('${phaseId}')">
              <div class="phase-hdr-left">
                <div class="phase-num">${phase}</div>
                <div class="phase-title">${phase}</div>
              </div>
              <div class="phase-hdr-right">
                <div class="phase-cnt">${doneCount}/${totalCount}</div>
                <div class="phase-chev">▼</div>
              </div>
            </div>
            <div class="phase-body" id="${phaseId}">
              <div class="steps-lbl">Tasks</div>
              ${phaseTasks.map(task => `
                <div class="step ${task.is_done ? 'done' : ''}" onclick="window.toggleTask('${task.task_key}')">
                  <div class="step-cb">${task.is_done ? '✓' : ''}</div>
                  <div class="step-bd">
                    <div class="step-main">${task.title}</div>
                    ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
                    ${task.tags ? `
                      <div class="step-tags">
                        ${task.tags.split(',').map(tag => `<span class="stag">${tag.trim()}</span>`).join('')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.togglePhase = (phaseId) => {
  const phaseBody = document.getElementById(phaseId);
  const phaseHdr = phaseBody.previousElementSibling;
  
  if (phaseBody.classList.contains('open')) {
    phaseBody.classList.remove('open');
    phaseHdr.classList.remove('open');
  } else {
    phaseBody.classList.add('open');
    phaseHdr.classList.add('open');
  }
};

window.toggleTask = async (taskKey) => {
  try {
    await tasksAPI.toggle(taskKey);
    toast.success('Task updated');
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    toast.error('Failed to update task');
  }
};
