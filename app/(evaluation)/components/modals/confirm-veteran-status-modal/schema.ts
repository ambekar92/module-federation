import { z } from 'zod';

export enum ConfirmVA {
    confirmed = 'confirmed',
    notConfirmed = 'not confirmed'

}

export const schema = z.object({
  veteran_status: z.nativeEnum(ConfirmVA).optional().refine(val => val !== undefined, 'Please select a veteran status'),
  vba_feedback: z.string().min(1, 'Please provide more information'),
})

export type ConfirmVeteranStatusType = z.infer<typeof schema>;
