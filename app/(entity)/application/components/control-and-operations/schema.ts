import { z } from 'zod';
import { Prefix, PrincipalType, Suffix, YesNo } from './constants-types';

export const schema = z.object({
  prefix: z.nativeEnum(Prefix).optional(),
  firstName: z.string().min(1, 'First name is required').default(''),
  middleName: z.string().optional().default(''),
  lastName: z.string().min(1, 'Last name is required').default(''),
  suffix: z.nativeEnum(Suffix).optional(),
  emailAddress: z.string().email('Invalid email address').default(''),
  position: z.string().min(1, 'Title is required').default(''),
  principalType: z.nativeEnum(PrincipalType).nullable().refine((value) => !!value, {
    message: 'Principal type is required',
  }),
  licenseHolder: z.nativeEnum(YesNo).nullable().default(YesNo.No).refine(val => !!val, {message: 'This is a required field'}),
})

export type Operator = z.infer<typeof schema>;
