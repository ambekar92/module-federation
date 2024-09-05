import { USER_ROUTE } from '@/app/constants/routes';
import useSWR from 'swr';
import { User } from '../../types/user-service/User';
import { useThreads } from './useThreads';
import { Thread } from '../../types/communication-service/Thread';
import { useParams } from 'next/navigation';
import fetcher from '../../fetcher';

export function useSender() {
  const params = useParams<{messageId: string}>()
  const {data} = useThreads();

  const thread = data && data?.find((thread: Thread) => thread.uuid === params.messageId);
  return useSWR<User>(thread ? `${USER_ROUTE}/${thread.messages[0].sender}` : null)
}
