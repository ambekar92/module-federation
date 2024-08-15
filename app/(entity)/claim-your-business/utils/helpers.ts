import { CmbResponseType } from './types';

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
    displayName: 'Taxpayer Identification Number (TIN)',
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

export function isCmbResponseTypeArray(data: any): data is CmbResponseType[] {
  return Array.isArray(data) && data.every(item =>
    typeof item === 'object' &&
    typeof item.sam_entity_id === 'number' &&
    typeof item.legal_business_name === 'string' &&
    typeof item.uei === 'string' &&
    typeof item.cage_code === 'string' &&
    typeof item.account_hash === 'string' &&
    typeof item.tax_identifier_number === 'string' &&
    typeof item.dba_name === 'string' &&
    typeof item.physical_address_1 === 'string' &&
    typeof item.physical_address_2 === 'string' &&
    typeof item.physical_city === 'string' &&
    typeof item.naics_code_string === 'string' &&
    typeof item.physical_state_or_province === 'string' &&
    typeof item.physical_zip_code_5 === 'string' &&
    typeof item.sam_extract_code === 'string' &&
    typeof item.entity_structure === 'string' &&
    typeof item.govt_bus_poc_first_name === 'string' &&
    typeof item.govt_bus_poc_last_name === 'string'
  );
}

// Only way to style the box component
export const boxStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'auto',
  borderRadius: 3,
  backgroundColor: 'white',
  width: '480px',
  padding: '1rem 2rem'
}
