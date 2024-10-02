import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { useSessionUCMS } from '@/app/lib/auth';
import { GET_APPLICATIONS_ROUTE, GET_ENTITIES_ROUTE } from '@/app/constants/local-routes';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { encrypt } from '@/app/shared/utility/encryption';
import Cookies from 'js-cookie';
import { useMemo, useEffect, useState } from 'react';
import { EntitiesType } from '../types/responses';
import { Application } from '@/app/services/types/application-service/Application';

export function useApplicationContext() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSessionUCMS();
  const applicationId = parseInt(params.application_id as string, 10);
  const userId = session?.user_id;
  const [contributorId, setContributorId] = useState<number | null>(null);

  const { data: applicationData, error: applicationError } = useSWR<Application[]>(
    applicationId ? `${GET_APPLICATIONS_ROUTE}?${ApplicationFilterType.id}=${applicationId}` : null
  );

  const hasDelegateRole = useMemo(() =>
    session?.permissions?.some(permission => permission.slug.includes('delegate')),
  [session?.permissions]
  );

  const { data: entityData, error: entityError } = useSWR<EntitiesType>(
    hasDelegateRole && session?.user_id ? `${GET_ENTITIES_ROUTE}?delegate_user_id=${session.user_id}` : null
  );

  const isApplicationDelegate = useMemo(() => {
    if (!hasDelegateRole) {return false;}
    if (!entityData || !applicationData?.[0]) {return null;}
    return entityData.some(entity => entity.sam_entity?.uei === applicationData[0]?.sam_entity.uei);
  }, [hasDelegateRole, entityData, applicationData]);

  useEffect(() => {
    if (applicationData?.[0] && userId) {
      if (hasDelegateRole && isApplicationDelegate === null) {
        return;
      }
      if (isApplicationDelegate) {
        const firstContributorId = applicationData[0].application_contributor[0]?.id;
        if (firstContributorId) {
          setContributorId(firstContributorId);
        } else {
          router.push('/404');
          return;
        }
      } else {
        const id = applicationData[0].application_contributor.find(
          (contributor) => contributor.user_id === session.user_id
        )?.id;
        if (id) {
          setContributorId(id);
        } else {
          router.push('/404');
          return;
        }
      }
    }
  }, [applicationData, userId, session, isApplicationDelegate, hasDelegateRole, entityData, router]);

  return {
    applicationId,
    userId,
    contributorId,
    applicationData: applicationData?.[0] ?? null,
    isApplicationDelegate,
    isLoading: (!applicationData && !applicationError) || (hasDelegateRole && !entityData && !entityError),
    isError: !!applicationError || !!entityError
  };
}
