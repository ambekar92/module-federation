'use client'

import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard'
import Metrics from '../components/Metrics'
import TableProvider from '../components/TableProvider'
import Welcome from '../components/Welcome'
import { useUserTaskDashboard } from '@/app/services/queries/evaluation-service/useUserTaskDashboard'

const TasksUserDashboard = ({ searchParams }: { searchParams: { sortColumn: keyof UserTaskDashboard, sortOrder: 'asc' | 'desc', page: string } }) => {
  const {data: tasks, isLoading} = useUserTaskDashboard();

  if(isLoading) {
    return
  }
  return (
    <>
      <Welcome />
      <Metrics tasks={tasks} />
      <TableProvider searchParams={searchParams} />
    </>
  )
}

export default TasksUserDashboard
