export type users = [{
    id:number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_superuser: boolean,
    is_active: boolean,
    last_login: string,
    date_joined: string
  }]

export interface CustomTableProps {
    headers: {
      id: number
      headerName: string
      render?: (rowData: any) => React.ReactNode
    }[]
    addSuccessUser?: any
    onRowCountChange: (count: number) => void
    bordered?: boolean
    editable?: boolean
    remove?: boolean
    updatedData?: any
    newRow:any
  }
