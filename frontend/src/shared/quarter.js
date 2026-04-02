/**
 * Client-side quarter helper utilities
 * Matches backend quarter.utils.js functionality
 */

const START_DATE = new Date('2026-01-01');

/**
 * Get current quarter tag (e.g., 'Y1-Q1', 'Y2-Q3')
 */
export function getCurrentQuarter() {
  const now = new Date();
  const diffMs = now - START_DATE;
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
  
  const year = Math.floor(diffMonths / 12) + 1;
  const quarter = Math.floor((diffMonths % 12) / 3) + 1;
  
  return `Y${year}-Q${quarter}`;
}

/**
 * Get all quarters for a given year
 */
export function getQuartersForYear(year) {
  return [
    `Y${year}-Q1`,
    `Y${year}-Q2`,
    `Y${year}-Q3`,
    `Y${year}-Q4`
  ];
}

/**
 * Parse quarter tag into year and quarter number
 */
export function parseQuarter(quarterTag) {
  const match = quarterTag.match(/Y(\d+)-Q(\d+)/);
  if (!match) return null;
  
  return {
    year: parseInt(match[1]),
    quarter: parseInt(match[2]),
    tag: quarterTag
  };
}

/**
 * Check if a quarter is in the past
 */
export function isQuarterPast(quarterTag) {
  const current = parseQuarter(getCurrentQuarter());
  const target = parseQuarter(quarterTag);
  
  if (!current || !target) return false;
  
  if (target.year < current.year) return true;
  if (target.year === current.year && target.quarter < current.quarter) return true;
  
  return false;
}

/**
 * Check if a quarter is current
 */
export function isQuarterCurrent(quarterTag) {
  return quarterTag === getCurrentQuarter();
}

/**
 * Check if a quarter is in the future
 */
export function isQuarterFuture(quarterTag) {
  return !isQuarterPast(quarterTag) && !isQuarterCurrent(quarterTag);
}

/**
 * Get quarter display name
 */
export function getQuarterDisplayName(quarterTag) {
  const parsed = parseQuarter(quarterTag);
  if (!parsed) return quarterTag;
  
  const quarterNames = ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Oct-Dec)'];
  return `Year ${parsed.year} - ${quarterNames[parsed.quarter - 1]}`;
}

/**
 * Get all quarters from year 1 to specified year
 */
export function getAllQuartersUpTo(year) {
  const quarters = [];
  for (let y = 1; y <= year; y++) {
    quarters.push(...getQuartersForYear(y));
  }
  return quarters;
}

/**
 * Get quarter status (past, current, future)
 */
export function getQuarterStatus(quarterTag) {
  if (isQuarterCurrent(quarterTag)) return 'current';
  if (isQuarterPast(quarterTag)) return 'past';
  return 'future';
}

/**
 * Get progress through current quarter (0-1)
 */
export function getQuarterProgress() {
  const now = new Date();
  const currentQuarter = getCurrentQuarter();
  const parsed = parseQuarter(currentQuarter);
  
  if (!parsed) return 0;
  
  const quarterStartMonth = (parsed.quarter - 1) * 3;
  const yearStartDate = new Date(START_DATE);
  yearStartDate.setMonth(yearStartDate.getMonth() + (parsed.year - 1) * 12 + quarterStartMonth);
  
  const quarterEndDate = new Date(yearStartDate);
  quarterEndDate.setMonth(quarterEndDate.getMonth() + 3);
  
  const totalMs = quarterEndDate - yearStartDate;
  const elapsedMs = now - yearStartDate;
  
  return Math.min(1, Math.max(0, elapsedMs / totalMs));
}

/**
 * Get days remaining in current quarter
 */
export function getDaysRemainingInQuarter() {
  const now = new Date();
  const currentQuarter = getCurrentQuarter();
  const parsed = parseQuarter(currentQuarter);
  
  if (!parsed) return 0;
  
  const quarterStartMonth = (parsed.quarter - 1) * 3;
  const yearStartDate = new Date(START_DATE);
  yearStartDate.setMonth(yearStartDate.getMonth() + (parsed.year - 1) * 12 + quarterStartMonth);
  
  const quarterEndDate = new Date(yearStartDate);
  quarterEndDate.setMonth(quarterEndDate.getMonth() + 3);
  
  const diffMs = quarterEndDate - now;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
