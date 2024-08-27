import { z } from 'zod';

export const shouldIApply = z.object({
  ownOver50Percent: z.enum(['yes', 'no', '']).optional(),
  gender: z.enum(['male', 'female', '']),
  socialDisadvantage: z.enum(['yes', 'no', '']),
  USCitizen: z.enum(['yes', 'no', '']),
  veteran: z.enum(['yes', 'no', '']),
});

export type OwnershipFormType = z.infer<typeof shouldIApply>;
