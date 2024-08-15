import StepsIndicator from '@/app/shared/components/forms/StepsIndicator'
interface EvaluationStepIndicatorProps {
  stepNumber: number
}
const steps = [
  'Screening',
  'Analysis',
  'Review',
  'Final Review'
]
function EvaluationStepIndicator({
  stepNumber = 0,
}: EvaluationStepIndicatorProps) {
  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps.map((step) => step)}
      headingLevel="h4"
    />
  )
}
export default EvaluationStepIndicator
