'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { Role } from '@/app/shared/types/role'
import { isRole } from '@/middleware'
import { useCurrentPath } from '../hooks/useCurrentPath'

const Welcome = () => {
  const session = useSessionUCMS();
  const { isReviewersDashboard, isTasksDashboard } = useCurrentPath();

  if (!session.data || isRole(session.data?.permissions, Role.EXTERNAL)) {return null;}

  return (
    <div>
      <h1>Welcome, {session.data?.user?.name}</h1>
      {isReviewersDashboard && (
        <p>This dashboard provides an additional view that allows you to search and filter on an individual Analyst to view their workload.</p>
      )}
      {isTasksDashboard && (
        <p>This dashboard provides a list of applications assigned to you, a few details about the application, as well as some metrics related to your open tasks and productivity.</p>
      )}
    </div>
  )
}

export default Welcome
