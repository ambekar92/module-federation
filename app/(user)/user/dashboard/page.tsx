'use client'
import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';
import Metrics from './components/Metrics';
import Reporting from './components/Reporting';
import TableProvider from './components/TableProvider';
import Welcome from './components/Welcome';

const UserDashboard = ({ searchParams }: { searchParams: { sortColumn: keyof UserTaskDashboard, sortOrder: 'asc' | 'desc', page: string } }) => {

  return (
    <>
      <Welcome />
      <Metrics />
      <TableProvider searchParams={searchParams} />
      <Reporting />
    </>
  )
}

export default UserDashboard
