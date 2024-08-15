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
import React, { RefObject, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ApprovalLetter from './components/ApprovalLetter'
import DeclineLetter from './components/DeclineLetter'
import ReviewSummary from './components/ReviewSummary'
import { schema } from './schema'
import { MakeApprovalFormType, Steps } from './types';
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

  })
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <Modal
      forceAction
      ref={modalRef}
      aria-labelledby="modal-heading"
      aria-describedby="modal-description"
      isLarge
      id={'complete-review-modal'}
    >
      <ModalHeading id="complete-review-modal-heading">
        <Label htmlFor="complete-review-modal">
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
          status={currentStep === Steps.ReviewSummary ? 'current' : methods.getValues('certifications') ? 'complete' : 'incomplete'}
        />
        <StepIndicatorStep
          label="Step 2 Approval Letter(s)"
          status={currentStep === Steps.ApprovalLetter ? 'current' : methods.getValues('approvalLetter.approvalDecision') ? 'complete' : 'incomplete'}
        />
        <StepIndicatorStep
          label="Step 3 Decline Letter(s) (if applicable)"
          status={currentStep === Steps.DeclineLetter ? 'current' : methods.getValues('declineLetter.approvalDecision') ? 'complete' : 'incomplete'}
        />
      </StepIndicator>
      <FormProvider {...methods}>

        {currentStep === Steps.ReviewSummary &&
           <ReviewSummary modalRef={modalRef} processId={processId} setCurrentStep={setCurrentStep} />
        }

        {currentStep === Steps.ApprovalLetter &&
          <ApprovalLetter applicationData={applicationData} modalRef={modalRef} setCurrentStep={setCurrentStep} />}

        {currentStep === Steps.DeclineLetter && <DeclineLetter applicationData={applicationData} modalRef={modalRef} setCurrentStep={setCurrentStep} />}
      </FormProvider>

    </Modal>
  )
}

export default MakeApprovalModal
