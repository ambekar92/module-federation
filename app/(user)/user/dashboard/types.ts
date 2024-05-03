export type Task = {
    firmName: string,
    uei: string,
    certification: string,
    applicationType: string,
    submittedOn: string,
    dueOn: string,
    daysInQueue: string,
    status: string,
    id: string
}

export enum Columns {
    'Firm Name', 'Certification', 'Application Type', 'Submitted On', 'Due On', 'Days in Queue', 'Status'
}

export const columns = [
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
        val: 'submittedOn',
        label: 'Submitted On',
    },
    {
        val: 'dueOn',
        label: 'Due On'
    },
    {
        val: 'daysInQueue',
        label: 'Days in Queue'
    },
    {
        val: 'status',
        label: 'Status'
        
    }
]