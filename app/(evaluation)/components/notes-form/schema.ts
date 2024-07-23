import { z } from "zod";

export const schema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    description: z.string().min(1, 'Description is required')
})

export type NoteType = z.infer<typeof schema>;