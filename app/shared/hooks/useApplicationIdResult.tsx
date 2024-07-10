import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getEntityByUserId from '../utility/getEntityByUserId';
import getApplicationId from '../utility/getApplicationId';
import getApplicationContributorId from '../utility/getApplicationContributorId';

interface UseApplicationIdResult {
  userId: number | null;
  applicationId: number | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
	userEmail: string | null;
	contributorId: number | null;
	entityId:  number | null;
}

export function useApplicationId(): UseApplicationIdResult {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [contributorId, setContributorId] = useState<number | null>(null);
  const [entityId, setEntityId] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id);
      setUserEmail(session.user.email);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchApplicationId = async () => {
      if (userId) {
        try {
          const entityData = await getEntityByUserId(userId);
          if (!entityData || entityData.length === 0) {
            throw new Error('Entity data not found');
          }
          setEntityId(entityData[entityData.length-1].id)

          const applicationData = await getApplicationId(entityData[entityData.length - 1].id);
          if (!applicationData || applicationData.length === 0) {
            throw new Error('Application data not found');
          }
          // Get ID of the last item returned from applicationData
          const appId = applicationData[applicationData.length - 1].id;
          setApplicationId(appId);

          // Use id from application to get contributors for application
          const contributorsData = await getApplicationContributorId(appId);
          if (contributorsData) {
            // Get & Set the ID of the last item returned from contributorsData
            setContributorId(contributorsData[contributorsData.length - 1].id);
            // console.log(contributorsData[contributorsData.length-1].id)
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Application ID or user ID not found')
        }
      }
    };

    fetchApplicationId();
  }, [userId]);

  return { userId, applicationId, status, userEmail, contributorId, entityId };
}
