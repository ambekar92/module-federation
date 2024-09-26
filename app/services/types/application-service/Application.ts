type Entity = {
  entity_id: number
  type: string
  structure: string
}

export type SamEntity = {
  legal_business_name: string
  uei: string
  cage_code: string
  tax_identifier_number: string
  dba_name: string
  physical_addr_1: string
  physical_addr_2: string
  physical_city: string
  physical_state_or_province: string
  physical_zip_code_5: string
  naics_code_string: string
  entity_structure: string
  sam_extract_code: string
  exclusion_status_flag: string
  debt_subject_to_offset_flag: string
  expiration_date: string
  last_update_date: string
  business_start_date: string
  entity_url: string
}

export type ApplicationType = {
  id: number
  name: string
  description: string
  title: string
}

type ProcessType = {
  id: number
  data: {
    tier: string
    is_eight_a: boolean
    application_id: number
    pre_screener_id: number
		review_start: boolean
		step: string
    program_decisions: {
      program_id: number
    }[]
    veteran_owned_small_business: boolean
  }
}

type ProgramApplication = {
  id: number,
  program_id: number,
  programs: {
    name: string,
    description: null | string,
    title: string
  }
	workflow_state: string,
	analyst_recommendation: string | null,
	reviewer_decision: string | null,
	reviewer_decline_reason: string | null,
	reviewer_can_appeal: string | null,
	approver_decision: string | null,
	application_id: number,
	certification_id: number
}

export type Application = {
  id: number
  entity: Entity
  sam_entity: SamEntity
  application_type: ApplicationType
  program_application: ProgramApplication[]
  workflow_state: string
  workflow_state_status: {
    title_internal: string
    title_external: string
  }
  application_contributor: Array<{
    id: number,
    deleted_at: string | null,
    created_at: string,
    updated_at: string,
    workflow_state: string,
    application_role_id: number,
    application_role: {
      name: string,
      description: null | string,
      title: string
    },
    user_id: number,
    user: {
      id: number,
      email: string,
      first_name: string,
      last_name: string
    },
    application_id: number
  }>
  deleted_at: string | null
  created_at: string
  updated_at: string
  application_tier: string
  progress: string
	assigned_to: string | null
  signed_by: string | null
  signed_date: string | null
  submitted_at: string | null
  process: ProcessType |null
	business_point_of_contact: {
		user_id: number,
		email: string,
		is_active: boolean,
		username: string,
		first_name: string,
		last_name: string
	}
	certifications: [{
		id: number,
		program: {
				id: number,
				deleted_at: string | null,
				created_at: string,
				updated_at: string,
				name: string,
				description: string | null,
				title: string,
				duration_in_years: number
		},
		deleted_at: string | null,
		created_at: string,
		updated_at: string,
		issue_date: string,
		expiry_date: string,
		recertification_eligibility_flag: boolean,
		legacy_certification_number: number | null,
		agreement_signed_at: string | null,
		uuid: string,
		entity: number,
		workflow_state: string,
		certification_status_qualifier: string | null,
		certification_status_reason: string | null
	}]
}

export type ApplicationEligibilityType = {
  id: number
  deleted_at: string | null
  created_at: string
  updated_at: string
  eligible_to_apply_flag: boolean
  proceeding_to_apply_flag: boolean
  intending_to_apply: boolean
  application: number
  program: number
}

export type InvitationType = {
	id: number
  created_at: string
  first_name: string
  last_name: string
  email: string
  invitation_status: null | null
  invitation_code: string
  user_id: null | number
  application_role: {
    name: string
    description: null | string
    title: string
  }
  entity: {
    entity_id: number
    type: null | string
    structure: string
    uei: string
  }
}
export type ApplicationAdminType = {
  entity_id: number
  expiration_date: string
  legal_business_name: string
  uei: string
  tax_identifier_number: string
  dba_name: string,
  updated_at: string,
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

export type EntitiesType = {
	id: number
	legal_business_name?: string
	uei: string
	dba_name: string
	entity_structure: string
	sam_extract_code: string
}

export type ProgramApplicationType = {
	id: number,
  program_id: number
	name: string,
	title: string,
	application_id: number,
	workflow_state: string,
	analyst_recommendation: string,
	approver_decision: null | string,
	reviewer_decision: null | string
}
