import { z } from 'zod'

export const defaultValues: EntityProfileInfoType = {
  prefixes: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffixes: '',
  countrycode: '',
  email: '',
  phoneNumber: '',
  addressOne: '',
  addressTwo: '',
  state: '',
  city: '',
  zipCode: '',
}

export const EntityProfileSchema = z.object({
  prefixes: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  suffixes: z.string().optional(),

  countrycode: z.string().optional(),
  addressOne: z
    .string()
    .max(200, { message: 'Address line 1 cannot exceed 200 characters' })
    .regex(/^[a-zA-Z0-9\s.,'-]*$/, {
      message: 'Invalid characters in address line 1',
    }),
  addressTwo: z
    .string()
    .max(100, { message: 'Address line 2 cannot exceed 100 characters' })
    .regex(/^[a-zA-Z0-9\s.,'-]*$/, {
      message: 'Invalid characters in address line 2',
    })
    .optional(),
  city: z
    .string()
    .min(1, { message: 'City is required' })
    .max(50, { message: 'City cannot exceed 50 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'Invalid characters in city name' }),
  state: z.string().refine((val) => !!val, { message: 'state is required' }),
  email: z.string().min(1, 'Email is required').email(),
  zipCode: z
    .string()
    .min(5, { message: 'ZIP code must be at least 5 digits' })
    .max(10, { message: 'ZIP code cannot exceed 10 characters' })
    .regex(/^\d{5}(-\d{4})?$/, {
      message: 'Invalid ZIP code format (##### or #####-####)',
    }),
  phoneNumber: z
    .string()
    .refine((value) => /^\d{10}$/.test(value), {
      message:
        'Phone number must be exactly 10 digits and contain only numbers.',
    })
    .transform((value) => value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')),
})

export type EntityProfileInfoType = z.infer<typeof EntityProfileSchema>
export interface IPerson {
  name: string
  email: string
  firstLineAddress: string
  secondLineAddress: string
  phoneNumber: string
}
export interface IPersonInfo {
  name: string
  email: string
  firstLineAddress: string
  secondLineAddress: string
  phoneNumber: string
}
export enum PrefixesTypes {
  Mr = 'Mr',
  Mrs = 'Mrs',
  Ms = 'Ms',
  Dr = 'Dr',
}
export enum SuffixesTypes {
  Jr = 'Jr',
  Sr = 'Sr',
  I = 'I',
  II = 'II',
}

export enum StatesTypes {
  Alabama = 'Alabama',
  Alaska = 'Alaska',
  Arizona = 'Arizona',
  Arkansas = 'Arkansas',
  California = 'California',
  Colorado = 'Colorado',
  Connecticut = 'Connecticut',
  Delaware = 'Delaware',
  Florida = 'Florida',
  Georgia = 'Georgia',
  Hawaii = 'Hawaii',
  Idaho = 'Idaho',
}
