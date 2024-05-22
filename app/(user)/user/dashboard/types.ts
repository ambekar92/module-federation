export type Task = {
    firmName: string,
    uei: string,
    certification: string,
    applicationType: string,
    dueOn: string,
    daysInQueue: string,
    status: string,
    id: string
} & (UserTask | SupervisorTask)

export type UserTask = {
    type: 'user',
    submittedOn: string,
} 

export type SupervisorTask = {
    type: 'supervisor',
    assignedTo: string,
    takeAction: 'Re-Assign' // add other actions when known [mdev]

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
        val: 'submittedOn',
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
        val: 'assignedTo',
        label: 'Assigned to'
    },
    {
        val: 'takeAction',
        label: 'Take Action'
    }

]

export const PAGE_SIZE = 20;
