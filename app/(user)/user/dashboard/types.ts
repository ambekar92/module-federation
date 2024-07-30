import { UserTaskDashboard } from "@/app/services/types/evaluation-service/UserTaskDashboard";

export interface IColumn {
    val: string,
    label: string,
    sortable: boolean
}

const columns: IColumn[] = [
    {
        val: 'legal_business_name',
        label: 'Firm Name',
        sortable: true
    },
    {
        val: 'certifications',
        label: 'Certifications',
        sortable: true
    },
    {
        val: 'application_type_name',
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
        label: 'Due On',
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

export const userColumns = [...columns.slice(0, -2), {
    val: 'submitted_on',
    label: 'Submitted On',
    sortable: true
}, ...columns.slice(-1) ];

export const supervisorColumns = [...columns.slice(0, -2), {
    val: 'assigned_to',
    label: 'Assigned to',
    sortable: true
}, ...columns.slice(-1) ];


export interface IProductivity {
    completed_tasks_current_month: number,
    completed_tasks_current_quarter: number,
    completed_tasks_current_fiscal_year: number,
    average_processing_time_seconds: number,
}

export type DashboardSearchParams =  { sortColumn: keyof UserTaskDashboard, sortOrder: 'asc' | 'desc', page: string, application_id?: string } 

export const PAGE_SIZE = 20;
