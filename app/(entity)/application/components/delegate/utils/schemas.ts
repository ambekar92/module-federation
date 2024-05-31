import { z } from 'zod'

export const DelegateFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Required Field')
    .max(100, 'Email must be less than 100 characters'),
})
