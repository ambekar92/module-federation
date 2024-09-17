import { MESSAGES_ROUTE } from '@/app/constants/local-routes';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Message } from '../../types/communication-service/Message';

export function useMessages() {
  const params = useParams<{id: string}>();
  return useSWR<Message[]>(`${MESSAGES_ROUTE}/${params.id}`)
}
