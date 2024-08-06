import StepsIndicator from '@/app/shared/components/forms/StepsIndicator'
interface ApplicationStepIndicatorProps {
  stepNumber: number
}
const steps = [
  'Entity-Owned',
  'Ownership',
  'Control & Operations',
  'Program Selection',
  'Individual Questionnaire',
  'Document Upload',
  'Contributor Invitation',
  'Sign',
]
function ApplicationStepIndicator({
  stepNumber = 0,
}: ApplicationStepIndicatorProps) {
  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps.map((step) => step)}
      headingLevel="h4"
    />
  )
}
export default ApplicationStepIndicator
