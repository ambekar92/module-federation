export type Entity = {
	id: number,
    sam_entity: {
      sam_entity_id: number,
      legal_business_name: string,
      uei: string,
      cage_code: string,
      account_hash: string,
      tax_identifier_number: string,
      dba_name: string,
      physical_address_1: string,
      physical_address_2: string,
      physical_city: string,
      mailing_address_state_or_province: string,
      physical_zip_code_5: string,
      sam_extract_code: string,
      entity_structure: string,
      govt_bus_poc_first_name: string,
      govt_bus_poc_last_name: string
    } | null,
    owner_user_id: 9,
    type: string,
    structure: string,
    deleted_at: null,
    created_at: string,
    updated_at: string,
    owner_user: number,
    naics_code: number
}

export type EntitiesType = Entity[];

export type Application = {
  id: number;
  entity: {
    entity_id: number;
    type: null | string;
    structure: null | string;
  };
  uei: {
    uei: string;
  };
  application_type: {
    id: number;
    name: string;
    description: string;
    title: string;
  };
  program_application: {
		id: number,
    name: string,
    description: string,
    title: string
	}[];
  workflow_state: string;
  application_version: number;
  application_contributor_id: number[];
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
  application_tier: string;
};

export type ApplicationsType = Application[];

export type ApplicationContributor = {
	id: number,
	deleted_at: any,
	created_at: string,
	updated_at: string,
	workflow_state: string,
	application: number,
	application_role: number,
	user: number
}

export type ApplicationContributorType = ApplicationContributor[]
