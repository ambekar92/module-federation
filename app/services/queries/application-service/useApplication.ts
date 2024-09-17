import { GET_APPLICATIONS_ROUTE } from '@/app/constants/local-routes';
import useSWR from 'swr';
import { Application } from '../../types/application-service/Application';
import { ApplicationFilterType } from './applicationFilters';

export function useApplication(filterType: ApplicationFilterType, filterValue: any) {
  const q = filterValue ? `?${filterType}=${filterValue}` : '';
  return useSWR<Application[]>(`${GET_APPLICATIONS_ROUTE}${q}`, {
    dedupingInterval: 60000,
    errorRetryInterval: 30000,
    focusThrottleInterval: 60000,
    loadingTimeout: 60000,
    shouldRetryOnError: true,
  })
}
