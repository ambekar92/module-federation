import { USER_TASK_DASHBOARD_ROUTE } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import useSWR from 'swr';
import { UserTaskDashboard } from '../../types/evaluation-service/UserTaskDashboard';

export function useUserTaskDashboard() {
  const { data: session, status } = useSessionUCMS();

  const { data, error } = useSWR<UserTaskDashboard[]>(
    status === 'authenticated' && session?.user_id
      ? `${USER_TASK_DASHBOARD_ROUTE}/${session.user_id}`
      : null,
    { revalidateOnMount: true }
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isAuthenticated: status === 'authenticated',
  };
}
