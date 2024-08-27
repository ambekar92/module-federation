import { useParams } from 'next/navigation';
import { useSessionUCMS } from '@/app/lib/auth';
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useEffect, useState } from 'react';
export function useApplicationContext() {
  const params = useParams();
  const { data: session } = useSessionUCMS();
  const applicationId = parseInt(params.application_id as string, 10);
  const userId = session?.user_id;
  const [contributorId, setContributorId] = useState<number | null>(null);

  const { applicationData } = useApplicationData(ApplicationFilterType.id, applicationId);

  useEffect(() => {
    if (applicationData && userId) {
      const id = applicationData?.application_contributor.find(
        (contributor) => contributor.user_id === session.user_id
      )?.id;
      if (id) {
        setContributorId(id);
      } else {
        window.location.href = '/404';
      }
    }
  }, [applicationData, userId, session.user_id]);

  return {
    applicationId,
    userId,
    contributorId,
    applicationData
  };
}
