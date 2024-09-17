import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { ExtendedMessage } from '../../types/communication-service/ExtendedMessage';
import { EXTENDED_MESSAGES_ROUTE } from '@/app/constants/local-routes';

export function useExtendedmessages() {
  const params = useParams<{application_id: string}>();
  return useSWR<ExtendedMessage[]>(params.application_id ? `${EXTENDED_MESSAGES_ROUTE}?application_id=${params.application_id}` : null)
}
