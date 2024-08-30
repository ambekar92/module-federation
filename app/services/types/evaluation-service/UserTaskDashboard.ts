export type UserTaskDashboard = {
  status: string;
  assignment_date: string;
  days_in_queue: number;
  application_id: number;
  application_type_name: string;
  application_workflow_state: string;
  certification_workflow_state: string | null;
  entity_id: number;
  uei: string;
  legal_business_name: string;
  due_on: string;
  submitted_on: string | null;
  assigned_to: AssignedTo;
  certifications: string[];
};

export type AssignedTo = {
	id: number;
	first_name: string;
	last_name: string;
	prbac_role: Array<{
		role_id: number;
		slug: string;
		name: string;
	}>;
};
