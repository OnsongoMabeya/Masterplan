import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  return renderDomainTab('community', tasks, progress, {
    eyebrow: 'Service',
    title: 'Community & Service',
    description: 'Giving back, community involvement, and making a positive impact on society.',
    colorClass: 'c9'
  });
}

export function init() {}
