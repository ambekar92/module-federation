import { MESSAGES_ROUTE } from '@/app/constants/routes';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Message } from '../../types/communication-service/Message';
import fetcher from '../../fetcher';

export function useMessages() {
  const params = useParams<{id: string}>();
  return useSWR<Message[]>(`${MESSAGES_ROUTE}/${params.id}`, fetcher)
}
