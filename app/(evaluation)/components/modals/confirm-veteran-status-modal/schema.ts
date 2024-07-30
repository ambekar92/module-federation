import { z } from "zod";

export const schema = z.object({
    isVeteran: z.string().nullable().refine(val => val !== null, 'Please confirm the veteran status'),
    comments: z.string().min(1, 'Please provide more information'),
})

export type ConfirmVeteranStatusType = z.infer<typeof schema>;