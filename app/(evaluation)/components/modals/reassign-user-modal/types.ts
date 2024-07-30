import { z } from "zod";

export enum ReassignType {
    REASSIGN_SCREENER,
    REASSIGN_ANALYST,
}

export const schema = z.object({
    user: z.any().refine(val => !!val, 'Please select a user'),
    comments: z.string().min(1, 'Please provide a reason for reassigning the user'),
})


export type ReassignUserType = z.infer<typeof schema>;
