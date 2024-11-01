import { Application } from '@/app/services/types/application-service/Application'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import React, { Dispatch, RefObject, useMemo } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { generateReviewSummarySchema } from '../schema'
import { Decision, MakeApprovalFormType, ReviewSummaryType, Steps } from '../types'
import { capitalize } from '@mui/material'

interface ReviewSummaryProps {
  modalRef: RefObject<ModalRef>;
  setCurrentStep: Dispatch<React.SetStateAction<number>>;
  applicationData: Application | null;
  setReviewSummaryData: Dispatch<React.SetStateAction<ReviewSummaryType | null>>;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  modalRef,
  setCurrentStep,
  applicationData,
  setReviewSummaryData
}) => {
  const { getValues, setValue } = useFormContext<MakeApprovalFormType>();
  const programApplication = applicationData?.program_application || []

  const reviewSummarySchema = useMemo(() => generateReviewSummarySchema(applicationData?.program_application || []), [applicationData?.program_application])

  const defaultValues = useMemo(() => {
    const currentValues = getValues('reviewSummary') || {}
    return applicationData?.program_application.reduce((acc, program) => {
      const programName = program.programs.name
      acc[`approval${programName}`] = currentValues[`approval${programName}`] || undefined
      acc[`approvalCommentsOnDisagreement-${programName}`] = currentValues[`approvalCommentsOnDisagreement-${programName}`] || ''
      acc[`approvalReviewerAppeal-${programName}`] = currentValues[`approvalReviewerAppeal-${programName}`] || undefined
      return acc
    }, {} as Record<string, any>)
  }, [applicationData?.program_application, getValues])

  const methods = useForm<ReviewSummaryType>({
    defaultValues,
    resolver: zodResolver(reviewSummarySchema),
    mode: 'onChange'
  })

  async function onContinue(formData: ReviewSummaryType) {
    setValue('step', Steps.ApprovalLetter)
    setValue('reviewSummary', formData)

    setReviewSummaryData(formData)
    setCurrentStep(Steps.ApprovalLetter)
  }

  function onCancel() {
    setCurrentStep(1)
    modalRef.current?.toggleModal()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onContinue)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <span>Certification</span>
          <span>Recommendation</span>
          <span>Make Decision</span>
        </div>
        <hr />
        {programApplication.map((program) => {
          const programName = program.programs.name

          return (
            <React.Fragment key={program.id}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
                <div className='padding-right-1'>
                  <strong>{program.programs.title}</strong>
                </div>
                <div>
                  <span>
                    {capitalize(program.reviewer_decision ? program.reviewer_decision.replace('approved', 'Approve') : '')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Controller
                    name={`approval${programName}`}
                    control={methods.control}
                    render={({ field }) => (
                      <ToggleButtonGroup<ReviewSummaryType, string>
                        {...field}
                        style={{ display: 'flex', gap: '0.5rem' }}
                        options={[
                          { label: 'Concur', value: Decision.Concur },
                          { label: 'Disagree', value: Decision.Disagree }
                        ]}
                        label={''}
                      />
                    )}
                  />
                </div>
              </div>
              {methods.watch(`approval${programName}`) === Decision.Disagree && (
                <>
                  <div>
                    <TextArea<ReviewSummaryType>
                      name={`approvalCommentsOnDisagreement-${programName}`}
                      label='Provide more information about your disagreement'
                    />
                  </div>
                </>
              )}
              {['eight_a', 'sd_vosb', 'vosb'].includes(program.programs.name) &&
                  (methods.watch(`approval${programName}`) === Decision.Disagree) && (
							  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
							    <Controller
							      name={`approvalReviewerAppeal-${programName}`}
							      control={methods.control}
							      render={({ field }) => (
							        <ToggleButtonGroup<ReviewSummaryType, string>
							          {...field}
							          style={{ display: 'flex', gap: '0.5rem' }}
							          label='Can the applicant appeal this decision?'
							          grid
							          options={[
							            { label: 'Yes', value: Decision.Concur },
							            { label: 'No', value: Decision.Disagree }
							          ]}
							        />
							      )}
							    />
							  </div>
              )}
            </React.Fragment>
          )
        })}
        <ModalFooter style={{ marginTop: '3rem' }}>
          <ButtonGroup style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button type="submit">
              Continue
            </Button>
            <Button type="button" onClick={onCancel} outline>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </form>
    </FormProvider>
  )
}

export default ReviewSummary
