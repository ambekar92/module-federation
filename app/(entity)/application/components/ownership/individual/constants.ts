import { YesNo } from '../shared/types';
import { IndividualFormType } from './schema';

export const defaultValues: IndividualFormType = {
  prefix: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  ownershipPercent: null,
  USCitizen: null,
  goneByAnotherName: null as unknown as YesNo,
  SSN: null,
  isVeteran: null,
  maritalStatus: null,
  gender: '',
  isSpouseAnOwner: null as unknown as YesNo,
  contactInfo: {
    email: '',
    phoneNumber: ''
  },
  socialDisadvantages: [],
  ownerType: 'individual'
}
