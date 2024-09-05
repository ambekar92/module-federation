import { APPLICATION_ROUTE } from '@/app/constants/routes';
import { axiosInstance } from '@/app/services/axiosInstance';
import { useEffect } from 'react';
import { useApplicationContext } from './useApplicationContext';
import Cookies from 'js-cookie';
import { encrypt } from '@/app/shared/utility/encryption';

export const useUpdateApplicationProgress = (progress: string) => {
  const { applicationId, applicationData } = useApplicationContext();

  useEffect(() => {
    if (applicationData) {
      const simpleApplicationData = {
        id: applicationData.id,
        progress: progress,
        workflow_state: applicationData.workflow_state
      };
      Cookies.set('applicationData', encrypt(JSON.stringify([simpleApplicationData])));
    }
    const updateProgress = async () => {
      try {
        if (applicationId) {
          const postData = {
            application_id: applicationId,
            progress
          };
          await axiosInstance.put(APPLICATION_ROUTE, postData);
        } else {
          throw new Error('Application ID not found');
        }
      } catch (error) {
        console.log('API error occurred:', error);
      }
    };
    updateProgress();
  }, [applicationId, progress, applicationData]);
};
