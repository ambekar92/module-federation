import { useParams } from 'next/navigation';
import { useSessionUCMS } from '@/app/lib/auth';
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import { EntitiesType } from '../types/responses';
import { ENTITIES_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';

export function useApplicationContext() {
  const params = useParams();
  const { data: session } = useSessionUCMS();
  const applicationId = parseInt(params.application_id as string, 10);
  const userId = session?.user_id;
  const [contributorId, setContributorId] = useState<number | null>(null);
  const { applicationData } = useApplicationData(ApplicationFilterType.id, applicationId);
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));
  const { data: entityData } = useSWR<EntitiesType>(hasDelegateRole ? `${ENTITIES_ROUTE}?delegate_user_id=${session.user_id}` : null, fetcher);

  const isApplicationDelegate = useMemo(() => {
    if (!hasDelegateRole) {return false;}
    if (!entityData || !applicationData) {return null;}
    return entityData.some(entity => entity.sam_entity?.uei === applicationData?.sam_entity.uei);
  }, [hasDelegateRole, entityData, applicationData]);

  useEffect(() => {
    if (applicationData && userId) {
      if (hasDelegateRole && isApplicationDelegate === null) {
        return;
      }

      if (isApplicationDelegate) {
        const firstContributorId = applicationData.application_contributor[0]?.id;
        if (firstContributorId) {
          setContributorId(firstContributorId);
        } else {
          window.location.href = '/404';
        }
      } else {
        const id = applicationData.application_contributor.find(
          (contributor) => contributor.user_id === session.user_id
        )?.id;
        if (id) {
          setContributorId(id);
        } else {
          window.location.href = '/404';
        }
      }
    }
  }, [applicationData, userId, session.user_id, isApplicationDelegate, hasDelegateRole]);

  return {
    applicationId,
    userId,
    contributorId,
    applicationData,
    isApplicationDelegate
  };
}
