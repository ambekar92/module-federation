'use client'

import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard'
import Welcome from '../components/Welcome'
import Metrics from '../components/Metrics'
import TableProvider from '../components/TableProvider'
// import Reporting from '../components/Reporting'
import { useUserTaskDashboard } from '@/app/services/queries/evaluation-service/useUserTaskDashboard'

const ReviewersUserDashboard = ({ searchParams }: { searchParams: { sortColumn: keyof UserTaskDashboard, sortOrder: 'asc' | 'desc', page: string } }) => {
  const {data: tasks, isLoading} = useUserTaskDashboard();

  if(isLoading) {
    return
  }
  return (
    <>
      <Welcome />
      <Metrics tasks={tasks} />
      {/* <Reporting /> */}
      <TableProvider tasks={tasks} searchParams={searchParams} />
    </>
  )
}

export default ReviewersUserDashboard
