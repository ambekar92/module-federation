/* eslint-disable react-hooks/rules-of-hooks */
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useApplication } from '@/app/services/queries/application-service/useApplication';
import { useParams } from 'next/navigation';

export function useApplicationData(filterParam: ApplicationFilterType, filterValue: any) {
  if (filterValue === undefined || !filterParam === undefined || filterParam === null || filterValue === null) {
    return { applicationData: null, isLoading: false, mutate: () => Promise.resolve() };
  }
  const { data, isLoading, mutate, error } = useApplication(filterParam, filterValue);

  const applicationData = data?.[0] ?? null;
  return { applicationData, isLoading, mutate , error};
}

export function useCurrentApplication() {
  const params = useParams<{application_id: string}>();
  const { applicationData, isLoading, error } = useApplicationData(ApplicationFilterType.id, params.application_id);

  return {
    applicationData,
    isLoading,
    applicationId: params.application_id,
    error
  };
}
