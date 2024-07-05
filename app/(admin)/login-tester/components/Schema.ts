import { z } from 'zod'

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Required Field')
    .max(100, 'Email must be less than 100 characters'),
  password: z.string(),
  // may want to bring back validations later
  // .min(10, 'Password must be a minimum of 10 characters')
  // .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  // .regex(/[a-z]/, 'Password must contain a lowercase letter'),
  repassword: z.string().min(1, 'Required Field'),
})

export type SignInFormData = z.infer<typeof SignInFormSchema>
