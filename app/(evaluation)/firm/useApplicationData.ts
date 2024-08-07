/* eslint-disable react-hooks/rules-of-hooks */
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useApplication } from '@/app/services/queries/application-service/useApplication';

export function useApplicationData(filterParam: ApplicationFilterType, filterValue: any) {
  if (filterValue === undefined || !filterParam === undefined || filterParam === null || filterValue === null) {
    return { applicationData: null, isLoading: false, mutate: () => Promise.resolve() };
  }
  const { data, isLoading, mutate } = useApplication(filterParam, filterValue);
  const applicationData = data?.[0] ?? null;
  return { applicationData, isLoading, mutate };
}
