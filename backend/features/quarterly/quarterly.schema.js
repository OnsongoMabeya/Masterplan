import { z } from 'zod';

export const createGoalSchema = z.object({
  quarter_key: z.string().regex(/^Y\d+-Q[1-4]$/),
  domain: z.string().min(1).max(100),
  goal_text: z.string().min(1).max(500)
});

export const updateGoalAchievedSchema = z.object({
  is_achieved: z.boolean()
});
