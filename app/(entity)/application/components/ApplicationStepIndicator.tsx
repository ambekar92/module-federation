import { APPLICATION_ROUTE } from '@/app/constants/routes';
import { fetcherPOST } from '@/app/services/fetcher';
import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { useEffect } from 'react';
interface ApplicationStepIndicatorProps {
	stepNumber: number
}
const steps =  ['Ownership', 'Control & Operations', 'Program Selection', 'Individual Questionnaire', 'Document Upload', 'Contributor Invitation', 'Sign'];
function ApplicationStepIndicator({stepNumber = 0}: ApplicationStepIndicatorProps) {
  const { applicationId } = useApplicationId();

  useEffect(() => {
    const updateProgress = async () => {
      try {
        if (applicationId) {
          const postData = {
            application_id: applicationId,
            progress: steps[stepNumber]
          };
          // For testing
          // const response = await fetcherPOST(APPLICATION_ROUTE, postData);
          // console.log(response);

          await fetcherPOST(APPLICATION_ROUTE, postData);
        } else {
          const customError = 'Application ID or user ID not found';
          throw customError;
        }
      } catch (error) {
        console.log('API error occurred');
      }
    };
    updateProgress();
  }, [stepNumber, applicationId]);

  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps.map(step => step)}
      headingLevel="h4"
    />
  )
}
export default ApplicationStepIndicator;
