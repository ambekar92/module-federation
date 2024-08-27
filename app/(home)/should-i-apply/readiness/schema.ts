import { z } from 'zod';

export const readinessSchema = z.object({
  isGeneratingRevenue: z.enum(['yes', 'no', '']),
  recordOfQualityGoods: z.enum(['yes', 'no', '']),
  electronicPayments: z.enum(['yes', 'no', '']),
  coverCost: z.enum(['yes', 'no', '']),
})

export type ReadinessFormType = z.infer<typeof readinessSchema>;
