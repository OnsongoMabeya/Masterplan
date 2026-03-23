import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  return renderDomainTab('identity', tasks, progress, {
    eyebrow: 'Foundation',
    title: 'Identity & Purpose',
    description: 'Core values, beliefs, and the foundational identity that guides all life decisions.',
    colorClass: 'c1'
  });
}

export function init() {}
