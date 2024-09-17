import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { AuditResponseType } from '../types/AuditType';
import { AUDIT_ROUTE } from '@/app/constants/local-routes';

export function useAudit(page: number = 1, pageSize: number = 10) {
  const params = useParams<{application_id: string}>();
  return useSWR<AuditResponseType>(`${AUDIT_ROUTE}?application_id=${params.application_id}&page=${page}&pageSize=${pageSize}`)
}
