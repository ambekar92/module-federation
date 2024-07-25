import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useApplication } from '@/app/services/queries/application-service/useApplication';
import { useParams } from 'next/navigation';

export function useApplicationData(filterParam: ApplicationFilterType = ApplicationFilterType.id, filterValue: any = '') {
  const params = useParams<{application_id: string}>();
  const { data, isLoading } = useApplication(filterParam, filterValue ?? params.application_id);
  const applicationData = data?.[0] ?? null;
  return {applicationData, isLoading}
}
