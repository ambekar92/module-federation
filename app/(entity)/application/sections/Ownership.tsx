import { useEffect } from 'react';
import OwnershipLayout from '../components/ownership/OwnershipLayout';
import Partnership from '../components/ownership/Partnership'
import { setDisplayStepNavigation } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { fetcherPUT } from '@/app/services/fetcher';
import { APPLICATION_ROUTE } from '@/app/constants/routes';
import { QuestionnaireProps } from '../utils/types';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';

function Ownership({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  const { applicationId } = useApplicationId();

  useEffect(() => {
    const updateProgress = async () => {
      try {
        if (applicationId) {
          const postData = {
            application_id: applicationId,
            progress: 'Ownership'
          };
          // For testing
          // const response = await fetcherPOST(APPLICATION_ROUTE, postData);
          // console.log(response);

          await fetcherPUT(APPLICATION_ROUTE, postData);
        } else {
          const customError = 'Application ID or user ID not found';
          throw customError;
        }
      } catch (error) {
        console.log('API error occurred');
      }
    };
    updateProgress();
  }, []);

  useEffect(() => {
    dispatch(setDisplayStepNavigation(true));
  }, []);

  return (
    <OwnershipLayout contributorId={contributorId}>
      <Partnership />
    </OwnershipLayout>
  )
}
export default Ownership;
