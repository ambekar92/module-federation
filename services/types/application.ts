type Entity = {
	entity_id: number;
	type: string;
	structure: string;
};

export type SamEntity = {
	legal_business_name: string;
	uei: string;
	cage_code: string;
	tax_identifier_number: string;
	dba_name: string;
	physical_address_1: string;
	physical_address_2: string;
	physical_city: string;
	mailing_address_state_or_province: string;
	physical_zip_code_5: string;
	naics_code_string: string;
	entity_structure: string;
	sam_extract_code: string;
	exclusion_status_flag: string;
	debt_subject_to_offset_flag: string | null;
	expiration_date: string;
	last_update_date: string;
	business_start_date: string;
	corporate_url: string;
};

export type ApplicationType = {
	id: number;
	name: string;
	description: string;
	title: string;
};

type Program = {
	name: string;
	description: string | null;
	title: string;
};

type ProgramApplication = {
	id: number;
	program_id: number;
	programs: Program;
};

type ProcessType = {
	id: number;
	data: {
		is_eight_a: boolean;
		application_id: number;
		program_decisions: {
			program_id: number;
		}[];
	};
}

export type Application = {
	id: number;
	entity: Entity;
	sam_entity: SamEntity;
	application_type: ApplicationType;
	program_application: ProgramApplication[];
	workflow_state: string;
	application_version: number;
	application_contributor_id: number[];
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
	application_tier: string;
	progress: string;
	signed_by: string | null;
	signed_date: string | null;
	submitted_at: string | null;
	process: ProcessType
};

export type ApplicationEligibilityType = {
	id: number,
	deleted_at: string | null,
	created_at: string,
	updated_at: string,
	eligible_to_apply_flag: boolean,
	proceeding_to_apply_flag: boolean,
	intending_to_apply: boolean,
	application: number,
	program: number
}

export type InvitationType = {
	created_at: string,
	first_name: string,
	last_name: string,
	email: string,
	invitation_status: null | null,
	invitation_code: string,
	user_id: null | number,
	application_role: {
		name: string,
		description: null | string,
		title: string
	},
	entity: {
		entity_id: number,
		type: null | string,
		structure: string,
		uei: string
	}
}
