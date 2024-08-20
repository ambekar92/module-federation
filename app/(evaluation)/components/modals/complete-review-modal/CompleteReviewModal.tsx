/* eslint-disable no-case-declarations */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Label,
  Modal,
  ModalHeading,
  ModalRef,
  StepIndicator,
  StepIndicatorStep
} from '@trussworks/react-uswds'
import React, { RefObject, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ApprovalLetter from './components/ApprovalLetter'
import DeclineLetter from './components/DeclineLetter'
import ReviewSummary from './components/ReviewSummary'
import { schema } from './schema'
import { CompleteReviewFormType, Steps, ReviewSummaryType } from './types';
import { Application } from '@/app/services/types/application-service/Application'

interface CompleteReviewProps {
  modalRef: RefObject<ModalRef>;
  processId: number | undefined;
  applicationData: Application | null
}

const CompleteReviewModal: React.FC<CompleteReviewProps> = ({
  modalRef, processId, applicationData
}) => {
  const methods = useForm<CompleteReviewFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      step: Steps.ReviewSummary,
      reviewSummary: {},
      approvalLetter: { decisions: {} },
      declineLetter: { decisions: {} },
    }
  });

  const [currentStep, setCurrentStep] = useState(Steps.ReviewSummary);
  const [reviewSummaryData, setReviewSummaryData] = useState<ReviewSummaryType | null>(null);

  function onCancel() {
    setCurrentStep(Steps.ReviewSummary)
    modalRef.current?.toggleModal()
  }

  useEffect(() => {
    methods.setValue('step', currentStep);
  }, [currentStep, methods]);

  const getStepStatus = (step: Steps) => {
    if (currentStep === step) {
      return 'current';
    }

    if (step < currentStep) {
      return 'complete';
    }

    return 'incomplete';
  };

  return (
    <Modal
      forceAction
      ref={modalRef}
      aria-labelledby="complete-review-modal"
      aria-describedby="complete-application-review"
      isLarge
      id={'complete-review-modal'}
    >
      <ModalHeading id="complete-review-modal-heading">
        <Label htmlFor="complete-review-modal">
          <h2 className="text-bold">Complete Review</h2>
        </Label>
      </ModalHeading>
      <StepIndicator
        headingLevel="h4"
        ofText="of"
        stepText="Step"
      >
        <StepIndicatorStep
          label="Step 1 Review Summary"
          status={getStepStatus(Steps.ReviewSummary)}
        />
        <StepIndicatorStep
          label="Step 2 Approval Letter(s)"
          status={getStepStatus(Steps.ApprovalLetter)}
        />
        <StepIndicatorStep
          label="Step 3 Decline Letter(s) (if applicable)"
          status={getStepStatus(Steps.DeclineLetter)}
        />
      </StepIndicator>
      <FormProvider {...methods}>
        {currentStep === Steps.ReviewSummary &&
          <ReviewSummary
            modalRef={modalRef}
            applicationData={applicationData}
            setCurrentStep={setCurrentStep}
            setReviewSummaryData={setReviewSummaryData}
          />
        }
        {currentStep === Steps.ApprovalLetter &&
          <ApprovalLetter
            applicationData={applicationData}
            processId={processId}
            modalRef={modalRef}
            setCurrentStep={setCurrentStep}
            reviewSummaryData={reviewSummaryData}
          />
        }
        {currentStep === Steps.DeclineLetter &&
          <DeclineLetter
            applicationData={applicationData}
            modalRef={modalRef}
            setCurrentStep={setCurrentStep}
            processId={processId}
            reviewSummaryData={reviewSummaryData}
          />
        }
      </FormProvider>
      <button
        type="button"
        className="usa-button usa-modal__close"
        aria-label="Close this window"
        data-close-modal
        onClick={onCancel}
      >
        x
      </button>
    </Modal>
  )
}

export default CompleteReviewModal
