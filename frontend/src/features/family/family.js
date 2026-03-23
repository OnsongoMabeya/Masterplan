import { renderDomainTab } from '../../shared/domainRenderer.js';

export function render(tasks, progress) {
  return renderDomainTab('family', tasks, progress, {
    eyebrow: 'Relationships',
    title: 'Family & Legacy',
    description: 'Building strong family bonds and creating a lasting legacy for future generations.',
    colorClass: 'c6'
  });
}

export function init() {}
