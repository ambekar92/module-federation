import { THREADS_ROUTE } from '@/app/constants/routes';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import fetcher from '../../fetcher';
import { Thread } from '../../types/communication-service/Thread';

export function useThreads() {
  const params = useParams<{messageId: string}>();
  return useSWR<Thread[]>(`${THREADS_ROUTE}?uuid=${params.messageId}`)
}
