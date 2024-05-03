import React from 'react';
import { StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';

// Define the TypeScript interface for the component props
interface OwnershipStepIndicatorProps {
    currentStep: number;
    steps: string[]; // Array of titles/labels for each step
    headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Optional heading level
}

const StepsIndicator: React.FC<OwnershipStepIndicatorProps> = ({
  currentStep = 0,
  steps,
  headingLevel = 'h4'
}) => {
  // Utility function to determine the status of a step
  const getStepStatus = (stepIndex: number): 'current' | 'complete' | 'incomplete' => {
    if (currentStep === stepIndex) {
      return 'current';
    } else if (currentStep > stepIndex) {
      return 'complete';
    }
    return 'incomplete';
  };

  return (
    <StepIndicator headingLevel={headingLevel} aria-label='Step Progress'>
      {steps.map((label: string, index: number) => (
        <StepIndicatorStep
          key={index}
          label={label}
          status={getStepStatus(index)}
        />
      ))}
    </StepIndicator>
  );
};

export default StepsIndicator;
