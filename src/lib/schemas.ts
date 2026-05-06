import { z } from 'zod';

const email = z.string().min(1, 'Email is required').email('Enter a valid email');
const password = z.string().min(6, 'Password must be at least 6 characters');

export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z
  .object({
    name:            z.string().min(2, 'Name must be at least 2 characters'),
    email,
    password,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreed:          z.literal(true, { message: 'You must agree to the terms' }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const orderTrackingSchema = z.object({
  orderId: z
    .string()
    .min(1, 'Order ID is required')
    .regex(/^PALS-/i, 'Order ID should start with PALS- (e.g. PALS-2025-00123)'),
});

export const newsletterSchema = z.object({
  email,
});

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email,
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type LoginValues        = z.infer<typeof loginSchema>;
export type RegisterValues     = z.infer<typeof registerSchema>;
export type OrderTrackingValues= z.infer<typeof orderTrackingSchema>;
export type NewsletterValues   = z.infer<typeof newsletterSchema>;
export type ContactValues      = z.infer<typeof contactSchema>;
