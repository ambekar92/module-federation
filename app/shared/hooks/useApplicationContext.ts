import { useParams } from 'next/navigation';
import { useSessionUCMS } from '@/app/lib/auth';
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import useSWR from 'swr';

export function useApplicationContext() {
  const params = useParams();
  const { data: session } = useSessionUCMS();
  const applicationId = parseInt(params.application_id as string, 10);
  const userId = session?.user_id;

  const { applicationData } = useApplicationData(ApplicationFilterType.id, applicationId);

  const { data: contributorId } = useSWR(
    applicationData ? [applicationId, userId] : null,
    () => {
      const contributor = applicationData?.application_contributor.find(
        (contributor) => contributor.user_id === userId
      );
      return contributor ? contributor.id : null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      shouldRetryOnError: false,
      errorRetryCount: 0
    }
  );

  return {
    applicationId,
    userId,
    contributorId,
    applicationData
  };
}
