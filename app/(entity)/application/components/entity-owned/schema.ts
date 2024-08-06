import { z } from 'zod'

export const schema = z.object({
  entityType: z
    .string()
    .nullable()
    .refine((val) => !!val, { message: 'Controlling Entity Type is required' }),
  entityName: z.string().min(1, 'Entity name is required'),
  prefix: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  suffix: z.string().optional(),
  contactInfo: z.object({
    email: z.string().min(1, 'Email is required').email(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
  }),
  contactLocation: z.object({
    mailingAddress: z.string().min(1, 'Street Address is required'),
    mailingAddress2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State, territory or military post is required'),
    zip: z.string().min(1, 'Zip is required.'),
    urbanization: z.string().optional(),
  }),
})

export type EntityFormType = z.infer<typeof schema>
