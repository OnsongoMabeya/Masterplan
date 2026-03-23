import { z } from 'zod';

export const setupPinSchema = z.object({
  pin: z.string().length(4).regex(/^\d{4}$/, 'PIN must be 4 digits')
});

export const loginSchema = z.object({
  pin: z.string().length(4).regex(/^\d{4}$/, 'PIN must be 4 digits')
});

export const changePinSchema = z.object({
  currentPin: z.string().length(4).regex(/^\d{4}$/, 'Current PIN must be 4 digits'),
  newPin: z.string().length(4).regex(/^\d{4}$/, 'New PIN must be 4 digits')
});
