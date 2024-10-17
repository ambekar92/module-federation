import { PRBAC_ROLES_ROUTE } from '@/app/constants/local-routes';
import useSWR from 'swr';

export function usePrbacRoles() {
  return useSWR<any>(`${PRBAC_ROLES_ROUTE}`);
}
