import { z } from 'zod';
import { YesNo } from '../shared/types';

export const schema = z.object({
  prefix: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  suffix: z.string().optional(),
  ownershipPercent: z.string().nullable().refine(v => !!v, {message: 'This field is required'}).refine(v => Number(v) >=0 && Number(v) <= 100, { message: 'Ownership percentage must be between 0 and 100' }),
  USCitizen: z.any().nullable().refine(v => v !== null, { message: 'This field is required' }),
  goneByAnotherName: z.nativeEnum(YesNo).nullable().refine(val => val !== null, { message: 'This field is required' }).default(null),
  SSN: z.string().nullable().refine(val => !!val, { message: 'This field is required' }),
  isVeteran: z.string().nullable().refine(val => !!val, { message: 'Veteran status is required' }),
  maritalStatus: z.string().nullable().refine(val => !!val, { message: 'Marital status is required' }),
  gender: z.string().nullable().refine(v => v!==null, {message: 'This field is required'}),
  isSpouseAnOwner: z.nativeEnum(YesNo).nullable().refine(val => val !== null, { message: 'This field is required' }),
  contactInfo: z.object({
    email: z.string().min(1, 'Email is required').email(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
  }),
  socialDisadvantages: z.array(z.string()).nullable().refine(v => v && !!v.length, { message: 'This field is required' }).default([]),
  ownerType: z.literal('individual').default('individual'),
});

export type IndividualFormType = z.infer<typeof schema>;
