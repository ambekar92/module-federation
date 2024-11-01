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
import { MakeApprovalFormType, Steps, ReviewSummaryType, ReviewerDecisionType } from './types';
import { Application } from '@/app/services/types/application-service/Application'

interface MakeApprovalProps {
  modalRef: RefObject<ModalRef>;
  processId: number | undefined;
  applicationData: Application | null
}

const MakeApprovalModal: React.FC<MakeApprovalProps> = ({
  modalRef, processId, applicationData
}) => {
  const methods = useForm<MakeApprovalFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      step: Steps.ReviewSummary,
      reviewSummary: {},
      approvalLetter: { approvalDecisions: undefined },
      declineLetter: { approvalDecisions: undefined },
    }
  })

  const [currentStep, setCurrentStep] = useState(Steps.ReviewSummary)
  const [reviewSummaryData, setReviewSummaryData] = useState<ReviewSummaryType | null>(null)
  const [reviewerDecisions, setReviewerDecisions] = useState<ReviewerDecisionType[]>([]);

  useEffect(() => {
    if (applicationData?.program_application) {
      const decisions = applicationData.program_application.map((program) => ({
        name: program.programs.name,
        value: program.reviewer_decision as string
      }));
      setReviewerDecisions(decisions);
    }
  }, [applicationData?.program_application]);

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
      aria-labelledby="make-approval-modal"
      aria-describedby="make-application-approval"
      isLarge
      id={'make-approval-modal'}
    >
      <ModalHeading id="make-approval-modal-heading">
        <Label htmlFor="make-approval-modal">
          <h2 className="text-bold">Make an Approval</h2>
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
            reviewerDecisions={reviewerDecisions}
            applicationData={applicationData}
            processId={processId}
            modalRef={modalRef}
            setCurrentStep={setCurrentStep}
            reviewSummaryData={reviewSummaryData}
          />
        }
        {currentStep === Steps.DeclineLetter &&
          <DeclineLetter
            reviewerDecisions={reviewerDecisions}
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

export default MakeApprovalModal
