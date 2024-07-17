import { APPLICATION_ROUTE } from '@/app/constants/routes';
import { fetcherGET } from '@/app/services/fetcher';
import { Application } from '@/app/services/types/application';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export function useApplicationData() {
  const params = useParams<{application_id: string}>();
  const { data, isLoading } = useSWR(`${APPLICATION_ROUTE}?application_type_id=${params.application_id}`, fetcherGET<Application[]>);
  const applicationData = data?.[0] ?? null;
  return {applicationData, isLoading}
}
