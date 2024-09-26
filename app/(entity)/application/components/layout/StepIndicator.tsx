'use client'
import React from 'react'
import Link from 'next/link'
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext'

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  stepLinks?: string[]
}

const StepsIndicator: React.FC<StepIndicatorProps> = ({
  currentStep = 0,
  steps,
  headingLevel: HeadingTag = 'h4',
  stepLinks,
}) => {
  const { applicationData } = useApplicationContext();

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="usa-step-indicator" data-testid="step-indicator" aria-label="progress">
      <ol className="usa-step-indicator__segments">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`usa-step-indicator__segment maxw-full width-full ${
              index === currentStep
                ? 'usa-step-indicator__segment--current'
                : index < currentStep
                  ? 'usa-step-indicator__segment--complete'
                  : ''
            }`}
            aria-current={index === currentStep ? 'true' : undefined}
          >
            <span className="usa-step-indicator__segment-label">
              {(applicationData || index < currentStep) && stepLinks && stepLinks[index] ? (
                <Link
                  href={stepLinks[index]}
                  className="usa-step-indicator__segment-label"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {step}
                </Link>
              ) : (
                <>
                  {step}
                  {index > currentStep && <span className="usa-sr-only">not completed</span>}
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
      <div className="usa-step-indicator__header">
        <HeadingTag className="usa-step-indicator__heading">
          <span className="usa-step-indicator__heading-counter">
            <span className="usa-sr-only" data-testid="step-text">Step</span>
            <span className="usa-step-indicator__current-step">{currentStep + 1}</span>
            &nbsp;
            <span className="usa-step-indicator__total-steps">of {steps.length}</span>
            &nbsp;
          </span>
          <span className="usa-step-indicator__heading-text">{steps[currentStep]}</span>
        </HeadingTag>
      </div>
    </div>
  )
}

export default StepsIndicator
