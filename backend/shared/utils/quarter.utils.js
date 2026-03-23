const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Calculate the current quarter based on plan start date and reference date
 * @param {Date|string} planStartDate - The date the plan officially began
 * @param {Date|string} referenceDate - The date to calculate quarter for (defaults to today)
 * @returns {Object} { calQuarter, planQuarter }
 */
export function getCurrentQuarter(planStartDate, referenceDate = new Date()) {
  const start = new Date(planStartDate);
  const ref = new Date(referenceDate);
  
  // Calendar quarter (standard Q1-Q4)
  const calMonth = ref.getMonth();
  const calQ = Math.floor(calMonth / 3) + 1;
  const calQuarter = {
    tag: `${ref.getFullYear()}-Q${calQ}`,
    label: `Q${calQ} ${ref.getFullYear()}`,
    displayRange: `${MONTHS[calQ * 3 - 3]} – ${MONTHS[calQ * 3 - 1]} ${ref.getFullYear()}`
  };
  
  // Plan quarter (relative to plan start date)
  const daysSinceStart = Math.floor((ref - start) / (1000 * 60 * 60 * 24));
  const monthsSinceStart = Math.floor(daysSinceStart / 30.44);
  const planQuarterIndex = Math.floor(monthsSinceStart / 3) + 1;
  
  const planYear = Math.floor((planQuarterIndex - 1) / 4) + 1;
  const planQ = ((planQuarterIndex - 1) % 4) + 1;
  
  const planQuarter = {
    tag: `Y${planYear}-Q${planQ}`,
    label: `Quarter ${planQ} of Year ${planYear}`,
    displayRange: `Month ${(planQuarterIndex - 1) * 3 + 1} – Month ${planQuarterIndex * 3} of your plan`,
    quarterIndex: planQuarterIndex,
    planYear,
    planQ
  };
  
  return { calQuarter, planQuarter };
}

/**
 * Get all plan quarters for the entire plan duration
 * @param {Date|string} planStartDate - The date the plan officially began
 * @param {number} totalYears - Total years of the plan (default 5)
 * @returns {Array} Array of quarter objects
 */
export function getAllPlanQuarters(planStartDate, totalYears = 5) {
  const quarters = [];
  const start = new Date(planStartDate);
  
  for (let yi = 1; yi <= totalYears; yi++) {
    for (let qi = 1; qi <= 4; qi++) {
      const monthStart = ((yi - 1) * 12) + ((qi - 1) * 3);
      const quarterStart = new Date(start);
      quarterStart.setMonth(quarterStart.getMonth() + monthStart);
      
      const quarterEnd = new Date(quarterStart);
      quarterEnd.setMonth(quarterEnd.getMonth() + 3);
      quarterEnd.setDate(0);
      
      quarters.push({
        tag: `Y${yi}-Q${qi}`,
        label: `Q${qi} · Year ${yi}`,
        displayRange: `${MONTHS[quarterStart.getMonth()]} ${quarterStart.getFullYear()} – ${MONTHS[quarterEnd.getMonth()]} ${quarterEnd.getFullYear()}`,
        planYear: yi,
        planQ: qi,
        quarterIndex: (yi - 1) * 4 + qi,
        startDate: quarterStart.toISOString().split('T')[0],
        endDate: quarterEnd.toISOString().split('T')[0]
      });
    }
  }
  
  return quarters;
}

/**
 * Get a specific quarter by its tag
 * @param {Date|string} planStartDate - The date the plan officially began
 * @param {string} quarterTag - Quarter tag (e.g., "Y1-Q1", "Y2-Q3")
 * @returns {Object|null} Quarter object or null if not found
 */
export function getQuarterByTag(planStartDate, quarterTag) {
  const allQuarters = getAllPlanQuarters(planStartDate);
  return allQuarters.find(q => q.tag === quarterTag) || null;
}
