import { INBOX_ROUTE } from '@/app/constants/routes';
import useSWR from 'swr';
import { InboxResponse } from '../../types/communication-service/Inbox';
import { useSessionUCMS } from '@/app/lib/auth';
import fetcher from '../../fetcher';

export function useInbox() {
  const session = useSessionUCMS();
  // return useSWR<InboxResponse>(`${INBOX_ROUTE}/20`, fetcherGET)
  return useSWR<InboxResponse>(`${INBOX_ROUTE}/${session.data.user_id}`, fetcher)
}
