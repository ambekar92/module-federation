import { StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';
import { selectForm } from '../store/formSlice';
import { useFormSelector } from '../store/hooks';
import { formSteps } from '../utils/types';

const OwnershipStepIndicator = () => {
  const { currentStep } = useFormSelector(selectForm);

  return (
    <StepIndicator
      headingLevel='h4'
    >

      <StepIndicatorStep
        label={formSteps[0].name}
        aria-label='progress'
        status={currentStep === 0 && 'current' || currentStep > 0 && 'complete' || 'incomplete'}
      />

      <StepIndicatorStep
        label={formSteps[1].name}
        aria-label='progress'
        status={currentStep === 1 && 'current' || currentStep > 1 && 'complete' || currentStep < 1 && 'incomplete' || 'incomplete'}
      />

      <StepIndicatorStep
        label={formSteps[2].name}
        aria-label='progress'
        status={currentStep === 2 && 'current' || currentStep > 2 && 'complete' || currentStep < 2 && 'incomplete' || 'incomplete'}
      />

      <StepIndicatorStep
        label={formSteps[3].name}
        status={currentStep === 3 && 'current' || currentStep > 3 && 'complete' || currentStep < 3 && 'incomplete' || 'incomplete'}
      />

    </StepIndicator>
  )
}
export default OwnershipStepIndicator;
