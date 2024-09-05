import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ENTITIES_ROUTE } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { encrypt } from '@/app/shared/utility/encryption';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { EntitiesType } from '../types/responses';

export function useApplicationContext() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSessionUCMS();
  const applicationId = parseInt(params.application_id as string, 10);
  const userId = session?.user_id;
  const [contributorId, setContributorId] = useState<number | null>(null);
  const { applicationData } = useApplicationData(ApplicationFilterType.id, applicationId);
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));
  const { data: entityData } = useSWR<EntitiesType>(hasDelegateRole ? `${ENTITIES_ROUTE}?delegate_user_id=${session.user_id}` : null);

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
          router.push('/404');
          return;
        }
      } else {
        const id = applicationData.application_contributor.find(
          (contributor) => contributor.user_id === session.user_id
        )?.id;
        if (id) {
          setContributorId(id);
        } else {
          router.push('/404');
          return;
        }
      }

      // Save cookies
      if (session.permissions && session.permissions.length > 0) {
        Cookies.set('firstPermission', encrypt(session.permissions[0].slug));
        Cookies.set('lastPermission', encrypt(session.permissions[session.permissions.length - 1].slug));
      }

      if (entityData && entityData.length > 0) {
        const simpleEntityData = entityData.map(entity => ({ id: entity.id }));
        Cookies.set('entityData', encrypt(JSON.stringify(simpleEntityData)));
      }
    }
  }, [applicationData, userId, session, isApplicationDelegate, hasDelegateRole, entityData, router]);

  return {
    applicationId,
    userId,
    contributorId,
    applicationData,
    isApplicationDelegate
  };
}
