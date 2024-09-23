import StepsIndicator from '@/app/shared/components/forms/StepsIndicator'
import { useSessionUCMS } from '@/app/lib/auth'


interface ApplicationStepIndicatorProps {
  stepNumber: number
}

function ApplicationStepIndicator({
  stepNumber = 0,
}: ApplicationStepIndicatorProps) {
  const session = useSessionUCMS()

  const userRole: string = session?.data.permissions?.[session?.data.permissions.length - 1]?.slug || ''

  let steps = [
    'Individual Questionnaire',
    'Document Upload',
    'Sign',
  ]

  if ( userRole === 'primary_qualifying_owner' || userRole === 'delegate' ) {
    steps = [
      // 'Entity-Owned',
      'Ownership',
      'Control & Operations',
      'Program Selection',
      'Individual Questionnaire',
      'Document Upload',
      'Contributor Invitation',
      'Sign',
    ]
  }

  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps.map((step) => step)}
      headingLevel="h4"
    />
  )
}
export default ApplicationStepIndicator
