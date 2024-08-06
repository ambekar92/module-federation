import { EntityFormType } from './schema'

export const defaultValues: EntityFormType = {
  entityType: '',
  entityName: '',
  prefix: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  contactInfo: {
    email: '',
    phoneNumber: '',
  },
  contactLocation: {
    mailingAddress: '',
    mailingAddress2: '',
    city: '',
    state: '',
    zip: '',
    urbanization: '',
  },
}
