import { z } from 'zod';

export const createMetricSchema = z.object({
  metric_key: z.string().min(1).max(100),
  category: z.enum(['health', 'finance', 'career', 'habits']),
  label: z.string().min(1).max(200),
  unit: z.string().min(1).max(50),
  current_value: z.number().optional().default(0),
  target_value: z.number()
});

export const updateMetricValueSchema = z.object({
  value: z.number(),
  note: z.string().max(500).optional()
});
