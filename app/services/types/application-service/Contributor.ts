export interface ContributorResponse {
	id: number,
	deleted_at: null,
	created_at: string,
	updated_at: string,
	workflow_state: string,
	application_role_id: number,
	application_role: {
		name: string,
		description: string | null,
		title: string
	},
	user_id: number,
	user: null,
  application_id: number
}
