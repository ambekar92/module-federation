import { APPLICATION_ROUTE } from '@/app/constants/routes';
import { axiosInstance } from '@/app/services/axiosInstance';
import { useEffect } from 'react';
import { useApplicationId } from './useApplicationIdResult';

export const useUpdateApplicationProgress = (progress: string) => {
  const { applicationId } = useApplicationId();

  useEffect(() => {
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
  }, [applicationId, progress]);
};
