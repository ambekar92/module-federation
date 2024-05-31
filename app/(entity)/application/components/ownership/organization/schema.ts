import { z } from 'zod';
import { YesNo } from '../shared/types';

export const schema = z.object({
  orgName: z.string().min(1, 'Organization name is required'),
  ownershipPercent: z.string().refine(v => !!v, {message: 'This field is required'}).refine(v => Number(v) >=0 && Number(v) <= 100, { message: 'Ownership percentage must be between 0 and 100' }),
  goneByAnotherName: z.nativeEnum(YesNo).nullable().refine(val => val !== null, { message: 'This field is required' }).default(null),
  contactInfo: z.object({
    email: z.string().min(1, 'Email is required').email(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
  }),
  socialDisadvantages: z.array(z.string()).nullable().refine(val => val !== null && !!val.length, { message: 'This field is required' }),
  ownerType: z.literal('organization').default('organization'),
});

export type OrganizationFormType = z.infer<typeof schema>;
