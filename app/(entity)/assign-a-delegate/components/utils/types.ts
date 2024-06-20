import { z } from 'zod'
import { DelegateFormSchema } from './schemas'

export type ValidFieldNames = 'fistName' | 'lastName' | 'email'

export type FormDelegateType = {
  firstName: string
  lastName: string
  email: string
}

export type DelegateType = FormDelegateType & { id?: number }

export type DelegateFormInputType = z.infer<typeof DelegateFormSchema>
