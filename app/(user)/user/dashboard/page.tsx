'use client'
import {
  Grid
} from '@trussworks/react-uswds';
import Metrics from './components/Metrics';
import TableProvider from './components/TableProvider';
import { SupervisorProvider } from './components/supervisorContext';
import { Task } from './types';


const UserDashboard = ({ searchParams }: { searchParams: { sortColumn: keyof Task, sortOrder: 'asc' | 'desc', page: string } }) => {

  return (
    <Grid row gap="md">
      <SupervisorProvider>
        <Grid className="mobile:grid-col-12 desktop:grid-col-8">
          <TableProvider searchParams={searchParams} />
        </Grid>
        <Grid className="mobile:grid-col-12 desktop:grid-col-4">
          <Metrics />
        </Grid>
      </SupervisorProvider>
    </Grid>
  )
}

export default UserDashboard
