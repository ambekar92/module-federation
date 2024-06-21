import { z } from 'zod'
import { ClaimBusinessSchema, InvitationCodeFormSchema } from './schemas'

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

export type ValidFieldNames =
  | 'uei'
  | 'cageCode'
  | 'bankAccountNumber'
  | 'tin'
  | 'businessType'
  | 'entityOwned'

export type InvitationCodeFormData = {
  invitationCode: string
}

export interface IBusinessProfile {
	id: number;
	sam_entity: {
		sam_entity_id: number;
		legal_business_name: string;
		uei: string;
		cage_code: string;
		account_hash: string;
		tax_identifier_number: string;
		dba_name: string;
		physical_address_1: string;
		physical_address_2: string;
		physical_city: string;
		mailing_address_state_or_province: string;
		physical_zip_code_5: string;
		sam_extract_code: string;
		entity_structure: string;
		govt_bus_poc_first_name: string;
		govt_bus_poc_last_name: string;
		claimed: boolean | null;
	};
	owner_user_id: number;
	type: string;
	structure: string;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
	owner_user: number;
}

export type CmbResponseType = {
  message: string;
  sam_business_type: string;
  sam_entity_structure: string;
  primary_naics: string;
  sam_entity: {
    sam_entity_id: number;
    legal_business_name: string;
    uei: string;
    cage_code: string;
    account_hash: string;
    tax_identifier_number: string;
    dba_name: string;
    physical_address_1: string;
    physical_address_2: string;
    physical_city: string;
    naics_code_string: string;
    mailing_address_state_or_province: string;
    physical_zip_code_5: string;
    sam_extract_code: string;
    entity_structure: string;
    govt_bus_poc_first_name: string;
    govt_bus_poc_last_name: string;
  };
};

export type CmbResponse = CmbResponseType | {message: string};

export type UnclaimedEntityType = {
  legal_business_name: string,
  uei: string
}

export type UnclaimedEntityResponse = UnclaimedEntityType | {message: string};

export interface IAccordionItem {
  title: React.ReactNode
  content: React.ReactNode
  expanded: boolean
  id: string
  className: string
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export type ClaimBusinessInputs = z.infer<typeof ClaimBusinessSchema>

export type InvitationCodeInputType = z.infer<typeof InvitationCodeFormSchema>
