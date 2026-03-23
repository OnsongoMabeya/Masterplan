import { quarterlyAPI, tasksAPI } from '../../shared/api.js';
import { showToast } from '../../shared/toast.js';

let currentQuarterData = null;
let allQuarters = [];
let showingBreakdown = false;

export async function render() {
  try {
    const response = await quarterlyAPI.getCurrent();
    currentQuarterData = response.data;
    
    return `
      <div class="tab-content">
        <div class="sec-eyebrow">Your Plan Timeline</div>
        <h1 class="sec-title">Quarterly <em>Timetable</em></h1>
        <p class="sec-desc">
          Your 5-year plan broken down into 20 quarters. Track tasks and goals for each quarter.
        </p>

        ${renderQuarterHeader()}
        ${renderQuarterProgress()}
        ${renderQuarterTasks()}
        ${renderQuarterGoals()}
        ${renderBreakdownSection()}
      </div>
    `;
  } catch (error) {
    showToast(error.message, 'error');
    return `<div class="tab-content"><p>Error loading quarterly data</p></div>`;
  }
}

function renderQuarterHeader() {
  const { planQuarter } = currentQuarterData;
  
  return `
    <div class="quarter-header">
      <button class="quarter-nav-btn" onclick="window.quarterlyNavigate('prev')" title="Previous quarter">
        ← 
      </button>
      <div class="quarter-title">
        <div class="quarter-tag">${planQuarter.tag}</div>
        <div class="quarter-label">${planQuarter.label}</div>
        <div class="quarter-range">${planQuarter.displayRange}</div>
      </div>
      <button class="quarter-nav-btn" onclick="window.quarterlyNavigate('next')" title="Next quarter">
        →
      </button>
    </div>
  `;
}

function renderQuarterProgress() {
  const { completion } = currentQuarterData;
  const percentage = completion.percentage;
  
  return `
    <div class="quarter-progress-section">
      <div class="progress-ring-container">
        <svg class="progress-ring" width="120" height="120">
          <circle class="progress-ring-bg" cx="60" cy="60" r="54" />
          <circle 
            class="progress-ring-fill" 
            cx="60" cy="60" r="54"
            style="stroke-dashoffset: ${339.292 - (339.292 * percentage) / 100}"
          />
        </svg>
        <div class="progress-ring-text">
          <div class="progress-percentage">${percentage}%</div>
          <div class="progress-label">Complete</div>
        </div>
      </div>
      <div class="progress-stats">
        <div class="stat-item">
          <div class="stat-value c3">${completion.done}</div>
          <div class="stat-label">Tasks Done</div>
        </div>
        <div class="stat-item">
          <div class="stat-value c2">${completion.total - completion.done}</div>
          <div class="stat-label">Remaining</div>
        </div>
        <div class="stat-item">
          <div class="stat-value c1">${completion.total}</div>
          <div class="stat-label">Total Tasks</div>
        </div>
      </div>
    </div>
  `;
}

