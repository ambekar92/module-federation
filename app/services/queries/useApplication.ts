import { APPLICATION_ROUTES } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Application } from '../types/application-service/Application';

/**@deprecated use  the one in app\services\queries\application-service\useApplication.ts */
export function useApplication() {
  const session = useSessionUCMS();
  const {entityId} = useParams<{entityId: string}>();
  const url = entityId ? `${APPLICATION_ROUTES}?entity_id=${entityId}` :
    session.data?.user?.id ? `${APPLICATION_ROUTES}?user_id=${session.data?.user?.id}` : '';
  return useSWR<Application[]>(url)
}
