import { z } from 'zod'
import { FormSchema } from './schemas'

export type FormData = {
  title: string
  role: string
  status: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  phone: string
}

export type ValidFieldNames =
  | 'title'
  | 'role'
  | 'status'
  | 'address'
  | 'address2'
  | 'city'
  | 'state'
  | 'zip'
  | 'phone'

export type UserProfileType = {
  last_name: string
  prbac_role: any
  is_active: any
  date_joined: string
  first_name: string
  last_login: string
  lastName: string
  firstName: string
  userId: string
  name: string
  role: string
  status: string
  lastLogin: string

  email: string
}

export type UserFormInputs = z.infer<typeof FormSchema>
