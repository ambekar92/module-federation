'use client'
import { useSessionUCMS } from '@/app/lib/auth';
import { useUsers } from '@/app/services/queries/user-service/useUser';
import Dropdown from '@/app/shared/form-builder/form-controls/Dropdown';
import styles from '../WorkloadDashboard.module.scss';
import { useDefaultUserTaskDashboard, useSelectedUserTaskDashboard } from '@/app/services/queries/evaluation-service/useUserTaskDashboard';
import { useFormContext } from 'react-hook-form';

const HeaderOverview = () => {
  const session = useSessionUCMS();
  const {data: users} = useUsers('role_slug', session?.data?.permissions[session?.data?.permissions.length - 1]?.slug);

  const {watch} = useFormContext();
  const selectedUserId = watch('userId');

  const {data: selectedTasks} = useSelectedUserTaskDashboard(selectedUserId ? Number(selectedUserId) : null);
  const {data: defaultTasks} = useDefaultUserTaskDashboard(!selectedUserId ? session?.data?.permissions[session?.data?.permissions.length - 1]?.slug : null);

  const tasks = selectedUserId ? selectedTasks : defaultTasks;

  const totalTasks = tasks?.length || 0;
  const assignedTasks = tasks?.filter(task => task.assigned_to).length || 0;

  return (
    <div className={styles.header}>
      <div style={{paddingBottom:'1rem'}}>
        <Dropdown name='userId'>
          <option value="">- Select User -</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
          ))}
        </Dropdown>
      </div>
      <div className={styles.cardInline}>
        <span className={styles.count}>{totalTasks}</span> <strong>Tasks</strong>
      </div>
      <div className={styles.cardInline}>
        <span className={styles.count}>{assignedTasks}</span> <strong>Assigned</strong>
      </div>
    </div>
  )
}

export default HeaderOverview
