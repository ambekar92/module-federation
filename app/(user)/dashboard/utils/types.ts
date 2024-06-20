export type News = {
    id: number,
    title: string,
    description: string
}

export type Application = {
    id: number,
    title: string,
    status: 'Submitted' | 'In progress' | 'Not started',
    percentComplete: number,
    submittedDate: Date,
    tags: string[]
}
