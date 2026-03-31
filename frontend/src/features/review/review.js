export function render(tasks, progress) {
  return `
    <div class="tab-content active" id="tab-review">
      <div class="sec-eyebrow">Section 11 · Quarterly & Annual Review Framework</div>
      <div class="sec-title">Review Systems<br><em>That Catch Drift Early</em></div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Weekly</div>
            <div class="phase-title">Sunday Weekly Review — 30 minutes, every week without exception</div>
          </div>
          <div class="phase-hdr-right">
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          <div class="card">
            <div class="card-label cg">Every Sunday 8:00–8:30pm — The 6 Questions</div>
            <div class="card-value" style="margin-top:8px">
              <div style="margin-bottom:6px">1. Did I complete my 3 weekly priorities? If not — why not?</div>
              <div style="margin-bottom:6px">2. How was my health this week? (exercise, sleep, food)</div>
              <div style="margin-bottom:6px">3. Did I stick to my budget? Any financial leakage?</div>
              <div style="margin-bottom:6px">4. How was my morning routine? (streak intact?)</div>
              <div style="margin-bottom:6px">5. What am I most proud of this week?</div>
              <div>6. What are my 3 priorities for next week?</div>
            </div>
          </div>
        </div>
      </div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Monthly</div>
            <div class="phase-title">Monthly Life Audit — Last day of every month, 60 minutes</div>
          </div>
          <div class="phase-hdr-right">
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          <div class="card">
            <div class="card-label cg">Review All 8 Domains Against Monthly Goals</div>
            <div class="card-value" style="margin-top:8px">
              Review career progress (tasks completed, rate, certs progress) · Health metrics (weight, exercise sessions, sleep average) · Financial position (savings balance, income, spending vs budget) · Relationships (brotherhood met? mentor met?) · Faith (devotion streak, journal entries, fasting done?) · Music (practice days, skill progress) · Community (mentee meetings done?) · Habits (morning routine %, Weekly Reviews done)
            </div>
          </div>
        </div>
      </div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Quarterly</div>
            <div class="phase-title">Quarterly Strategic Review — Every 3 months, 2–3 hours</div>
          </div>
          <div class="phase-hdr-right">
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          <div class="card">
            <div class="card-label cg">The 6 Quarterly Questions (from the document)</div>
            <div class="card-value" style="margin-top:8px">
              <div style="margin-bottom:6px">1. <strong>What did I achieve?</strong> List real accomplishments across all domains</div>
              <div style="margin-bottom:6px">2. <strong>What failed?</strong> Honest audit — what didn't happen and why?</div>
              <div style="margin-bottom:6px">3. <strong>What must be improved?</strong> Systems, habits, approaches that need refinement</div>
              <div style="margin-bottom:6px">4. <strong>What must be stopped?</strong> Commitments, habits, or relationships draining energy without return</div>
              <div style="margin-bottom:6px">5. <strong>What must be started?</strong> New actions required to hit the next milestone</div>
              <div>6. <strong>What must be prioritised next quarter?</strong> Top 3 domain focus areas for the next 90 days</div>
            </div>
          </div>
        </div>
      </div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left">
            <div class="phase-num">Annual</div>
            <div class="phase-title">Annual Life Audit — Every December, full day</div>
          </div>
          <div class="phase-hdr-right">
            <span class="phase-chev">▲</span>
          </div>
        </div>
        <div class="phase-body open">
          <div class="card">
            <div class="card-label cg">The December Life Reset — 6–8 Hours of Reflection and Planning</div>
            <div class="card-value" style="margin-top:8px">
              <strong>Morning (reflection):</strong> Read your journal from the past year. What did God say? What patterns appear? What did you overcome? What are you proud of?<br><br>
              <strong>Afternoon (assessment):</strong> Score yourself 1–10 in each domain. Where did you thrive? Where did you stagnate? What was your biggest win? Biggest lesson?<br><br>
              <strong>Evening (planning):</strong> Set domain goals for next year. Write your "Letter to Future Me" — read it in December. Update your 30-year milestones based on where you actually are.<br><br>
              <strong>The 5 annual questions:</strong><br>
              1. Am I becoming the man I said I wanted to be?<br>
              2. Is my family better because I'm in it?<br>
              3. Is my faith deeper than it was a year ago?<br>
              4. Am I closer to financial freedom than I was?<br>
              5. Has my community grown because of my presence?
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Review tab initialized');
}
