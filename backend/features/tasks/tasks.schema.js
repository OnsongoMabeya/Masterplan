import { z } from 'zod';

export const toggleTaskSchema = z.object({
  task_key: z.string().min(1)
});

export const searchTasksSchema = z.object({
  domain: z.string().optional(),
  query: z.string().optional(),
  is_done: z.boolean().optional()
});
