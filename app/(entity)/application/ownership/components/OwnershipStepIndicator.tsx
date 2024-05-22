import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
interface OwnershipStepIndicatorProps {
	stepNumber: number
}
const steps =  ['Ownership', 'Control & Ownership', 'Document Upload', 'Application Questionnaire', 'Contributor Invitation', 'Sign'];
function OwnershipStepIndicator({stepNumber = 0}: OwnershipStepIndicatorProps) {

  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps.map(step => step)}
      headingLevel="h4"
    />
  )
}
export default OwnershipStepIndicator;
