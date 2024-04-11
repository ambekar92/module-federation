// ClaimBusinessFormTypes.ts

import { FieldError, UseFormRegister, Controller } from 'react-hook-form'
import { z, ZodType } from 'zod'

// Unigue Entity ID (UEI) must contain only alphanumeric characters and be 12 characters long.
const ueiValidation = new RegExp(/^[a-zA-Z0-9]{12}$/)

// Bank Account Number must contain only numeric digits ranging from 5-17 digits in length.
const bankAccountValidation = new RegExp(/^[0-9]{5,17}$/)

// Cage Code must contain only numberic digits. Currently no limit on length.
// Need to follow with Back End Dev's to get more contraints.
const cageCodeValidation = new RegExp(/^[0-9]+$/)

// TIN must contain only numeric digits and be 9 digits length.
const tinValidation = new RegExp(/^[0-9]{9}$/)

export const BusinessSchema: ZodType<FormData> = z.object({
   uei: z
      .string({
         required_error: 'required field',
         invalid_type_error: 'Invalid Unique Entity ID'
      })
      .regex(ueiValidation, {
         message:
            'Invalid Entry, Unique Entity ID (UEI) must contain only alphanumeric chararcters and be 12 characters long.'
      }),
   cageCode: z
      .string({
         required_error: 'required field',
         invalid_type_error: 'Invalid Cage Code'
      })
      .regex(cageCodeValidation, {
         message: 'Invalid Entry, Cage Code must contain only numeric digits.'
      }),
   bankAccountNumber: z
      .string({
         required_error: 'required field',
         invalid_type_error: 'Invalid Bank Account Number'
      })
      .regex(bankAccountValidation, {
         message:
            'Invalid Entry, Bank Account Number must contain only numeric digits. A minimum of 5, and maximum of 17 digits is allowed.'
      }),
   tin: z
      .string({
         required_error: 'required field',
         invalid_type_error: 'Invalid Taxpayer Identification Number'
      })
      .regex(tinValidation, {
         message: 'Invalid Entry, TIN must contain only numeric digits and must be 9 digits in length.'
      }),
   serverError: z.void()
})

export type FormData = {
   uei: string
   cageCode: string
   bankAccountNumber: string
   tin: string
}

export type FormFieldProps = {
   className?: string
   id: string
   type: string
   placeholder: string
   name: ValidFieldNames
   register: UseFormRegister<FormData>
   error: FieldError | undefined
   valueAsNumber?: boolean
   required?: boolean
}

export type ValidFieldNames = 'uei' | 'cageCode' | 'bankAccountNumber' | 'tin'
