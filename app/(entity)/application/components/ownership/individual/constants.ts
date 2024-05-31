import { IndividualFormType } from "./schema";

export const defaultValues: IndividualFormType = {
    prefix: '',
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    ownershipPercent: null,
    USCitizen: null,
    goneByAnotherName: null,
    SSN: null,
    isVeteran: null,
    maritalStatus: null,
    gender: null,
    isSpouseAnOwner: null,
    contactInfo: {
        email: '',
        phoneNumber: ''
    },
    socialDisadvantages: [],
    ownerType: 'individual'
}