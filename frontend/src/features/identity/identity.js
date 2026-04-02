export function render(tasks, progress) {
  return `
    <div class="tab-content active" id="tab-identity">
      <div class="sec-eyebrow">Sections 1–4 & 6 · Vision, Purpose, Legacy, Identity, Current Reality</div>
      <div class="sec-title">Who You Are &<br><em>Who You're Becoming</em></div>

      <!-- SECTION 1: Vision/Mission/Values -->
      <div class="phase">
        <div class="phase-hdr open" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 1</div><div class="phase-title">Vision, Mission & Core Values</div></div>
          <div class="phase-hdr-right"><span class="badge cg bgg">Foundation</span><span class="phase-chev">▲</span></div>
        </div>
        <div class="phase-body open">
          <div class="card" style="margin-top:14px"><div class="card-label cg">Personal Vision Statement</div>
            <div class="card-value">To become a <strong>globally impactful tech founder, man of God, and creative force</strong> — building transformative companies from Nairobi, raising a family of faith and excellence, and leaving a legacy of institutions, leaders, and wealth that outlasts my lifetime.</div>
          </div>
          <div class="card"><div class="card-label cg">Personal Mission Statement</div>
            <div class="card-value">To <strong>build daily, lead boldly, and serve faithfully</strong> — growing as a quantum security engineer and entrepreneur, investing in my family and community, playing music with excellence, and honouring God in every lane I run.</div>
          </div>
          <div class="card"><div class="card-label cg">Core Values — Your 8 Anchors</div>
            <div class="card-value" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
              <div><span class="badge c1 bg1">Excellence</span> — Never settle for average in any domain</div>
              <div><span class="badge c2 bg2">Integrity</span> — Character before achievement, always</div>
              <div><span class="badge c4 bg4">Faith</span> — God first in every decision and direction</div>
              <div><span class="badge c5 bg5">Family</span> — My greatest legacy is who I raise</div>
              <div><span class="badge c3 bg3">Discipline</span> — Systems over motivation, always</div>
              <div><span class="badge c6 bg6">Service</span> — Invest in others without keeping score</div>
              <div><span class="badge c9 bg9">Innovation</span> — Build what doesn't yet exist</div>
              <div><span class="badge c7 bg7">Legacy</span> — Every action is a seed for the future</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 2: Purpose Discovery -->
      <div class="phase">
        <div class="phase-hdr" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 2</div><div class="phase-title">Life Purpose Discovery — Your Answers</div></div>
          <div class="phase-hdr-right"><span class="badge c1 bg1">Purpose</span><span class="phase-chev">▼</span></div>
        </div>
        <div class="phase-body">
          <div style="margin-top:14px">
          <div class="card"><div class="card-label c1">What have I always wanted to become?</div><div class="card-value">All three lanes simultaneously: a <strong>globally recognised tech founder</strong> who transforms communities, a <strong>man of God who built wealth and raised a strong family</strong>, and a <strong>creative — musician, builder, mentor</strong> — who left a legacy in multiple fields. I refuse to choose one lane.</div></div>
          <div class="card"><div class="card-label c1">What gives me the deepest fulfillment?</div><div class="card-value"><strong>Building things</strong> — products, systems, businesses that work and last. And <strong>leading</strong> — being the person others look to when direction is needed. When I'm building and leading simultaneously, I am most alive.</div></div>
          <div class="card"><div class="card-label c1">What future do I constantly imagine for myself?</div><div class="card-value">A <strong>tech company founder living freely, working globally from Nairobi</strong>. A man whose <strong>family is thriving, financially secure, spiritually grounded</strong>. These two images appear together — they are not separate visions.</div></div>
          <div class="card"><div class="card-label c1">What do I naturally do well with minimal effort?</div><div class="card-value">Building systems and structures that work. Leading and guiding others — people come to me for direction naturally. Making complex things accessible through explanation and mentorship.</div></div>
          <div class="card"><div class="card-label c1">What has my past experience prepared me for?</div><div class="card-value">Freelance technical work across full-stack development, audio tools (TAWI), data pipelines, and infrastructure. Real-world problem-solving under resource constraints. Ministry and community service. Musicianship across multiple instruments.</div></div>
          <div class="card"><div class="card-label c1">What would I attempt if I could not fail?</div><div class="card-value">Build the quantum security company, launch the youth tech bootcamp in Nairobi, record and release original music, write a book on technology and leadership for African builders — all at once.</div></div>
          <div class="card"><div class="card-label c1">What do I want to be remembered for?</div><div class="card-value">That I <strong>loved God and my family with everything I had</strong>, built a company that mattered, opened doors for young Kenyans in tech, played beautiful music, and never compromised my integrity for success.</div></div>
          </div>
        </div>
      </div>

      <!-- SECTION 3: Legacy Questions -->
      <div class="phase">
        <div class="phase-hdr" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 3</div><div class="phase-title">Legacy-Oriented Questions — Your Answers</div></div>
          <div class="phase-hdr-right"><span class="badge c5 bg5">Legacy</span><span class="phase-chev">▼</span></div>
        </div>
        <div class="phase-body">
          <div style="margin-top:14px">
          <div class="card"><div class="card-label c5">How do I want my children to describe me?</div><div class="card-value">"He loved God first, loved us fiercely, and never compromised his integrity. He was a great man who also made us feel like we were his greatest achievement."</div></div>
          <div class="card"><div class="card-label c5">How do I want my spouse to remember me?</div><div class="card-value">"He was my safe place — steady, faithful, fully present even when building big things. He loved me the way he said he would — consistently, not just in words. He built a life I was proud of AND made me feel I was more important than all of it. He grew with me — we built everything together as a team."</div></div>
          <div class="card"><div class="card-label c5">What is my strongest strength?</div><div class="card-value">My <strong>discipline and follow-through when I am truly locked in on something</strong>. When I commit fully, I execute at a high level. The challenge is maintaining that lock-in state consistently — which is why systems matter more than motivation.</div></div>
          <div class="card"><div class="card-label c5">What is my most limiting weakness?</div><div class="card-value">Four simultaneous weaknesses: <strong>inconsistency</strong> (start strong, fade when slow), <strong>self-isolation</strong> (withdraw when I need people most), <strong>financial indiscipline</strong> (earn and it disappears), and <strong>spreading too thin</strong> (take everything, finish nothing fully). All four share the same root: lack of operating systems.</div></div>
          <div class="card"><div class="card-label c5">What must change in me for my future to change?</div><div class="card-value">My <strong>daily discipline</strong> (systems that run even when motivation is low), my <strong>self-image</strong> (I must see myself as the man I'm becoming, not who I've been), and my <strong>priorities</strong> (stop being busy, start being strategic).</div></div>
          </div>
        </div>
      </div>

      <!-- SECTION 4: Identity Profile -->
      <div class="phase">
        <div class="phase-hdr" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 4</div><div class="phase-title">Identity Profile — Strengths, Weaknesses, Style, Principles</div></div>
          <div class="phase-hdr-right"><span class="badge c4 bg4">Identity</span><span class="phase-chev">▼</span></div>
        </div>
        <div class="phase-body">
          <div style="margin-top:14px">
          <div class="grid-2">
            <div class="card"><div class="card-label c4">Strengths Profile</div><div class="card-value">Systems builder · Natural leader · Multi-domain thinker · Genuine people investor · Resilient under pressure · Creative across music + tech · Multi-instrumentalist · Strong communicator · Faith-grounded decision-maker</div></div>
            <div class="card"><div class="card-label c3">Weakness Profile</div><div class="card-value">Inconsistency under slow progress · Self-isolation when stressed · Financial leakage without structure · Over-commitment / inability to say no · Spreading talent across too many fronts simultaneously</div></div>
          </div>
          <div class="card"><div class="card-label c4">Personality / Leadership Style</div><div class="card-value"><strong>Visionary Builder</strong> — You see the future clearly and want to build it now. You lead by example and by presence. You are most effective when you have a clear goal, autonomy to execute, and a small trusted team. You struggle in highly bureaucratic or passive environments. You are a <strong>Strategic Innovator</strong> with a pastoral heart.</div></div>
          <div class="card"><div class="card-label c4">Guiding Life Principles</div>
            <div class="card-value" style="margin-top:8px">
              <div style="margin-bottom:6px">1. <strong>"God first — everything else is downstream."</strong></div>
              <div style="margin-bottom:6px">2. <strong>"Character is the foundation; achievement is the fruit."</strong></div>
              <div style="margin-bottom:6px">3. <strong>"Systems beat motivation every single time."</strong></div>
              <div style="margin-bottom:6px">4. <strong>"Family is not what I build after success — it is what I build success for."</strong></div>
              <div style="margin-bottom:6px">5. <strong>"Every Kenyan I lift gives me a reason to keep building."</strong></div>
              <div>6. <strong>"I refuse to choose one lane — excellence in all of them is the goal."</strong></div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- SECTION 6: Current Reality -->
      <div class="phase">
        <div class="phase-hdr" onclick="ph(this)">
          <div class="phase-hdr-left"><div class="phase-num">SEC 6</div><div class="phase-title">Where Am I Now — Current Reality (March 2026)</div></div>
          <div class="phase-hdr-right"><span class="badge c9 bg9">Reality Check</span><span class="phase-chev">▼</span></div>
        </div>
        <div class="phase-body">
          <div style="margin-top:14px">
          <div class="card"><div class="card-label c9">Who am I? (Character)</div><div class="card-value">A man of faith and integrity who is still figuring out his full potential. Age 28–29, based in Nairobi. Strong family relationships. Active in church and ministry. Multi-talented across tech and music. Deeply ambitious, visionary, and caring — held back primarily by inconsistent systems and financial position, not by capability or character.</div></div>
          <div class="card"><div class="card-label c9">What have I achieved? (Accomplishments)</div><div class="card-value">Built TAWI (audio enhancement and transcription app using Whisper API). Freelance full-stack development across JS/TS, Java, React, NestJS. Data pipeline development. Infrastructure experience with Docker, Kubernetes, Terraform, Grafana. Active in church ministry. Multi-instrumentalist (bass, piano, cello, ukulele, clarinet, vocals). Applied for MLE Bench contractor role at Turing.</div></div>
          <div class="card"><div class="card-label c9">What am I doing? (Occupation)</div><div class="card-value">Freelance software developer and contractor. Under KES 50k/month (~$380). Living with family (no rent). Actively learning and building toward senior-level tech work. Serving in church ministry. Practicing multiple instruments at beginner level.</div></div>
          <div class="card"><div class="card-label c9">What do I own? (Assets)</div><div class="card-value">Technical skills across full stack, infrastructure, and ML tooling. Musical instruments and beginner-level skill across 6 instruments. Strong reputation in church community. A clear vision and a structured plan. Health and youth — the most underrated assets at 28.</div></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  console.log('Identity tab initialized');
}
