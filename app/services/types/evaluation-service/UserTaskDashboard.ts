export type UserTaskDashboard = {
  application_id: number;
  application_type_name: string;
  assigned_to: AssignedTo;
  assignment_date: string;
  certifications: string[];
  days_in_queue: number;
  due_on: string;
  entity_id: number;
  legal_business_name: string;
  status: string;
  submitted_on: null | string;
  uei: string;
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