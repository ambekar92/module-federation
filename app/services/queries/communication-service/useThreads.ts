import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Thread } from '../../types/communication-service/Thread';
import { THREADS_ROUTE } from '@/app/constants/local-routes';

export function useThreads() {
  const params = useParams<{messageId: string}>();
  return useSWR<Thread[]>(`${THREADS_ROUTE}?uuid=${params.messageId}`)
}
