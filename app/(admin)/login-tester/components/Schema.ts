import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Required Field')
    .max(100, 'Email must be less than 100 characters'),
  password: z.string()
    .min(10, 'Password must be a minimum of 10 characters')
    .regex(/[!@#$%^&*]/, 'Password must contain a special character')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter'),
  repassword: z.string().min(1, 'Required Field')
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;
