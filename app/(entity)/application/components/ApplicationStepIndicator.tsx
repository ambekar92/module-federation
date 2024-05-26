import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
interface ApplicationStepIndicatorProps {
	stepNumber: number
}
const steps =  ['Ownership', 'Eligible Programs', 'Control & Operations', 'Application Questionnaire', 'Document Upload', 'Sign'];
function ApplicationStepIndicator({stepNumber = 0}: ApplicationStepIndicatorProps) {

  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps.map(step => step)}
      headingLevel="h4"
    />
  )
}
export default ApplicationStepIndicator;
