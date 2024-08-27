import { IndividualFormType } from '../individual/schema';
import { OrganizationFormType } from '../organization/schema';

export type Owner = {
    ownerType: 'individual' | 'organization';
  } & (IndividualFormType | OrganizationFormType)

export type SocialDisadvantageOption = {
	label: string
	value: string
}

export enum YesNo {
    yes = 'yes',
    no = 'no'
}

export enum OwnershipType {
  individual = 'Individual',
  organization = 'Organization'
}
