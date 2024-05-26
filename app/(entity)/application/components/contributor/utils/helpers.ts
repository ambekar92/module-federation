export const delegateInputDetails = {
  firstName: {
    required: true,
    displayName: 'First Name',
    fieldHelper: 'First Name Required',
    maxlength: undefined,
    minlength: 1,
  },
  lastName: {
    required: true,
    displayName: 'Last Name',
    fieldHelper: 'Last Name Required',
    maxlength: undefined,
    minlength: 1,
  },
  email: {
    required: true,
    displayName: 'Email Address',
    fieldHelper: 'Email Required',
    maxlength: 100,
    minlength: 1,
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
