import { z } from 'zod'

export const FormSchema = z.object({
  role: z.string().min(0),
  status: z.string().min(0)
})
