import React, { Dispatch, RefObject, useEffect } from 'react'
import { CompleteReviewFormType, Desicion, ReviewSummaryType, Steps } from '../types'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSummarySchema } from '../schema'

const ReviewSummary = ({modalRef, setCurrentStep}: {modalRef: RefObject<ModalRef>, setCurrentStep: Dispatch<React.SetStateAction<number>>}) => {
    const {getValues, setValue, reset} = useFormContext<CompleteReviewFormType>()

   
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

    function onContinue(formData: ReviewSummaryType) {
        setValue('certifications', formData)
        setCurrentStep(Steps.ApprovalLetter);
    }

    function onCancel() {
        setCurrentStep(1);
        reset();
        modalRef.current?.toggleModal();
    }

    const vosb = methods.watch('vosb')
    const eight_a = methods.watch('eight_a')
    const edwosb = methods.watch('edwosb')
    const hubZone = methods.watch('hubZone')

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
                    <span>[currentDecision]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ToggleButtonGroup<ReviewSummaryType, string>
                        style={{ display: 'flex', gap: '0.5rem' }}
                        name='eight_a'
                        options={[{ label: 'Concur', value: Desicion.Concur }, { label: 'Disagree', value: Desicion.Disagree }]}
                        label={''} />
                </div>
            </div>
            {(eight_a === 'disagree') && <div>
                <TextArea<ReviewSummaryType>
                    required={true}
                    name='commentsOnDisagreementEight_a'
                    label='Provide more information about your disagreement'
                />
            </div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
                <div>
                    <strong>VOSB Certification</strong>
                </div>
                <div>
                    <span>[currentDecision]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ToggleButtonGroup<ReviewSummaryType, string>
                        style={{ display: 'flex', gap: '0.5rem' }}
                        name='vosb'
                        options={[{ label: 'Concur', value: Desicion.Concur }, { label: 'Disagree', value: Desicion.Disagree }]}
                        label={''} />
                </div>
            </div>
            {(vosb === 'disagree') && <div>
                <TextArea<ReviewSummaryType>
                    required={true}
                    name='commentsOnDisagreementVosb'
                    label='Provide more information about your disagreement'
                />
            </div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
                <div>
                    <strong>EDWOSB Certification</strong>
                </div>
                <div>
                    <span>[currentDecision]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ToggleButtonGroup<ReviewSummaryType, Desicion>
                        style={{ display: 'flex', gap: '0.5rem' }}
                        name='edwosb'
                        options={[{ label: 'Concur', value: Desicion.Concur }, { label: 'Disagree', value: Desicion.Disagree }]}
                        label={''} />
                </div>
            </div>
            {(edwosb === 'disagree') && <div>
                <TextArea<ReviewSummaryType>
                    required={true}
                    name='commentsOnDisagreementEdwosb'
                    label='Provide more information about your disagreement'
                />
            </div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'baseline' }}>
                <div>
                    <strong>HUBZone Certification</strong>
                </div>
                <div>
                    <span>[currentDecision]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ToggleButtonGroup<ReviewSummaryType, string>
                        style={{ display: 'flex', gap: '0.5rem' }}
                        name='hubZone'
                        options={[{ label: 'Concur', value: Desicion.Concur }, { label: 'Disagree', value: Desicion.Disagree }]}
                        label={''} />
                </div>
            </div>
            {(hubZone === 'disagree') && <div>
                <TextArea<ReviewSummaryType>
                    required={true}
                    name='commentsOnDisagreementHubZone'
                    label='Provide more information about your disagreement'
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