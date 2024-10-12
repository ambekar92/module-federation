import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Thread } from '../../types/communication-service/Thread';
import { USER_THREADS_ROUTE } from '@/app/constants/local-routes';

export function useUserThreads() {
  const params = useParams<{messageId: string}>();
  return useSWR<Thread[]>(`${USER_THREADS_ROUTE}?uuid=${params.messageId}`)
}
