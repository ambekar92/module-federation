// TODO update type once api is complete [mdev]
export type AuditType = {
    date: string,
    event: string,
    userName: string,
    userRole: string,
    details: string
}

// TODO update type once api is complete [mdev]
export type AuditResponseType = {
    items: AuditType[],
    pageSize: number,
}
