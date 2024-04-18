// Text Helpers for input fields
export const claimBusinessInputDetails = {
  uei: {
    displayName: 'Unique Entity ID (UEI)',
    maxlength: 12,
    minlength: 12,
    required: true,
    fieldHelper: '12 Alphanumeric characters. No spaces allowed.'
  },
  cageCode: {
    displayName: 'CAGE Code',
    maxlength: 5,
    minlength: undefined,
    required: false,
    fieldHelper: 'If applicable. If you have multiple, enter any valid one. Must correspond with bank account below and be 5 alphanumeric characters.'
  },
  bankAccountNumber: {
    displayName: 'Bank Account Number',
    maxlength: 17,
    minlength: undefined,
    required: true,
    fieldHelper:'Enter the bank account number EXACTLY as it was provided to SAM.gov.\nNOTE: SBA encrypts this number, and will only use it for confirmation.'
  },
  tin: {
    displayName: 'Taxpayer Identification Numbers (TIN)',
    maxlength: 9,
    minlength: 9,
    required: true,
    fieldHelper:'TIN must contain only numeric digits and must be 9 digits in length. No spaces or hyphens allowed.'
  },
  serverError: {
    displayName: '',
    maxlength: undefined,
    minlength: undefined,
    required: undefined,
    fieldHelper:''
  }
}
// Mock API calls for demonstration
const claimedBusinesses = ['123456789012', '123456789013'];
const lostBusinessProfiles = ['123456789014', '123456789015'];

export const getBusinessesClaimed = async (uei: string): Promise<boolean> => {
  return Promise.resolve(claimedBusinesses.includes(uei));
};

export const getLostBusinessProfile = async (uei: string): Promise<boolean> => {
  return Promise.resolve(lostBusinessProfiles.includes(uei));
};
