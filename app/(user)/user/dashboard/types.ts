import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';

export interface IColumn {
	val: string,
	label: string,
	sortable: boolean
}

export const userColumns: IColumn[] = [
  {
    val: 'legal_business_name',
    label: 'Business Information',
    sortable: true
  },
  {
    val: 'certifications',
    label: 'Certification',
    sortable: true
  },
  {
    val: 'application_type',
    label: 'Application Type',
    sortable: true
  },
  {
    val: 'submitted_on',
    label: 'Submitted On',
    sortable: true
  },
  {
    val: 'due_on',
    label: 'Due On',
    sortable: true
  },
  {
    val: 'days_in_queue',
    label: 'Days in Queue',
    sortable: true
  },
  {
    val: 'application_workflow_state',
    label: 'Status',
    sortable: true
  }
];

export const supervisorColumns: IColumn[] = [
  {
    val: 'legal_business_name',
    label: 'Business Information',
    sortable: true
  },
  {
    val: 'certifications',
    label: 'Certification',
    sortable: true
  },
  {
    val: 'application_type',
    label: 'Application Type',
    sortable: true
  },
  {
    val: 'days_in_queue',
    label: 'Days in Queue',
    sortable: true
  },
  {
    val: 'due_on',
    label: 'Due Date',
    sortable: true
  },
  {
    val: 'status',
    label: 'Status',
    sortable: true
  },
  {
    val: 'assigned_to',
    label: 'Assigned to',
    sortable: true
  },
  {
    val: 'takeAction',
    label: 'Take Action',
    sortable: false
  }
];

export interface IProductivity {
    completed_tasks_current_month: number,
    completed_tasks_current_quarter: number,
    completed_tasks_current_fiscal_year: number,
    average_processing_time_seconds: number,
}

export type DashboardSearchParams =  {
	sortColumn: keyof UserTaskDashboard,
	sortOrder: 'asc' | 'desc',
	page: string,
	application_id?: string,
	current_user_id?: string;
	user_role?: string;
}

export const PAGE_SIZE = 20;
