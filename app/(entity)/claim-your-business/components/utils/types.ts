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
  dba_name: string
  legal_business_name: string
  uei: string
  physical_address_1: string
  physical_address_2: string
  physical_city: string
  mailing_address_state_or_province: string
  physical_zip_code_5: string
  govt_bus_poc_first_name: string
  govt_bus_poc_last_name: string
  entity_structure: string
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
