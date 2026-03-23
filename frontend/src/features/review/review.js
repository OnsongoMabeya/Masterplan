import { reviewsAPI } from '../../shared/api.js';
import { toast } from '../../shared/toast.js';

export function render(tasks, progress) {
  return `
    <div class="tab-content active">
      <div class="sec-eyebrow">Reflection</div>
      <h1 class="sec-title">Review & Reflection</h1>
      <p class="sec-desc">
        Regular reviews to assess progress, celebrate wins, and adjust course as needed.
      </p>

      <div class="callout bg4 bd4">
        <div class="callout-lbl c4">Review Framework</div>
        <div>
          Conduct regular reviews at different intervals: weekly, monthly, quarterly, and annually. 
          Each review helps you stay aligned with your vision and make necessary adjustments.
        </div>
      </div>

      <div class="sec-divider"></div>

      <div class="grid-2">
        <div class="card bg1">
          <div class="card-label c1">Weekly Review</div>
          <div class="card-value">
            Review the past week, plan the next week, and ensure daily habits are on track.
          </div>
        </div>
        <div class="card bg2">
          <div class="card-label c2">Monthly Review</div>
          <div class="card-value">
            Assess monthly goals, review domain progress, and adjust priorities.
          </div>
        </div>
        <div class="card bg3">
          <div class="card-label c3">Quarterly Review</div>
          <div class="card-value">
            Deep dive into each life domain, celebrate achievements, and set next quarter goals.
          </div>
        </div>
        <div class="card bg4">
          <div class="card-label c4">Annual Review</div>
          <div class="card-value">
            Comprehensive year-end reflection, major adjustments, and planning for the year ahead.
          </div>
        </div>
      </div>

      <div class="sec-divider"></div>

      <h2 class="sec-title" style="font-size: 24px; margin-bottom: 16px;">Key Review Questions</h2>
      
      <div class="phase">
        <div class="phase-hdr" onclick="window.togglePhase('review-questions')">
          <div class="phase-hdr-left">
            <div class="phase-title">Essential Questions for Each Review</div>
          </div>
          <div class="phase-hdr-right">
            <div class="phase-chev">▼</div>
          </div>
        </div>
        <div class="phase-body" id="review-questions">
          <div class="steps-lbl">Questions</div>
          <div style="padding: 12px 0;">
            <p style="margin-bottom: 12px;"><strong>What went well?</strong> — Celebrate wins and identify what's working.</p>
            <p style="margin-bottom: 12px;"><strong>What didn't go well?</strong> — Learn from setbacks and challenges.</p>
            <p style="margin-bottom: 12px;"><strong>What did I learn?</strong> — Extract insights and wisdom from experiences.</p>
            <p style="margin-bottom: 12px;"><strong>What will I do differently?</strong> — Apply learnings to future actions.</p>
            <p style="margin-bottom: 12px;"><strong>Am I still aligned with my vision?</strong> — Ensure actions match long-term goals.</p>
            <p><strong>What are my priorities for the next period?</strong> — Set clear focus areas.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
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
}
