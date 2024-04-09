import { FieldError, UseFormRegister, Controller } from 'react-hook-form'
import { z, ZodType } from 'zod'

// Signature must contain only non special characters.
const agreementSignatureValidation = new RegExp(
  /(^[a-zA-Z][a-zA-Z\s]{0,25}[a-zA-Z]*$)/,
)

// Job Title must contain only non special characters.
const jobTitleValidation = new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,25}[a-zA-Z\d]*$)/)

export const AgreementSchema = z.object({
  agreementSignature: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Invalid Signature',
    })
    .regex(agreementSignatureValidation, {
      message:
        'Invalid Entry, Signature must contain only non special characters.',
    })
    .default(''),
  jobTitle: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Invalid Job Title',
    })
    .regex(jobTitleValidation, {
      message:
        'Invalid Entry, Job Title must contain only non special characters.',
    })
    .default(''),
  confirmCheckbox: z
    .boolean()
    .refine((value) => value === true, { message: 'required field' })
    .default(false),
  serverError: z.void(),
})

export type FormData = {
  agreementSignature: string
  jobTitle: string
  confirmCheckbox: boolean
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

export type ValidFieldNames =
  | 'agreementSignature'
  | 'jobTitle'
  | 'confirmCheckbox'