function renderQuarterTasks() {
  const { tasks, domainStats } = currentQuarterData;
  
  if (tasks.length === 0) {
    return '<p style="color: var(--muted); padding: 40px 0; text-align: center;">No tasks for this quarter</p>';
  }

  const groupedByDomain = tasks.reduce((acc, task) => {
    if (!acc[task.domain]) acc[task.domain] = [];
    acc[task.domain].push(task);
    return acc;
  }, {});

  const domainColors = {
    career: 'c1', health: 'c3', finance: 'c2', family: 'c4',
    faith: 'c5', music: 'c6', community: 'c7', habits: 'c8',
    risk: 'c9', relationships: 'c1'
  };

  return `
    <div class="sec-divider"></div>
    <div class="sec-eyebrow">This Quarter's Tasks</div>
    <h2 class="sec-title" style="font-size: 24px; margin-bottom: 24px;">Tasks by Domain</h2>
    
    <div class="quarter-tasks">
      ${Object.entries(groupedByDomain).map(([domain, domainTasks]) => {
        const stats = domainStats.find(s => s.domain === domain) || { done: 0, total: domainTasks.length };
        const colorClass = domainColors[domain] || 'c1';
        
        return `
          <div class="domain-section">
            <div class="domain-header ${colorClass}">
              <span class="domain-name">${domain.toUpperCase()}</span>
              <span class="domain-count">${stats.done}/${stats.total}</span>
            </div>
            <div class="domain-tasks">
              ${domainTasks.map(task => `
                <div class="task-item ${task.is_done ? 'done' : ''}">
                  <input 
                    type="checkbox" 
                    ${task.is_done ? 'checked' : ''} 
                    onchange="window.quarterlyToggleTask('${task.task_key}')"
                    class="task-checkbox"
                  />
                  <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    ${task.tags ? `<div class="task-tags">${task.tags}</div>` : ''}
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

function renderQuarterGoals() {
  const { goals, planQuarter } = currentQuarterData;
  
  return `
    <div class="sec-divider"></div>
    <div class="sec-eyebrow">Personal Goals</div>
    <h2 class="sec-title" style="font-size: 24px; margin-bottom: 16px;">My Goals This Quarter</h2>
    
    <div class="goals-section">
      ${goals.length === 0 ? '<p style="color: var(--muted); margin-bottom: 16px;">No goals set for this quarter yet</p>' : ''}
      ${goals.map(goal => `
        <div class="goal-item ${goal.is_achieved ? 'achieved' : ''}">
          <input 
            type="checkbox" 
            ${goal.is_achieved ? 'checked' : ''} 
            onchange="window.quarterlyToggleGoal(${goal.id}, ${!goal.is_achieved})"
            class="goal-checkbox"
          />
          <div class="goal-content">
            <div class="goal-text">${goal.goal_text}</div>
            <div class="goal-domain">${goal.domain}</div>
          </div>
          <button class="icon-btn" onclick="window.quarterlyDeleteGoal(${goal.id})" title="Delete goal">🗑️</button>
        </div>
      `).join('')}
      
      <button class="btn btn-secondary" onclick="window.quarterlyShowAddGoal()" style="margin-top: 16px;">
        + Add Goal
      </button>
    </div>
    
    <div id="add-goal-form"></div>
  `;
}

function renderBreakdownSection() {
  return `
    <div class="sec-divider"></div>
    <div class="breakdown-section">
      <button class="breakdown-toggle" onclick="window.quarterlyToggleBreakdown()">
        <span>30-Year Plan Quarterly Breakdown</span>
        <span class="toggle-icon">${showingBreakdown ? '▼' : '▶'}</span>
      </button>
      <div id="breakdown-content" style="display: ${showingBreakdown ? 'block' : 'none'};">
        <!-- Content loaded dynamically -->
      </div>
    </div>
  `;
}

export function init() {
  window.quarterlyNavigate = async (direction) => {
    if (!currentQuarterData) return;
    
    const currentTag = currentQuarterData.planQuarter.tag;
    const match = currentTag.match(/Y(\d+)-Q(\d+)/);
    if (!match) return;
    
    let year = parseInt(match[1]);
    let quarter = parseInt(match[2]);
    
    if (direction === 'next') {
      quarter++;
      if (quarter > 4) {
        quarter = 1;
        year++;
      }
    } else {
      quarter--;
      if (quarter < 1) {
        quarter = 4;
        year--;
      }
    }
    
    if (year < 1 || year > 5) {
      showToast('No more quarters in that direction', 'info');
      return;
    }
    
    const newTag = `Y${year}-Q${quarter}`;
    
    try {
      const response = await quarterlyAPI.getByTag(newTag);
      currentQuarterData = response.data;
      
      const container = document.querySelector('.tab-content');
      if (container) {
        container.innerHTML = await render();
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.quarterlyToggleTask = async (taskKey) => {
    try {
      await tasksAPI.toggle(taskKey);
      
      const response = await quarterlyAPI.getCurrent();
      currentQuarterData = response.data;
      
      const container = document.querySelector('.tab-content');
      if (container) {
        container.innerHTML = await render();
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.quarterlyToggleGoal = async (goalId, isAchieved) => {
    try {
      await quarterlyAPI.updateGoalAchieved(goalId, isAchieved);
      showToast(isAchieved ? 'Goal achieved! 🎉' : 'Goal unmarked');
      
      const response = await quarterlyAPI.getCurrent();
      currentQuarterData = response.data;
      
      const container = document.querySelector('.tab-content');
      if (container) {
        container.innerHTML = await render();
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.quarterlyDeleteGoal = async (goalId) => {
    if (!confirm('Delete this goal?')) return;
    
    try {
      await quarterlyAPI.deleteGoal(goalId);
      showToast('Goal deleted');
      
      const response = await quarterlyAPI.getCurrent();
      currentQuarterData = response.data;
      
      const container = document.querySelector('.tab-content');
      if (container) {
        container.innerHTML = await render();
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.quarterlyShowAddGoal = () => {
    const formContainer = document.getElementById('add-goal-form');
    if (!formContainer) return;
    
    formContainer.innerHTML = `
      <div class="add-goal-form">
        <div style="margin-bottom: 12px;">
          <label class="form-label">Domain</label>
          <select id="goal-domain-input" class="form-input">
            <option value="career">Career</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="family">Family</option>
            <option value="faith">Faith</option>
            <option value="music">Music</option>
            <option value="community">Community</option>
            <option value="habits">Habits</option>
            <option value="risk">Risk</option>
            <option value="relationships">Relationships</option>
          </select>
        </div>
        <div style="margin-bottom: 12px;">
          <label class="form-label">Goal</label>
          <textarea 
            id="goal-text-input" 
            class="form-input" 
            rows="3"
            placeholder="What do you want to achieve this quarter?"
          ></textarea>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" onclick="window.quarterlySaveGoal()">Add Goal</button>
          <button class="btn btn-secondary" onclick="window.quarterlyCancelAddGoal()">Cancel</button>
        </div>
      </div>
    `;
  };

  window.quarterlySaveGoal = async () => {
    const domainInput = document.getElementById('goal-domain-input');
    const textInput = document.getElementById('goal-text-input');
    
    if (!domainInput || !textInput) return;
    
    const domain = domainInput.value;
    const goalText = textInput.value.trim();
    
    if (!goalText) {
      showToast('Please enter a goal', 'error');
      return;
    }
    
    try {
      await quarterlyAPI.createGoal({
        quarter_key: currentQuarterData.planQuarter.tag,
        domain,
        goal_text: goalText
      });
      
      showToast('Goal added successfully');
      
      const response = await quarterlyAPI.getCurrent();
      currentQuarterData = response.data;
      
      const container = document.querySelector('.tab-content');
      if (container) {
        container.innerHTML = await render();
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.quarterlyCancelAddGoal = () => {
    const formContainer = document.getElementById('add-goal-form');
    if (formContainer) {
      formContainer.innerHTML = '';
    }
  };

  window.quarterlyToggleBreakdown = async () => {
    showingBreakdown = !showingBreakdown;
    
    const content = document.getElementById('breakdown-content');
    const toggle = document.querySelector('.toggle-icon');
    
    if (!content || !toggle) return;
    
    if (showingBreakdown) {
      toggle.textContent = '▼';
      content.style.display = 'block';
      
      if (allQuarters.length === 0) {
        try {
          const response = await quarterlyAPI.getAll();
          allQuarters = response.data || [];
        } catch (error) {
          showToast(error.message, 'error');
          return;
        }
      }
      
      content.innerHTML = `
        <div class="breakdown-grid">
          ${allQuarters.map(q => `
            <div class="breakdown-quarter ${q.isCurrent ? 'current' : ''}" onclick="window.quarterlyJumpToQuarter('${q.tag}')">
              <div class="breakdown-tag">${q.tag}</div>
              <div class="breakdown-label">${q.label}</div>
              <div class="breakdown-progress">
                <div class="breakdown-bar">
                  <div class="breakdown-fill" style="width: ${q.percentage}%"></div>
                </div>
                <div class="breakdown-stats">${q.done}/${q.total}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      toggle.textContent = '▶';
      content.style.display = 'none';
    }
  };

  window.quarterlyJumpToQuarter = async (tag) => {
    try {
      const response = await quarterlyAPI.getByTag(tag);
      currentQuarterData = response.data;
      
      showingBreakdown = false;
      
      const container = document.querySelector('.tab-content');
      if (container) {
        container.innerHTML = await render();
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      showToast(error.message, 'error');
    }
  };
}
