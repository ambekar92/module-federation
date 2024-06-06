import { ZodType, z } from 'zod'

// Unigue Entity ID (UEI) must contain only alphanumeric characters and be 12 characters long.
const ueiValidation = new RegExp(/^[a-zA-Z0-9]{12}$/)

// Bank Account Number must contain only numeric digits ranging from 5-17 digits in length.
const bankAccountValidation = new RegExp(/^[0-9]{5,17}$/)

// Cage Code must contain only alphanumberic digits and be 5 characters long.
const cageCodeValidation = new RegExp(/^[a-zA-Z0-9]{5}$/)

// TIN must contain only numeric digits and be 9 digits length.
const tinValidation = new RegExp(/^[0-9]{9}$/)

// Invitation Code must contain only numeric digits and be 12 digits length.
const invitationCodeValidation = new RegExp(/^[0-9]{12}$/)

export type FormData = {
  uei: string
  cageCode: string
  bankAccountNumber: string
  tin: string
}

export const BusinessSchema: ZodType<FormData> = z.object({
  uei: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Invalid Unique Entity ID',
    })
    .regex(ueiValidation, {
      message:
        'Invalid Entry, Unique Entity ID (UEI) must contain only alphanumeric chararcters and be 12 characters long.',
    }),
  cageCode: z
    .string()
    .min(0)
    .regex(cageCodeValidation, {
      message:
        'Invalid Entry, CAGE Code must contain only alphanumeric characters and be 5 characters long.',
    })
    .or(z.literal('')),
  bankAccountNumber: z.string().min(1).max(30),
  tin: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Invalid Taxpayer Identification Number',
    })
    .regex(tinValidation, {
      message:
        'Invalid Entry, TIN must contain only numeric digits and must be 9 digits in length.',
    }),
  serverError: z.void(),
})

export type ValidateFormData = {
  businessType: string
  entityOwned: boolean
}

export const ValidateFormSchema: ZodType<ValidateFormData> = z.object({
  businessType: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Invalid Business Type',
    })
    .min(1),
  entityOwned: z.boolean(),
})

export type InvitationCodeFormData = {
  invitationCode: string
}

export const InvitationCodeFormSchema: ZodType<InvitationCodeFormData> =
  z.object({
    invitationCode: z
      .string({
        required_error: 'required field',
        invalid_type_error: 'Invalid Invitation Code',
      })
      .regex(invitationCodeValidation, {
        message:
          'Invalid Entry, Invitation Code must contain only numeric digits and must be 12 digits in length.',
      }),
    entityOwned: z.boolean(),
  })

//helper text for input fields
export const formFieldsHelperText = {
  uei: '12 Alphanumeric characters. No spaces allowed.',
  cageCode:
    'If applicable. If you have multiple, enter any valid one. Must correspond with bank account below and be 5 alphanumeric characters.',
  bankAccountNumber:
    'Enter the bank account number EXACTLY as it was provided to SAM.gov.\nNOTE: SBA encrypts this number, and will only use it for confirmation. It can be any string up to 30 characters including spaces, and special characters.',
  tin: 'TIN must contain only numeric digits and must be 9 digits in length. No spaces or hyphens allowed.',
}

export type ValidFieldNames =
  | 'uei'
  | 'cageCode'
  | 'bankAccountNumber'
  | 'tin'
  | 'businessType'
  | 'entityOwned'

export const ClaimBusinessSchema = z.object({
  uei: z
    .string({
      required_error: 'UEI is required.',
      invalid_type_error: 'Invalid UEI.',
    })
    .regex(
      ueiValidation,
      'UEI must contain only alphanumeric characters and be 12 characters long.',
    ),

  cageCode: z
    .string()
    .min(0) // Allows empty strings
    .regex(
      cageCodeValidation,
      'CAGE Code must contain only alphanumeric characters and be 5 characters long.',
    )
    .or(z.literal('')), // Allows explicitly empty string

  bankAccountNumber: z
    .string()
    .min(5, 'Bank account number must be at least 5 digits long.')
    .max(17, 'Bank account number cannot exceed 17 digits.')
    .regex(bankAccountValidation, 'Invalid bank account number.'),

  tin: z
    .string({
      required_error: 'TIN is required.',
      invalid_type_error: 'Invalid TIN.',
    })
    .regex(
      tinValidation,
      'TIN must contain only numeric digits and be 9 digits in length.',
    ),

  serverError: z.void(), // Placeholder for handling server-side errors if any
})
