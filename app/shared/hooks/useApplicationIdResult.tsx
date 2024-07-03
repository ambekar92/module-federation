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
}

export function useApplicationId(): UseApplicationIdResult {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

          const applicationData = await getApplicationId(entityData[0].id);
          if (!applicationData || applicationData.length === 0) {
            throw new Error('Application data not found');
          }

          const appId = await getApplicationContributorId(applicationData[0].id);
          if (appId && appId.length > 0) {
            setApplicationId(appId[appId.length - 1].id);
          }
        } catch (error) {
          console.log('Application ID or user ID not found')
        }
      }
    };

    fetchApplicationId();
  }, [userId]);

  return { userId, applicationId, status, userEmail };
}
