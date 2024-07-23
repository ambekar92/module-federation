import { z } from "zod";

export const matchSchema = z.object({
    naics_code: z.string().min(1, 'This field is required').default(''),
    results: z.array(z.any()).optional()
})

export type MatchFormType = z.infer<typeof matchSchema>;