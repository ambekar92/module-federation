// external user and supervisor user task dashboard
export type Task = {
    legal_business_name: string,
    uei: string,
    entity_id: number,
    application_type_id: number,
    application_id: number,
    days_in_queue: number,
    assignment_date: string,
    status: string,
    due_on: string, //  currently missing from the API response [mdev]
    // applicable to external users only
    submitted_on?: string, //  currently missing from the API response [mdev]

    // applicable to supervisor users only
    assigned_to: string, //  currently missing from the API response [mdev]
}

export interface IColumn {
    val: string,
    label: string
}

export enum UserColumns {
    'Firm Name', 'Certification', 'Application Type', 'Days in Queue', 'Due On', 'Submitted On', 'Status'
}
export enum SupervisorColumns {
    'Firm Name', 'Certification', 'Application Type', 'Days in Queue', 'Due On', 'Status', 'Assigned to', 'Take Action'

}

export const userColumns = [
    {
        val: 'legal_business_name',
        label: 'Firm Name'
    },
    {
        val: 'certification',
        label: 'Certification'
    },
    {
        val: 'applicationType',
        label: 'Application Type'
    },
    {
        val: 'days_in_queue',
        label: 'Days in Queue'
    },
    
    {
        val: 'due_on',
        label: 'Due On'
    },
    
    {
        val: 'submitted_on',
        label: 'Submitted On',
    },
    {
        val: 'status',
        label: 'Status'
        
    }
]

export const supervisorColumns = [
    {
        val: 'firmName',
        label: 'Firm Name'
    },
    {
        val: 'certification',
        label: 'Certification'
    },
    {
        val: 'applicationType',
        label: 'Application Type'
    },
    {
        val: 'daysInQueue',
        label: 'Days in Queue'
    },
    {
        val: 'dueOn',
        label: 'Due On'
    },
    {
        val: 'status',
        label: 'Status'
    },
    {
        val: 'assigned_to',
        label: 'Assigned to'
    },
    {
        val: 'takeAction',
        label: 'Take Action'
    }

]

export interface IProductivity {
    completed_tasks_current_month: number,
    completed_tasks_current_quarter: number,
    completed_tasks_current_fiscal_year: number,
    average_processing_time_seconds: number,
}

export const PAGE_SIZE = 20;
