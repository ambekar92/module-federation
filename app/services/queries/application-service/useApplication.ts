import { APPLICATION_ROUTE } from '@/app/constants/routes';
import useSWR from 'swr';
import { Application } from '../../types/application-service/Application';
import { ApplicationFilterType } from './applicationFilters';
import fetcher from '../../fetcher';

export function useApplication(filterType: ApplicationFilterType, filterValue: any) {
  const q = filterValue ? `?${filterType}=${filterValue}` : '';
  return useSWR<Application[]>(`${APPLICATION_ROUTE}${q}`, fetcher, {
    dedupingInterval: 60000,
    errorRetryInterval: 30000,
    focusThrottleInterval: 60000,
    loadingTimeout: 60000,
    shouldRetryOnError: true,
  })
}
