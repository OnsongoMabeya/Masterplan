export function render(tasks, progress) {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.is_done).length;
  const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Get habits tasks for non-negotiables section
  const habitsTasks = tasks.filter(t => t.domain === 'habits').slice(0, 5);

  return `
    <div class="tab-content active" id="tab-home">
      <div class="sec-eyebrow">Life Masterplan · March 2026</div>
      <div class="sec-title">A Man of <em>Faith, Excellence</em><br>& Generational Legacy</div>
      <div class="sec-desc">Every section of your 30-year plan in one place. This is not a wish list — it is a blueprint built on your answers, your context, and your calling. Use the tabs above to navigate every domain.</div>

      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-num cg">28</div><div class="kpi-label">Age today</div></div>
        <div class="kpi"><div class="kpi-num cg">58</div><div class="kpi-label">Age at plan end</div></div>
        <div class="kpi"><div class="kpi-num cg">7</div><div class="kpi-label">Income streams target</div></div>
        <div class="kpi"><div class="kpi-num cg">−30</div><div class="kpi-label">kg · 12-month goal</div></div>
        <div class="kpi"><div class="kpi-num cg">31</div><div class="kpi-label">Marriage target age</div></div>
        <div class="kpi"><div class="kpi-num cg">5</div><div class="kpi-label">Career phases</div></div>
        <div class="kpi"><div class="kpi-num cg">6</div><div class="kpi-label">Instruments</div></div>
        <div class="kpi"><div class="kpi-num cg">12</div><div class="kpi-label">Plan sections</div></div>
      </div>

      <div class="sec-divider"></div>

      <div style="margin-bottom:20px">
        <div class="sec-eyebrow">All Domains at a Glance</div>
      </div>

      <div class="grid-2">
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('career')">
          <div class="card-label c1">💻 Career — Full Stack → Quantum → Founder</div>
          <div class="card-value">Phase 1 active: TypeScript mastery, NestJS, portfolio projects. $50→$80k/yr target by Month 12. 5-phase plan to quantum security company.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('health')">
          <div class="card-label c3">💪 Health — −30kg + Run a Race</div>
          <div class="card-value">Starting from light walking. Medical checkup Week 1. C25K + gym by Month 3. Stanchart Marathon target. Sleep repair begins now.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('finance')">
          <div class="card-label c2">💰 Finances — 7 Income Streams</div>
          <div class="card-value">Currently: paycheck to paycheck, personal loan. Immediate: zero-based budget + emergency fund. Target: financially free by 45.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('family')">
          <div class="card-label c5">❤️ Family — Married by 31</div>
          <div class="card-value">Single, strong family base. Break isolation pattern. Build brotherhood. Financial readiness gate before marriage. Father by 33.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('faith')">
          <div class="card-label c4">✝️ Faith — Deep Roots, Clear Calling</div>
          <div class="card-value">Church active but surface-level personal practice. Daily 20-min devotion. Bible in a Year. Monthly fast. Spiritual mentor.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('music')">
          <div class="card-label c6">🎸 Music — Bass → Studio → Income</div>
          <div class="card-value">Bass guitar primary focus. Piano, cello, vocals, ukulele, clarinet maintained. Home studio Year 2. Music income stream Year 3.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('community')">
          <div class="card-label c2">🌍 Community — Tech Bootcamp for Youth</div>
          <div class="card-value">Currently advising informally. Formalise 2 mentees. Quarterly workshops. 4-week programme Year 2. Full bootcamp Year 5.</div>
        </div>
        <div class="card" style="cursor:pointer" onclick="window.switchTabById('habits')">
          <div class="card-label c3">⚙️ Habits — Fix the Engine Room First</div>
          <div class="card-value">No morning routine. Phone addiction. No tracking system. 5 sabotaging habits identified. Morning stack + Notion OS + Weekly Review.</div>
        </div>
      </div>

      <div class="sec-divider"></div>
      <div class="quote">"An unplanned life is a misused and abused life. Planning gives you a head start; diligence gives you a map; disciplined execution converts intention into destiny."<cite>— Godswill T.K. Mensah</cite></div>

      <div style="margin-top:24px">
        <div class="sec-eyebrow">This Week's Non-Negotiables</div>
        <div style="margin-top:12px">
          ${habitsTasks.map(task => `
            <div class="step ${task.is_done ? 'done' : ''}" onclick="window.ts(this, 'habits')" data-task-key="${task.task_key}">
              <div class="step-cb">${task.is_done ? '✓' : ''}</div>
              <div class="step-bd">
                <div class="step-main">${task.title}</div>
                ${task.detail ? `<div class="step-detail">${task.detail}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Home tab initialized');
}
