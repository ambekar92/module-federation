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
  userId: string
  name: string
  title: string
  role: string
  status: string
  created: string
  lastLogin: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  email: string
  phone: string
}

export type UserFormInputs = z.infer<typeof FormSchema>
