import { z } from 'zod';
import { YesNo } from '../../application/components/control-and-operations/constants-types';
import { Step } from './types';

export const newControllingEntitySchema = z.object({
  controllingEntityInfo: z.object({
    type: z.string().min(1, { message: 'Please enter a valid entity type' }),
    name: z.string().min(1, { message: 'Please enter a valid entity name' }),
  }),

  contactInfo: z.object({
    prefix: z.string().min(1, { message: 'Please select a prefix' }),
    firstName: z.string().min(1, { message: 'Please enter a valid first name' }),
    middleName: z.string().min(1, { message: 'Please enter a valid middle name' }),
    lastName: z.string().min(1, { message: 'Please enter a valid last name' }),
    suffix: z.string().optional(),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().min(1, { message: 'Please enter a valid phone number' }),
  }),

  location: z.object({
    country: z.string().min(1, { message: 'Please select a country' }),
    street: z.string().min(1, { message: 'Please enter a valid street address' }),
    county: z.string().min(1, { message: 'Please enter a valid county' }),
    city: z.string().min(1, { message: 'Please enter a valid city' }),
    state: z.string().min(1, { message: 'Please select a state' }),
    zip: z.string().min(1, { message: 'Please enter a valid zip code' }),

  }),

})

export type NewControllingEntity = z.infer<typeof newControllingEntitySchema>;

export const defaultValues: NewControllingEntity = {
  controllingEntityInfo: {
    type: '',
    name: ''
  },
  contactInfo: {
    prefix: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    email: '',
    phone: ''
  },
  location: {
    city: '',
    state: '',
    zip: '',
    country: '',
    street: '',
    county: ''
  },
}

export const entitySchema = z.object({
  isEntityOwned: z.nativeEnum(YesNo).nullable(),
  controllingEntityType: z.string(),
  entity: z.string(),
  isConnectionVerified: z.nativeEnum(YesNo).nullable(),
  step: z.nativeEnum(Step)
})

export type EntityForm = z.infer<typeof entitySchema>
