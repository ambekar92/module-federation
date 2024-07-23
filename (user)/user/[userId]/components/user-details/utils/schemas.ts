import { z } from 'zod'

export const FormSchema = z.object({
  title: z.string().min(1),
  role: z.string().min(0),
  status: z.string().min(0),
  address: z.string().min(1),
  address2: z.string().min(0),
  city: z.string().min(1),
  state: z.string().min(0),
  zip: z.string().min(5).max(5),
  phone: z.string().min(10).max(10),
})
