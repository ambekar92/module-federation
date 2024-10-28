import { APPLICATION_CONTRIBUTORS_ROUTE } from '@/app/constants/local-routes';
import { useEffect, useRef, useMemo } from 'react';
import { useApplicationContext } from './useApplicationContext';
import Cookies from 'js-cookie';
import { encrypt } from '@/app/shared/utility/encryption';
import axios from 'axios';
import { useSessionUCMS } from '@/app/lib/auth';
/**
 * Updates the progress of an application in the database, and also in
 * the user's cookies.
 *
 * @param {string} progress - the new progress value to set
 *
 * @returns {void}
*/
export const useUpdateApplicationProgress = (progress: string) => {
  const { applicationId, applicationData } = useApplicationContext();
  const previousProgressRef = useRef(progress);
  const updateMadeRef = useRef(false);
  const session = useSessionUCMS();

  const memoizedProgress = useMemo(() => progress, [progress]);

  useEffect(() => {
    // console.log('applicationData', memoizedProgress, previousProgressRef.current);
    if (applicationData) {
      const simpleApplicationData = {
        id: applicationData.id,
        progress: memoizedProgress,
        workflow_state: applicationData.workflow_state
      };
      Cookies.set('applicationData', encrypt(JSON.stringify([simpleApplicationData])));

      const updateProgress = async () => {
        if (updateMadeRef.current) {return;}

        try {
          if (applicationId) {
            updateMadeRef.current = true;
            const applicationContributors = session?.data.applications
            const contributor = applicationContributors.filter((contributor) => contributor.application_id === applicationId);

            const response = await axios.put(APPLICATION_CONTRIBUTORS_ROUTE + `/${contributor[0].id}`, {
              progress: memoizedProgress
            });
            if (!response.data) {
              throw new Error('Failed to update application progress');
            }
          } else {
            throw new Error('Application ID not found');
          }
        } catch (error) {
          if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
            console.error('API error occurred:', error);
          }
        } finally {
          updateMadeRef.current = false;
        }
      };

      updateProgress();
      previousProgressRef.current = memoizedProgress;
    }
  }, [applicationId, applicationData, memoizedProgress]);
};
