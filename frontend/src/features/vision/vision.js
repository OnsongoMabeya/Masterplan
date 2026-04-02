export function render(tasks, progress) {
  return `
    <div class="tab-content active" id="tab-vision30">
      <div class="sec-eyebrow">Sections 5 & 7 · 2056 Vision + 30-Year Milestones</div>
      <div class="sec-title">Me in 2056:<br><em>The Finished Man</em></div>
      <div class="sec-desc">Age 58. Thirty years of intentional building. This is not fantasy — it is the logical destination of the daily work beginning today.</div>

      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 5</div><div class="phase-title">My Future Self — 2056</div></div>
          <div class="phase-hdr-right"><span class="badge cg bgg">30-Year Vision</span><span class="phase-chev">▲</span></div>
        </div>
        <div class="phase-body open">
          <div style="margin-top:14px">
          <div class="grid-2">
            <div class="card"><div class="card-label cg">Who I Will Be (Character & Identity)</div><div class="card-value">A man of deep wisdom, unshakeable faith, and visible integrity. A husband who kept every promise and a father whose children rise up and call him blessed. A leader whose presence commands respect without demanding it. A man who went wide and deep — globally recognised, locally grounded.</div></div>
            <div class="card"><div class="card-label cg">What I Will Have Accomplished</div><div class="card-value">Built and exited a quantum security company. Founded a youth tech bootcamp that has graduated 1,000+ Kenyan developers. Published at least one book on technology, faith, and leadership for African builders. Raised a family of faith and excellence. Served in church leadership at a significant level.</div></div>
            <div class="card"><div class="card-label cg">What I Will Own</div><div class="card-value">A family home fully paid. Multiple plots and real estate generating rental income. Significant stock and bond portfolio. Business equity and intellectual property. A home studio. A family foundation funding scholarships and community development.</div></div>
            <div class="card"><div class="card-label cg">What I Will Be Doing</div><div class="card-value">Mentoring the next generation of African tech founders. Speaking at global conferences on quantum security and African innovation. Playing music in a personal and ministry context. Investing and advising early-stage startups. Farming or building something with my hands. Living freely, working globally from Nairobi.</div></div>
          </div>
          <div class="card"><div class="card-label cg">What My Legacy Will Produce</div><div class="card-value" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">
            <div>📚 <strong>A published book</strong> on tech, faith, and African leadership</div>
            <div>🏫 <strong>A running bootcamp</strong> that doesn't need me to function</div>
            <div>👨‍👩‍👧‍👦 <strong>A family</strong> raised in faith, security, and love</div>
            <div>💰 <strong>Generational wealth</strong> that outlasts me</div>
            <div>🎵 <strong>Original music</strong> recorded and released</div>
            <div>🏗️ <strong>Institutions</strong> that carry the mission forward</div>
          </div></div>
          </div>
        </div>
      </div>

      <!-- Section 7: Milestones -->
      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 7</div><div class="phase-title">30-Year Milestone Breakdown — 5-Year Chapters</div></div>
          <div class="phase-hdr-right"><span class="badge c2 bg2">Milestones</span><span class="phase-chev">▲</span></div>
        </div>
        <div class="phase-body open">
          <div class="timeline" style="margin-top:16px">

            <div class="tl-item">
              <div class="tl-dot c1" style="border-color:var(--c1)"></div>
              <div class="tl-year c1">2026–2031 · Age 28–33 · FIVE-YEAR PLAN</div>
              <div class="tl-title">Foundation & Launch</div>
              <div class="tl-body">
                <strong>Career:</strong> Senior full-stack → DevSecOps entry. $50k → $120k/yr. First remote US/EU contracts. AWS + CKA + Security+ certs. Portfolio projects live.<br>
                <strong>Health:</strong> −30kg. First race completed. Gym habit permanent. Sleep repaired.<br>
                <strong>Finances:</strong> Debt-free. Emergency fund KES 200k+. T-Bills, Sacco, NSE started. First plot of land purchased.<br>
                <strong>Family:</strong> Isolation pattern broken. Brotherhood built. Married by 31. First child by 33.<br>
                <strong>Faith:</strong> Daily devotion consistent. Bible read in full. Monthly fast established.<br>
                <strong>Music:</strong> Intermediate bass. Home studio built. Music income stream active.<br>
                <strong>Community:</strong> 2 structured mentees. Quarterly workshops running. First 4-week programme delivered.
              </div>
            </div>

            <div class="tl-item">
              <div class="tl-dot c2" style="border-color:var(--c2)"></div>
              <div class="tl-year c2">2031–2036 · Age 33–38 · TEN-YEAR PLAN</div>
              <div class="tl-title">Specialisation & Scale</div>
              <div class="tl-body">
                <strong>Career:</strong> DevSecOps specialist. AWS Security Specialty. Company registered. $120–160k/yr. First retainer clients. PQC specialisation begins.<br>
                <strong>Health:</strong> Target weight maintained. Running 10K regularly. Annual medical checkups ritual.<br>
                <strong>Finances:</strong> 5–7 income streams active. KES 1M+ in investments. Second real estate asset. Company generating $3k+/month recurring.<br>
                <strong>Family:</strong> Married. 1–2 children. Strong marriage habits. Family financial plan active. Parents supported.<br>
                <strong>Faith:</strong> Spiritual mentor relationship. Fasting regular. Deeper calling clarity. Possibly in church leadership.<br>
                <strong>Music:</strong> Advanced bass. Original music recorded. Studio generating income.<br>
                <strong>Community:</strong> CBO registered. Formal bootcamp running annually. 100+ youth impacted.
              </div>
            </div>

            <div class="tl-item">
              <div class="tl-dot c4" style="border-color:var(--c4)"></div>
              <div class="tl-year c4">2036–2041 · Age 38–43 · FIFTEEN-YEAR PLAN</div>
              <div class="tl-title">Dominance & Legacy Building</div>
              <div class="tl-body">
                <strong>Career:</strong> Quantum security specialist. IBM Quantum cert. PQC assessment tool built. Company generating $200k+/year. Speaking at conferences.<br>
                <strong>Finances:</strong> Financially independent. All 7 streams generating. Real estate portfolio 3+ properties. KES 5M+ net worth milestone.<br>
                <strong>Family:</strong> Family home owned. Children in school. Strong family culture established. Marriage covenant thriving.<br>
                <strong>Community:</strong> Bootcamp graduated 500+ students. Regional recognition. Partnerships with corporates for funding.<br>
                <strong>Legacy:</strong> Book written and published. Family foundation established.
              </div>
            </div>

            <div class="tl-item">
              <div class="tl-dot c5" style="border-color:var(--c5)"></div>
              <div class="tl-year c5">2041–2051 · Age 43–53 · TWENTY-FIVE-YEAR PLAN</div>
              <div class="tl-title">Consolidation & Succession</div>
              <div class="tl-body">
                <strong>Career:</strong> Company can run without daily involvement. Transition to board/advisory role. Investing in other tech founders. Global consulting and speaking.<br>
                <strong>Finances:</strong> Generational wealth secured. Family foundation actively funding scholarships. Real estate portfolio self-managing.<br>
                <strong>Family:</strong> Children reaching adulthood with strong values and opportunity. Family legacy documented. Marriage still the centre.<br>
                <strong>Community:</strong> Bootcamp is an institution with its own leadership. Succession plan executed. Your name attached to a movement, not just a programme.
              </div>
            </div>

            <div class="tl-item">
              <div class="tl-dot c3" style="border-color:var(--c3)"></div>
              <div class="tl-year c3">2051–2056 · Age 53–58 · THIRTY-YEAR PLAN</div>
              <div class="tl-title">Elder, Legacy, Influence</div>
              <div class="tl-body">
                <strong>Who you are:</strong> A statesman-builder whose institutions are running without him. A man whose family testifies to what intentional living produces. A voice in African technology, faith, and leadership that carries weight globally.<br>
                <strong>What you leave:</strong> A company. A bootcamp. A family foundation. A book. Original music. Generational wealth. Children who know how to build. A church community enriched by 30 years of faithful service.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Vision tab initialized');
}
