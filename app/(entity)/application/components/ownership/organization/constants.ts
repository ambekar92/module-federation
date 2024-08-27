import { YesNo } from '../shared/types';
import { OrganizationFormType } from './schema';

export const defaultValues: OrganizationFormType = {
  contactInfo: {
    email: '',
    phoneNumber: ''
  },
  orgName: '',
  ownershipPercent: '',
  goneByAnotherName: null as unknown as YesNo,
  socialDisadvantages: [],
  ownerType: 'organization'
}
