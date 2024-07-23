// Text Helpers for input fields

export const userInputDetails = {
  title: {
    displayName: 'Title',
    maxlength: undefined,
    minlength: undefined,
    required: true,
    fieldHelper: '',
    inputType: 'text',
  },
  role: {
    displayName: 'User Role',
    maxlength: undefined,
    minlength: undefined,
    required: true,
    fieldHelper: '',
    inputType: 'select',
  },
  address: {
    displayName: 'Address',
    maxlength: undefined,
    minlength: undefined,
    required: true,
    fieldHelper: '',
    inputType: 'text',
  },
  address2: {
    displayName: 'Address2',
    maxlength: undefined,
    minlength: undefined,
    required: false,
    fieldHelper: '',
    inputType: 'text',
  },
  city: {
    displayName: 'City',
    maxlength: undefined,
    minlength: undefined,
    required: true,
    fieldHelper: '',
    inputType: 'text',
  },
  state: {
    displayName: 'State',
    maxlength: undefined,
    minlength: undefined,
    required: true,
    fieldHelper: '',
    inputType: 'select',
  },
  zip: {
    displayName: 'Zip',
    maxlength: 5,
    minlength: 5,
    required: true,
    fieldHelper:
      'Zip must contain only numeric digits and must be 5 digits in length.',
    inputType: 'text',
  },
  phone: {
    displayName: 'Phone',
    maxlength: 10,
    minlength: 10,
    required: true,
    fieldHelper:
      'Phone number must contain only numeric digits and must be 10 digits in length.',
    inputType: 'text',
  },
  status: {
    displayName: 'Account Status',
    maxlength: undefined,
    minlength: undefined,
    required: true,
    fieldHelper: '',
    inputType: 'select',
  },
}

export const filterText = (
  text: string,
  onlyNumbers: boolean = false,
): string => {
  if (onlyNumbers) {
    // Filter out everything but digits
    return text.replace(/\D/g, '')
  }
  // Filter out non-alphanumeric characters (as per the original function)
  return text.replace(/[^a-zA-Z0-9]/g, '')
}
