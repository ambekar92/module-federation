import { INBOX_ROUTE } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import useSWR from 'swr';
import { InboxResponse } from '../../types/communication-service/Inbox';

export function useInbox() {
  const session = useSessionUCMS();
  return useSWR<InboxResponse>(`${INBOX_ROUTE}/${session.data.user_id}`)
}
