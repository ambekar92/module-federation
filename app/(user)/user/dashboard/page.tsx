'use client'
import Metrics from './components/Metrics';
import Reporting from './components/Reporting';
import TableProvider from './components/TableProvider';
import Welcome from './components/Welcome';
import { SupervisorProvider } from './components/supervisorContext';
import { Task } from './types';


const UserDashboard = ({ searchParams }: { searchParams: { sortColumn: keyof Task, sortOrder: 'asc' | 'desc', page: string } }) => {
 
  return (
    <SupervisorProvider>
        <Welcome />
        <Metrics />
        <TableProvider searchParams={searchParams} />
        <Reporting />
    </SupervisorProvider>
  )
}

export default UserDashboard
