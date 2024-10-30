'use client'
import { useSessionUCMS } from '@/app/lib/auth';
import { useUsersWithMultipleFilters } from '@/app/services/queries/user-service/useUser';
import Dropdown from '@/app/shared/form-builder/form-controls/Dropdown';
import styles from '../WorkloadDashboard.module.scss';
import { useDefaultUserTaskDashboard, useSelectedUserTaskDashboard } from '@/app/services/queries/evaluation-service/useUserTaskDashboard';
import { useFormContext } from 'react-hook-form';
import { Role } from '@/app/shared/types/role';
import { getUserRole } from '@/app/shared/utility/getUserRole';

const HeaderOverview = () => {
  const session = useSessionUCMS();
  const { watch, setValue, register } = useFormContext();
  const permissions = session?.data?.permissions || [];
  const userRole = getUserRole(permissions);

  const getUserSpecificRole = () => {
    const reviewerRoles = [ Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER ];
    const approverRoles = [ Role.APPROVER_8a_aabd ];
    const userPermission = permissions.find(permission =>
      reviewerRoles.includes(permission.slug as Role) ||
      approverRoles.includes(permission.slug as Role)
    );
    return userPermission?.slug;
  };

  const userSpecificRole = getUserSpecificRole();
  const selectedRole = watch('selectedRole');

  const getAvailableRoles = () => {
    const screenerRoles = [Role.SCREENER_COMMON_APP];
    const analystRoles = [
      Role.ANALYST_HIGH_TIER, Role.ANALYST_LOW_TIER, Role.ANALYST_CONTRIBUTOR_OGC,
      Role.ANALYST_CONTRIBUTOR_OSS
    ];

    if (userRole === 'reviewer' || userRole === 'approver') {
      const theirRole = userSpecificRole;
      if (!theirRole) {return [...screenerRoles, ...analystRoles];}

      const getComplementaryRole = (role: string) => {
        const roleMap: { [key: string]: string } = {
          [Role.REVIEWER_HIGH_TIER]: Role.REVIEWER_LOW_TIER
        };

        return roleMap[role] || null;
      };

      const complementaryRole = getComplementaryRole(theirRole);
      const additionalRoles = complementaryRole ? [complementaryRole] : [];

      return [
        ...additionalRoles,
        ...screenerRoles,
        ...analystRoles
      ].filter(role =>
        !(theirRole.toLowerCase().includes('reviewer') && role.toLowerCase().includes('approver')) &&
        !(theirRole.toLowerCase().includes('approver') && role.toLowerCase().includes('reviewer'))
      );
    }

    return [];
  };

  const availableRoles = getAvailableRoles();
  const { data: users, isLoading: isLoadingUsers } = useUsersWithMultipleFilters({
    role_slug: selectedRole || null,
    is_active: true
  });

  const selectedUserId = watch('userId');
  const {data: selectedTasks, mutate: mutateSelectedTasks} = useSelectedUserTaskDashboard(selectedUserId ? Number(selectedUserId) : null);
  const {data: defaultTasks, mutate: mutateDefaultTasks } = useDefaultUserTaskDashboard(userSpecificRole ? userSpecificRole : null);
  const tasks = selectedUserId ? selectedTasks : defaultTasks;
  const totalTasks = tasks?.length || 0;
  const assignedTasks = tasks?.filter(task => task.assigned_to).length || 0;

  return (
    <div className={styles.header}>
      {(userRole === 'reviewer' || userRole === 'approver') && (
        <div style={{paddingBottom:'1rem', marginRight:'1rem'}}>
          <Dropdown {...register('selectedRole', {
            onChange: async () => {
              setValue('userId', '');
              await mutateSelectedTasks();
              await mutateDefaultTasks();
            }
          })}>
            <option value="">- Select Role -</option>
            {availableRoles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption.split('_')
                  .filter(word => word.toLowerCase() !== 'criteria')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </option>
            ))}
          </Dropdown>
        </div>
      )}
      <div style={{paddingBottom:'1rem'}}>
        <Dropdown name='userId'>
          <option value="">- Select User -</option>
          {!isLoadingUsers && users && users.length > 0 ?
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))
            : null
          }
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
