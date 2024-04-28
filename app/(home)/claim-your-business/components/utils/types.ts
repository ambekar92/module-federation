import { z } from 'zod'
import { ClaimBusinessSchema } from './schemas'

// ClaimBusinessFormTypes.ts
export type ClaimBusinessType = {
	uei: string
	cageCode: string
	bankAccountNumber: string
	tin: string
	serverError: () => void
}

export type ValidateFormData = {
   businessType: string
   entityOwned: boolean
}

export type ValidFieldNames = 'uei' | 'cageCode' | 'bankAccountNumber' | 'tin' | 'businessType' | 'entityOwned'

export interface IBusinessProfile {
	dba: string
	name: string
	uei: string
	address: string
	contact: string
	type: string
	owned: string
	claimed: boolean
}
export type BusinessProfileType = {
	[key: string]: IBusinessProfile
}

export interface IAccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
  expanded: boolean;
  id: string;
  className: string;
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type ClaimBusinessInputs = z.infer<typeof ClaimBusinessSchema>;
