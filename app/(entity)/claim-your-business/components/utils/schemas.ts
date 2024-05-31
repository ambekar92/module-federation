import { z } from 'zod'

// Regular expressions for different types of validation
const ueiValidation = /^[a-zA-Z0-9]{12}$/ // UEI must be 12 alphanumeric characters
const bankAccountValidation = /^[0-9]{5,17}$/ // Bank account must be between 5 and 17 digits
const cageCodeValidation = /^[a-zA-Z0-9]{5}$/ // CAGE Code must be 5 alphanumeric characters
const tinValidation = /^[0-9]{9}$/ // TIN must be 9 digits
const invitationCodeValidation = new RegExp(/^[0-9]{12}$/) // Invitation Code must contain only numeric digits and be 12 digits length.

// Validation schema for form fields in a business application
export const ValidateFormSchema = z.object({
  businessType: z
    .string({
      required_error: 'Business type is required.',
      invalid_type_error: 'Invalid business type.',
    })
    .min(1, 'Business type cannot be empty.'),
  entityOwned: z.boolean(),
})

// Validation schema for claiming a business, using detailed error messages and regex validations
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

// Validation schema for invitation code form
export const InvitationCodeFormSchema = z.object({
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
