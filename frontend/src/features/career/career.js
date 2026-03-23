import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  return renderDomainTab('career', tasks, progress, {
    eyebrow: 'Professional',
    title: 'Career & Impact',
    description: 'Professional development, career milestones, and creating meaningful impact through work.',
    colorClass: 'c3'
  });
}

export function init() {}
