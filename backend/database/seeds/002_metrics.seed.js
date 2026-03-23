export const seed = async (knex) => {
  await knex('metrics').del();
  await knex('metric_history').del();
  
  const metrics = [
    // HEALTH METRICS (7)
    { metric_key: 'weight_kg', category: 'health', label: 'Weight Lost', unit: 'kg', current_value: 0, target_value: -30 },
    { metric_key: 'waist_cm', category: 'health', label: 'Waist Measurement', unit: 'cm', current_value: 0, target_value: 85 },
    { metric_key: 'workout_streak', category: 'health', label: 'Workout Streak', unit: 'days', current_value: 0, target_value: 90 },
    { metric_key: 'sleep_hours', category: 'health', label: 'Average Sleep', unit: 'hours', current_value: 0, target_value: 7.5 },
    { metric_key: 'water_intake', category: 'health', label: 'Daily Water Intake', unit: 'liters', current_value: 0, target_value: 2 },
    { metric_key: 'running_distance', category: 'health', label: 'Weekly Running Distance', unit: 'km', current_value: 0, target_value: 15 },
    { metric_key: 'races_completed', category: 'health', label: 'Races Completed', unit: 'count', current_value: 0, target_value: 3 },
    
    // FINANCE METRICS (7)
    { metric_key: 'emergency_fund', category: 'finance', label: 'Emergency Fund', unit: 'KES', current_value: 0, target_value: 50000 },
    { metric_key: 'monthly_income', category: 'finance', label: 'Monthly Income', unit: 'KES', current_value: 0, target_value: 200000 },
    { metric_key: 'income_streams', category: 'finance', label: 'Income Streams', unit: 'count', current_value: 1, target_value: 7 },
    { metric_key: 'debt_remaining', category: 'finance', label: 'Debt Remaining', unit: 'KES', current_value: 0, target_value: 0 },
    { metric_key: 'savings_rate', category: 'finance', label: 'Savings Rate', unit: '%', current_value: 0, target_value: 20 },
    { metric_key: 'net_worth', category: 'finance', label: 'Net Worth', unit: 'KES', current_value: 0, target_value: 1000000 },
    { metric_key: 'investment_portfolio', category: 'finance', label: 'Investment Portfolio', unit: 'KES', current_value: 0, target_value: 500000 },
    
    // CAREER METRICS (5)
    { metric_key: 'freelance_rate', category: 'career', label: 'Freelance Rate', unit: '$/hr', current_value: 0, target_value: 60 },
    { metric_key: 'certifications', category: 'career', label: 'Certifications Earned', unit: 'count', current_value: 0, target_value: 6 },
    { metric_key: 'active_contracts', category: 'career', label: 'Active Contracts', unit: 'count', current_value: 0, target_value: 3 },
    { metric_key: 'portfolio_projects', category: 'career', label: 'Portfolio Projects', unit: 'count', current_value: 0, target_value: 10 },
    { metric_key: 'tech_articles', category: 'career', label: 'Technical Articles Published', unit: 'count', current_value: 0, target_value: 50 },
    
    // HABITS METRICS (7)
    { metric_key: 'morning_routine_streak', category: 'habits', label: 'Morning Routine Streak', unit: 'days', current_value: 0, target_value: 365 },
    { metric_key: 'devotion_streak', category: 'habits', label: 'Devotion Streak', unit: 'days', current_value: 0, target_value: 365 },
    { metric_key: 'weekly_reviews', category: 'habits', label: 'Weekly Reviews Completed', unit: 'count', current_value: 0, target_value: 52 },
    { metric_key: 'books_read', category: 'habits', label: 'Books Read', unit: 'count', current_value: 0, target_value: 24 },
    { metric_key: 'screen_free_hours', category: 'habits', label: 'Daily Screen-Free Hours', unit: 'hours', current_value: 0, target_value: 3 },
    { metric_key: 'mentees_active', category: 'habits', label: 'Active Mentees', unit: 'count', current_value: 0, target_value: 2 },
    { metric_key: 'music_practice_hours', category: 'habits', label: 'Weekly Music Practice', unit: 'hours', current_value: 0, target_value: 7 }
  ];
  
  await knex('metrics').insert(metrics);
};
