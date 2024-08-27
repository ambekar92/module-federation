import { AssignedTo, UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';
import { DashboardSearchParams } from './types';

export const fullName = (item: AssignedTo) => {
  const firstName = item.first_name ?? '';
  const lastName = item.last_name ?? '';
  return `${firstName} ${lastName}`;
}

export const  sortData = (a: UserTaskDashboard, b: UserTaskDashboard, searchParams: DashboardSearchParams) => {

  const sortBy = searchParams.sortColumn ?? 'legal_business_name';
  const sortOrder = searchParams.sortOrder ?? 'asc';
  if (sortBy === 'assigned_to') {
    return sortOrder === 'desc' ? `${a[sortBy].first_name} ${a[sortBy].last_name}`.localeCompare(`${b[sortBy].first_name} ${b[sortBy].last_name}`) :
      `${b[sortBy].first_name} ${b[sortBy].last_name}`.localeCompare(`${a[sortBy].first_name} ${a[sortBy].last_name}`)
  }
  if (!isNaN(Date.parse(a[sortBy] as string)) && !isNaN(Date.parse(b[sortBy] as string))) {
    return sortOrder === 'desc' ? Date.parse(b[sortBy] as string) - Date.parse(a[sortBy] as string) : Date.parse(a[sortBy] as string) - Date.parse(b[sortBy] as string)
  }
  if (!isNaN(Number(a[sortBy]))) {
    return sortOrder === 'desc' ? Number(b[sortBy]) - Number(a[sortBy]) :  Number(a[sortBy]) - Number(b[sortBy])
  }
  if (Array.isArray(a[sortBy]) && Array.isArray(b[sortBy])) {
    return sortOrder === 'desc' ? (a[sortBy] as string[])?.join(', ').localeCompare((b[sortBy] as string[])?.join(', ')) :
      (b[sortBy] as string[])?.join(', ').localeCompare((a[sortBy] as string[])?.join(', '))
  }
  return sortOrder === 'desc' ? ((a as UserTaskDashboard)[sortBy] as string)?.localeCompare(b[sortBy] as string) : ((b as UserTaskDashboard)[sortBy] as string)?.localeCompare(a[sortBy] as string)
}
