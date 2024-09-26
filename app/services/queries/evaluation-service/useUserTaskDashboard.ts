import { USER_DASHBOARD_TASKS_ROUTE, USER_TASKS_ROUTE } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import useSWR from 'swr';
import { UserTaskDashboard } from '../../types/evaluation-service/UserTaskDashboard';

export function useUserTaskDashboard() {
  const { data: session, status } = useSessionUCMS();

  const { data, error } = useSWR<UserTaskDashboard[]>(
    session && session?.user_id
      ? `${USER_DASHBOARD_TASKS_ROUTE}/${session.user_id}`
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

export function useSelectedUserTaskDashboard(userId: number | null) {

  const { data, error } = useSWR<UserTaskDashboard[]>(
    userId ? `${USER_DASHBOARD_TASKS_ROUTE}/${userId}`
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

export function useDefaultUserTaskDashboard(role: string | null) {

  const { data, error } = useSWR<UserTaskDashboard[]>(
    role ? `${USER_TASKS_ROUTE}?role_slug=${role}`
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
