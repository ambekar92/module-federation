import { z } from 'zod'

export const OwnershipFormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleInitial: z.string(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['M', 'F', 'X']),
  socialDisadvantages: z.string().min(1, 'Social disadvantage is required').array(),
  usCitizen: z.enum(['Yes', 'No']),
  veteran: z.enum(['Yes', 'No']),
  disabledVeteran: z.enum(['Yes', 'No']),
  ownershipPercentage: z
    .number()
    .min(0.01, 'Select a percentage between 0.01 & 100')
    .max(100, 'Percentage cannot exceed 100'),
  eightA: z.boolean(),
  wosb: z.boolean(),
  edwosb: z.boolean(),
  protege: z.boolean(),
  hubzone: z.boolean(),
  vosb: z.boolean(),
  sdvosb: z.boolean(),
  name: z.string().min(1, 'Your name is required'),
  role: z.string(),
  position: z.string().min(1, 'Your position is required'),
  licenseHolder: z.string({ required_error: 'Confirm if you are a license holder' }),
  fileLicenseHolder: z
    .any()
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      },
      {
        message: 'Only PDF and Word documents are allowed'
      }
    )
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return file.size <= 1024 * 1024 * 2 // 2MB
      },
      {
        message: 'File size must be 2MB or less'
      }
    ),
  fileShareholderMeetingMinutes: z
    .any()
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      },
      {
        message: 'Only PDF and Word documents are allowed'
      }
    )
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return file.size <= 1024 * 1024 * 2 // 2MB
      },
      {
        message: 'File size must be 2MB or less'
      }
    ),
  fileBoardMeetingMinutes: z
    .any()
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      },
      {
        message: 'Only PDF and Word documents are allowed'
      }
    )
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return file.size <= 1024 * 1024 * 2 // 2MB
      },
      {
        message: 'File size must be 2MB or less'
      }
    ),
  fileArticlesIncorporation: z
    .any()
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      },
      {
        message: 'Only PDF and Word documents are allowed'
      }
    )
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return file.size <= 1024 * 1024 * 2 // 2MB
      },
      {
        message: 'File size must be 2MB or less'
      }
    ),
  fileBylaws: z
    .any()
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      },
      {
        message: 'Only PDF and Word documents are allowed'
      }
    )
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return file.size <= 1024 * 1024 * 2 // 2MB
      },
      {
        message: 'File size must be 2MB or less'
      }
    ),
  fileStockCertsAndLedgers: z
    .any()
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      },
      {
        message: 'Only PDF and Word documents are allowed'
      }
    )
    .refine(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {return true}
        const file = fileList[0]
        return file.size <= 1024 * 1024 * 2 // 2MB
      },
      {
        message: 'File size must be 2MB or less'
      }
    )
})
