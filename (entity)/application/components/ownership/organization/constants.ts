import { OrganizationFormType } from "./schema";

export const defaultValues: OrganizationFormType = {
    contactInfo: {
        email: "",
        phoneNumber: ""
    },
    orgName: "",
    ownershipPercent: "",
    goneByAnotherName: null,
    socialDisadvantages: [],
    ownerType: "organization"
}