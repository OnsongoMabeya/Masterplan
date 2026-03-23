export function render(tasks, progress) {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.is_done).length;
  const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const domainStats = progress.map(p => ({
    domain: p.domain,
    percentage: p.percentage,
    done: p.done_count,
    total: p.total_count
  }));

  return `
    <div class="tab-content active">
      <div class="sec-eyebrow">Overview</div>
      <h1 class="sec-title">My 30-Year Life <em>Masterplan</em></h1>
      <p class="sec-desc">
        A comprehensive roadmap spanning 2026–2056, designed to guide every major domain of life 
        toward intentional growth, fulfillment, and legacy.
      </p>

      <div class="kpi-grid">
        <div class="kpi">
          <div class="kpi-num cg">${percentage}%</div>
          <div class="kpi-label">Overall Progress</div>
        </div>
        <div class="kpi">
          <div class="kpi-num c1">${doneTasks}</div>
          <div class="kpi-label">Tasks Completed</div>
        </div>
        <div class="kpi">
          <div class="kpi-num c2">${totalTasks - doneTasks}</div>
          <div class="kpi-label">Tasks Remaining</div>
        </div>
        <div class="kpi">
          <div class="kpi-num c4">${domainStats.length}</div>
          <div class="kpi-label">Life Domains</div>
        </div>
      </div>

      <div class="sec-divider"></div>

      <div class="sec-eyebrow">Domain Progress</div>
      <h2 class="sec-title" style="font-size: 28px; margin-bottom: 24px;">Track Your Journey</h2>

      <div class="grid-2">
        ${domainStats.map((stat, idx) => {
          const colorClass = `c${(idx % 9) + 1}`;
          const bgClass = `bg${(idx % 9) + 1}`;
          return `
            <div class="card ${bgClass}">
              <div class="card-label ${colorClass}">${stat.domain.toUpperCase()}</div>
              <div class="card-value">
                <strong>${stat.percentage}%</strong> complete
                <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
                  ${stat.done} of ${stat.total} tasks
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="sec-divider"></div>

      <div class="callout bg2 bd2">
        <div class="callout-lbl c2">Getting Started</div>
        <div>
          Navigate through the tabs above to explore each life domain. 
          Click on tasks to mark them complete and track your progress over the next 30 years.
        </div>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Home tab initialized');
}
