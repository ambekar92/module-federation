import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import React, { Dispatch, RefObject, useEffect } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { reviewSummarySchema } from '../schema'
import { Decision, MakeApprovalFormType, ReviewSummaryType, Steps } from '../types'

const ReviewSummary = ({modalRef, setCurrentStep, processId}: {modalRef: RefObject<ModalRef>, setCurrentStep: Dispatch<React.SetStateAction<number>>, processId: number | undefined}) => {
  const {getValues, setValue, reset} = useFormContext<MakeApprovalFormType>()

  const methods = useForm<ReviewSummaryType>(
    {
      defaultValues: getValues('certifications'),
      shouldUnregister: true,
      resolver: zodResolver(reviewSummarySchema)
    }
  )
  useEffect(() => {
    const certifications = getValues('certifications')
    methods.reset(certifications)
  }, [])

  async function onContinue(formData: ReviewSummaryType) {
    try {
      setValue('certifications', formData);
      setCurrentStep(Steps.ApprovalLetter);
    } catch (err) {
      // Error handled -KJ
    }
  }

  function onCancel() {
    setCurrentStep(1);
    reset();
    modalRef.current?.toggleModal();
  }

  const getDecisionText = (decision: Decision | null) => {
    if (decision === Decision.Concur) {return 'Approved';}
    if (decision === Decision.Disagree) {return 'Decline';}
    return 'Pending';
  };

  const vosb = methods.watch('approvalVosb')
  const eight_a = methods.watch('approvalEight_a')
  const edwosb = methods.watch('approvalEdwosb')
  const hubZone = methods.watch('approvalHubZone')

  return (
    <FormProvider {...methods}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <span>Certification</span>
        <span>Recommendation</span>
        <span>Make Decision</span>
      </div>
      <hr />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
        <div>
          <strong>8(a) Certification</strong>
        </div>
        <div>
          <span>{getDecisionText(eight_a)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ToggleButtonGroup<ReviewSummaryType, string>
            style={{ display: 'flex', gap: '0.5rem' }}
            name='approvalEight_a'
            options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
            label={''} />
        </div>
      </div>
      {(eight_a === 'disagree') && <div>
        <TextArea<ReviewSummaryType>
          required={true}
          name='approvalCommentsOnDisagreementEight_a'
          label='Provide more information about your disagreement'
        />
      </div>}
      {(eight_a === 'disagree') && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToggleButtonGroup<ReviewSummaryType, string>
          style={{ display: 'flex', gap: '0.5rem' }}
          name='approvalReviewerAppealEight_a'
          label='Can the applicant appeal this decision?'
          required
          grid
          options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
        />
      </div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
        <div>
          <strong>VOSB Certification</strong>
        </div>
        <div>
          <span>{getDecisionText(vosb)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ToggleButtonGroup<ReviewSummaryType, string>
            style={{ display: 'flex', gap: '0.5rem' }}
            name='approvalVosb'
            options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
            label={''} />
        </div>
      </div>
      {(vosb === 'disagree') && <div>
        <TextArea<ReviewSummaryType>
          required={true}
          name='approvalCommentsOnDisagreementVosb'
          label='Provide more information about your disagreement'
        />
      </div>}
      {(vosb === 'disagree') && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToggleButtonGroup<ReviewSummaryType, string>
          style={{ display: 'flex', gap: '0.5rem' }}
          name='approvalReviewerAppealVosb'
          label='Can the applicant appeal this decision?'
          required
          grid
          options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
        />
      </div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
        <div>
          <strong>EDWOSB Certification</strong>
        </div>
        <div>
          <span>{getDecisionText(edwosb)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ToggleButtonGroup<ReviewSummaryType, Decision>
            style={{ display: 'flex', gap: '0.5rem' }}
            name='approvalEdwosb'
            options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
            label={''} />
        </div>
      </div>
      {(edwosb === 'disagree') && <div>
        <TextArea<ReviewSummaryType>
          required={true}
          name='approvalCommentsOnDisagreementEdwosb'
          label='Provide more information about your disagreement'
        />
      </div>}
      {(edwosb === 'disagree') && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToggleButtonGroup<ReviewSummaryType, string>
          style={{ display: 'flex', gap: '0.5rem' }}
          name='approvalReviewerAppealEdwosb'
          label='Can the applicant appeal this decision?'
          grid
          required
          options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
        />
      </div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
        <div>
          <strong>HUBZone Certification</strong>
        </div>
        <div>
          <span>{getDecisionText(hubZone)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ToggleButtonGroup<ReviewSummaryType, string>
            style={{ display: 'flex', gap: '0.5rem' }}
            name='approvalHubZone'
            options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
            label={''} />
        </div>
      </div>
      {(hubZone === 'disagree') && <div>
        <TextArea<ReviewSummaryType>
          required={true}
          name='approvalCommentsOnDisagreementHubZone'
          label='Provide more information about your disagreement'
        />
      </div>}
      {(hubZone === 'disagree') && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToggleButtonGroup<ReviewSummaryType, string>
          style={{ display: 'flex', gap: '0.5rem' }}
          name='approvalReviewerAppealHubZone'
          label='Can the applicant appeal this decision?'
          grid
          required
          options={[{ label: 'Concur', value: Decision.Concur }, { label: 'Disagree', value: Decision.Disagree }]}
        />
      </div>}
      <ModalFooter style={{ marginTop: '3rem' }}>
        <ButtonGroup style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            type="submit"
            onClick={methods.handleSubmit(onContinue)}
          >
            Continue
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            outline
          >
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </FormProvider>
  )
}

export default ReviewSummary
