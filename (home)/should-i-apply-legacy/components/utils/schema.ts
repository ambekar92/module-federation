import { z } from 'zod'

export const OwnershipSchema = z.object({
  gender: z.enum(['M', 'F', 'X']),
  socialDisadvantages: z.string().min(1, 'Social Disadvantage is required').array(),
  usCitizen: z.enum(['Yes', 'No']),
  veteran: z.enum(['Yes', 'No']),
  ownershipPercentage: z
    .number()
    .min(0.01, 'Select a percentage between 0.01 & 100')
    .max(100, 'Percentage cannot exceed 100'),
  businessLocation: z.string().min(1, 'Business Location is required'),
  disabledVeteran: z.enum(['Yes', 'No']).optional()
})

export const ShouldIApplySchema = z.object({
  revenue: z.enum(['Yes', 'No']),
  qualityGoods: z.enum(['Yes', 'No']),
  electronicPayments: z.enum(['Yes', 'No']),
  coverCosts: z.enum(['Yes', 'No']),
  usBusiness: z.enum(['Yes', 'No']),
  financialLimits: z.enum(['Yes', 'No']),
  financialStatements: z.enum(['Yes', 'No']),
  usCitizen: z.enum(['Yes', 'No']),
  disadvantagedGroup: z.enum(['Yes', 'No'])
})
