import { z } from "zod";

export const eligibilitySchema = z.object({
    ownBusinessInUS: z.enum(['yes', 'no', '']),
    businessLocation: z.string(),
    employeesResideInHubZone: z.enum(['yes', 'no', '']),
    businessRegisteredInSAM: z.enum(['yes', 'no', '']),
    underFinancialLimits: z.enum(['yes', 'no', '']),
    provideAnnualFinancialStatement: z.enum(['yes', 'no', '']),
    suspended: z.enum(['yes', 'no', '']),
})

export type EligibilityFormType = z.infer<typeof eligibilitySchema>;