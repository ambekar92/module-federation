'use client'
import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';
import { isRole } from '@/middleware';
import OpenAssignments from './OpenAssignments';
import Productivity from './Productivity';
import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';

const Metrics: React.FC<{tasks: UserTaskDashboard[] | undefined}> = ({ tasks }) => {
  const session = useSessionUCMS();
  if (!session.data || isRole(session.data?.permissions, Role.EXTERNAL)) {return null;}

  return (<>
    <OpenAssignments tasks={tasks}/>
    <Productivity />
  </>

  )
}

export default Metrics
