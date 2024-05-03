export interface User {
  id: string
  name: string
  email: string
  roleTitle: string
  status: string
  approved: string
  createdDate: string
  lastLogin: string
}

export type ColValues =
  | 'name'
  | 'email'
  | 'roleTitle'
  | 'status'
  | 'approved'
  | 'createdDate'
  | 'lastLogin'

export interface DataTableProps {
  data: User[]
  currentPage: number
}
export enum ColumnNames {
  Name = 'Name',
  Email = 'E-mail',
  Status = 'Status',
  Approved = 'Approved By',
  CreatedDate = 'Created',
  LastLogin = 'Last Login',
}

export const mapDisplayNameToUserKey = (value: ColumnNames): ColValues => {
  switch (value) {
    case ColumnNames.Name:
      return 'name'
    case ColumnNames.Email:
      return 'email'
    case ColumnNames.RoleTitle:
      return 'roleTitle'
    case ColumnNames.Status:
      return 'status'
    case ColumnNames.Approved:
      return 'approved'
    case ColumnNames.CreatedDate:
      return 'createdDate'
    case ColumnNames.LastLogin:
      return 'lastLogin'
    default:
      return 'name'
  }
}
