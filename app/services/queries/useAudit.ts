import { AUDIT_ROUTE } from '@/app/constants/routes';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import fetcher from '../fetcher';
import { AuditResponseType } from '../types/AuditType';

export function useAudit(page: number = 1, pageSize: number = 10) {
  const params = useParams<{application_id: string}>();
  return useSWR<AuditResponseType>(`${AUDIT_ROUTE}?application_id=${params.application_id}&page=${page}&pageSize=${pageSize}`, fetcher)
}
