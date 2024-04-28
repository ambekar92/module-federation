export const firmOwnershipTextInputs = {
  firstName: {
    required: true,
    displayName: 'First Name',
    fieldHelper: 'First Name Required',
    maxlength: undefined,
    minlength: 1,
  },
  middleInitial: {
    required: false,
    displayName: 'Middle Initial',
    fieldHelper: undefined,
    maxlength: 1,
    minlength: undefined,
  },
  lastName: {
    required: true,
    displayName: 'Last Name',
    fieldHelper: 'Last Name Required',
    maxlength: undefined,
    minlength: 1,
  },
}

export const firmOwnershipRadioInputs = {
  gender: {
    options: ['M', 'F', 'X'],
    displayName: 'Gender',
    required: true
  },
  usCitizen: {
    options: ['Yes', 'No'],
    displayName: 'US Citizen',
    required: true
  },
  veteran: {
    options: ['Yes', 'No'],
    displayName: 'Veteran',
    required: true
  }
}
