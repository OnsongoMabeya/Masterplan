import { metricsAPI } from '../../shared/api.js';
import { showToast } from '../../shared/toast.js';

let currentCategory = null;
let allMetrics = [];
let editingMetric = null;
let historyMetric = null;

export async function render() {
  try {
    const response = await metricsAPI.getAll();
    allMetrics = response.data || [];
    
    return `
      <div class="tab-content">
        <div class="sec-eyebrow">Track Your Progress</div>
        <h1 class="sec-title">Metrics <em>Tracker</em></h1>
        <p class="sec-desc">
          Track your progress against your life plan targets. Update metrics regularly to see your growth over time.
        </p>

        <div style="margin: 24px 0;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="category-pill ${!currentCategory ? 'active' : ''}" onclick="window.metricsFilterCategory(null)">
              All
            </button>
            <button class="category-pill ${currentCategory === 'health' ? 'active' : ''}" onclick="window.metricsFilterCategory('health')">
              Health
            </button>
            <button class="category-pill ${currentCategory === 'finance' ? 'active' : ''}" onclick="window.metricsFilterCategory('finance')">
              Finance
            </button>
            <button class="category-pill ${currentCategory === 'career' ? 'active' : ''}" onclick="window.metricsFilterCategory('career')">
              Career
            </button>
            <button class="category-pill ${currentCategory === 'habits' ? 'active' : ''}" onclick="window.metricsFilterCategory('habits')">
              Habits
            </button>
          </div>
        </div>

        <div class="metrics-grid" id="metrics-grid">
          ${renderMetricsGrid()}
        </div>

        <div id="edit-form-container"></div>
        <div id="history-drawer-container"></div>
      </div>
    `;
  } catch (error) {
    showToast(error.message, 'error');
    return `<div class="tab-content"><p>Error loading metrics</p></div>`;
  }
}

function renderMetricsGrid() {
  const filtered = currentCategory 
    ? allMetrics.filter(m => m.category === currentCategory)
    : allMetrics;

  if (filtered.length === 0) {
    return '<p style="color: var(--muted); padding: 40px 0; text-align: center;">No metrics found</p>';
  }

  return filtered.map(metric => {
    const percentage = metric.target_value > 0 
      ? Math.min(100, Math.round((metric.current_value / metric.target_value) * 100))
      : 0;
    
    const categoryColors = {
      health: 'c3',
      finance: 'c2',
      career: 'c1',
      habits: 'c4'
    };
    const colorClass = categoryColors[metric.category] || 'c1';

    return `
      <div class="metric-card">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="metric-dot ${colorClass}"></div>
            <div class="metric-label">${metric.label}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="icon-btn" onclick="window.metricsShowHistory('${metric.metric_key}')" title="View history">
              🕐
            </button>
            <button class="icon-btn" onclick="window.metricsEditMetric('${metric.metric_key}')" title="Edit value">
              ✏️
            </button>
          </div>
        </div>
        
        <div class="metric-value">${metric.current_value} <span class="metric-unit">${metric.unit}</span></div>
        <div class="metric-target">Target: ${metric.target_value} ${metric.unit}</div>
        
        <div class="metric-progress-bar">
          <div class="metric-progress-fill ${colorClass}" style="width: ${percentage}%"></div>
        </div>
        
        <div class="metric-updated">Last updated: ${formatDate(metric.updated_at)}</div>
      </div>
    `;
  }).join('');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

export function init() {
  window.metricsFilterCategory = async (category) => {
    currentCategory = category;
    const grid = document.getElementById('metrics-grid');
    if (grid) {
      grid.innerHTML = renderMetricsGrid();
    }
    
    document.querySelectorAll('.category-pill').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  window.metricsEditMetric = async (metricKey) => {
    editingMetric = allMetrics.find(m => m.metric_key === metricKey);
    if (!editingMetric) return;

    const container = document.getElementById('edit-form-container');
    container.innerHTML = `
      <div class="edit-overlay" onclick="window.metricsCancelEdit()"></div>
      <div class="edit-form">
        <h3 style="margin-bottom: 16px;">Update ${editingMetric.label}</h3>
        
        <div style="margin-bottom: 16px;">
          <label class="form-label">New Value (${editingMetric.unit})</label>
          <input 
            type="number" 
            id="metric-value-input" 
            class="form-input" 
            value="${editingMetric.current_value}"
            step="0.1"
          />
        </div>
        
        <div style="margin-bottom: 16px;">
          <label class="form-label">Note (optional)</label>
          <textarea 
            id="metric-note-input" 
            class="form-input" 
            rows="3"
            placeholder="What's the context for this update?"
          ></textarea>
        </div>
        
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" onclick="window.metricsSaveEdit()">Save</button>
          <button class="btn btn-secondary" onclick="window.metricsCancelEdit()">Cancel</button>
        </div>
      </div>
    `;
  };

  window.metricsSaveEdit = async () => {
    const valueInput = document.getElementById('metric-value-input');
    const noteInput = document.getElementById('metric-note-input');
    
    if (!valueInput || !editingMetric) return;

    const value = parseFloat(valueInput.value);
    const note = noteInput.value.trim() || null;

    try {
      await metricsAPI.updateValue(editingMetric.metric_key, value, note);
      showToast('Metric updated successfully');
      
      const response = await metricsAPI.getAll();
      allMetrics = response.data || [];
      
      const grid = document.getElementById('metrics-grid');
      if (grid) {
        grid.innerHTML = renderMetricsGrid();
      }
      
      window.metricsCancelEdit();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.metricsCancelEdit = () => {
    editingMetric = null;
    const container = document.getElementById('edit-form-container');
    if (container) {
      container.innerHTML = '';
    }
  };

  window.metricsShowHistory = async (metricKey) => {
    try {
      const response = await metricsAPI.getHistory(metricKey);
      const { metric, history } = response.data;
      historyMetric = metric;

      const container = document.getElementById('history-drawer-container');
      container.innerHTML = `
        <div class="drawer-overlay" onclick="window.metricsCloseHistory()"></div>
        <div class="drawer">
          <div class="drawer-header">
            <h3>${metric.label} History</h3>
            <button class="icon-btn" onclick="window.metricsCloseHistory()">✕</button>
          </div>
          
          <div class="drawer-body">
            ${history.length === 0 ? '<p style="color: var(--muted); text-align: center; padding: 40px 0;">No history yet</p>' : ''}
            ${history.map(entry => `
              <div class="history-entry">
                <div class="history-value">${entry.value} ${metric.unit}</div>
                <div class="history-date">${new Date(entry.recorded_at).toLocaleString()}</div>
                ${entry.note ? `<div class="history-note">${entry.note}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  window.metricsCloseHistory = () => {
    historyMetric = null;
    const container = document.getElementById('history-drawer-container');
    if (container) {
      container.innerHTML = '';
    }
  };
}
