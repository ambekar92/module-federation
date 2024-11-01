import { z } from 'zod';

export enum ReassignType {
    REASSIGN_SCREENER,
    REASSIGN_ANALYST,
    REASSIGN_APPROVER,
    REASSIGN_EXPERT,
}

export const schema = z.object({
  user: z.any().refine(val => !!val, 'Please select a user'),
  comments: z.string().min(1, 'Please provide a reason for reassigning the user'),
  selectedRole: z.string().min(1, 'Please select a role'),
})

export type ReassignUserType = z.infer<typeof schema>;
