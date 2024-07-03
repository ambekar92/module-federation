import { z } from 'zod'
import { DelegateFormSchema } from './schemas'

export type ValidFieldNames = 'fistName' | 'lastName' | 'email'

export type FormDelegateType = {
  firstName: string
  lastName: string
  email: string
}

export type DelegatesResponse = {
	id: number,
	application: number,
	application_role: number,
	user: number,
	entity: number,
	email: string,
	first_name: string,
	last_name: string,
	invitation_code: string,
	invitation_status: string,
	accepted_at: string,
	active: boolean
}

export type DelegateType = FormDelegateType & { id?: number }

export type DelegateFormInputType = z.infer<typeof DelegateFormSchema>
