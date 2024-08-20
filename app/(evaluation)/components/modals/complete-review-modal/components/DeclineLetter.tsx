import React, { Dispatch, RefObject, useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import { axiosInstance } from '@/app/services/axiosInstance'
import { COMPLETE_EVALUATION_TASK_ROUTE } from '@/app/constants/routes'
import Checkbox from '@/app/shared/form-builder/form-controls/Checkbox'
import { Application } from '@/app/services/types/application-service/Application'
import { declineLetterSchema } from '../schema'
import { CompleteReviewFormType, DeclineLetterType, Steps, Decision, ReviewSummaryType } from '../types'
import BodyContentRenderer from '../../../BodyContentRenderer'
import { DocumentTemplateType } from '@/app/services/types/document-service/DocumentTemplate'
import { useProgramStatus } from '../useProgramStatus'
import { pdfTabStyles } from '../../make-approval-modal/constants'
import { formatProgramText } from '@/app/shared/utility/formatProgramText'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'

const containerStyles: React.CSSProperties = {padding: '0rem 1rem', minHeight: '20vh', maxHeight: '60vh', overflowY: 'auto', border: '1px solid black'}

interface DeclineLetterProps {
  modalRef: RefObject<ModalRef>;
  setCurrentStep: Dispatch<React.SetStateAction<number>>;
  applicationData: Application | null;
  reviewSummaryData: ReviewSummaryType | null;
  processId: number | undefined;
}

const DeclineLetter: React.FC<DeclineLetterProps> = ({
  modalRef,
  setCurrentStep,
  applicationData,
  reviewSummaryData,
  processId
}) => {
  const [currentLetterIdx, setCurrentLetterIdx] = useState<number>(0);
  const [supplementalLetters, setSupplementalLetters] = useState<DocumentTemplateType[]>([]);
  const { declinedLetters, declinedPrograms, isLoading } = useProgramStatus(reviewSummaryData);
  const {getValues, setValue, reset} = useFormContext<CompleteReviewFormType>();

  const methods = useForm<DeclineLetterType>({
    resolver: zodResolver(declineLetterSchema),
    defaultValues: getValues('declineLetter'),
    shouldUnregister: true
  })

  useEffect(() => {
    if (!isLoading) {
      if (declinedLetters.length === 0) {
        setCurrentStep(Steps.DeclineLetter);
      } else {
        setSupplementalLetters(declinedLetters);
      }
    }
  }, [declinedPrograms, declinedLetters, isLoading, setCurrentStep]);

  useEffect(() => {
    const declineLetter = getValues('declineLetter')
    methods.reset(declineLetter)
  }, [])

  if(!applicationData) {
    return <h3>No application data found...</h3>
  }

  const openContentInNewTab = () => {
    const bodyContentElement = document.querySelector('.body-content-renderer');
    if (!bodyContentElement) {
      alert('There was an error opening the content. Please try again.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${applicationData?.sam_entity.legal_business_name}_${formatProgramText(declinedPrograms[currentLetterIdx])}_approval.pdf</title>
        <style>
          ${pdfTabStyles}
        </style>
      </head>
      <body>
        <div class="page">
          <div class="content">
            ${bodyContentElement.innerHTML}
          </div>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      alert('Please allow pop-ups for this site to view the content in a new tab.');
    }
  };

  function onContinue() {
    if (currentLetterIdx < supplementalLetters.length - 1) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx + 1);
    } else {
      methods.handleSubmit(onSubmit)();
    }
  }

  function onPrevious() {
    if (currentLetterIdx > 0) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx - 1);
    }
    if(reviewSummaryData?.length === declinedPrograms.length) {
      setCurrentStep(Steps.ReviewSummary);
    } else {
      setCurrentStep(Steps.ApprovalLetter);
    }
  }

  function onCancel() {
    setCurrentStep(Steps.ReviewSummary);
    reset();
    modalRef.current?.toggleModal();
  }

  async function onSubmit(formData: DeclineLetterType) {
    try {
      setValue('declineLetter', formData)

      if (processId !== undefined && reviewSummaryData) {
        const programApplication = applicationData?.program_application || []
        const programDecisions = programApplication.map((program) => {
          const programName = program.programs.name
          const decision = reviewSummaryData[programName]
          const baseDecision = {
            program_id: program.program_id,
            approved: decision === Decision.Concur ? 1 : 0,
          }

          if (decision === Decision.Disagree) {
            const reviewerAppealValue = reviewSummaryData[`reviewerAppeal-${programName}`] === Decision.Concur ? 1 : 0

            return {
              ...baseDecision,
              reviewer_decline_reason: reviewSummaryData[`commentsOnDisagreement-${programName}`],
              reviewer_can_appeal: reviewerAppealValue,
            }
          }

          return baseDecision
        })

        const postData = {
          process_id: processId,
          data: {
            program_decisions: programDecisions
          }
        }

        await axiosInstance.post(COMPLETE_EVALUATION_TASK_ROUTE, postData)

        setCurrentStep(Steps.ReviewSummary);
        reset();
        modalRef.current?.toggleModal();
        window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData?.id }) + '?name=completed-review'
      } else {
        throw new Error('Process id not found or review summary data is missing')
      }
    } catch (err) {
      alert('An error has occurred, please contact help desk.')
    }
  }

  function getContinueButtonTxt() {
    if (currentLetterIdx === supplementalLetters.length - 1) {
      return 'Sign and Submit';
    }
    return 'Continue';
  }

  if(isLoading) {
    return
  }

  const content = (
    <>
      <div className='display-flex flex-justify-end' style={{border: '1px solid black', borderBottom: 'none', padding: '0.5rem 1rem'}}><Button type='button' onClick={openContentInNewTab} outline>View PDF</Button></div>
      <div style={containerStyles}>
        <BodyContentRenderer isEditable name={supplementalLetters[currentLetterIdx]} />
      </div>
      <h5>Signature</h5>
      {declinedPrograms.map((program, index) => (
        <div key={program} style={{ display: index === currentLetterIdx ? 'block' : 'none' }}>
          <Checkbox<DeclineLetterType>
            {...methods.register(`decisions.${program}`)}
            label={`I have reviewed and decline the ${program.replace('_', ' ')} certification.`}
          />
        </div>
      ))}
    </>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h4>Decline Letter(s)</h4>
        {supplementalLetters.length > 0 && <p>Decline Letter {currentLetterIdx + 1} of {supplementalLetters.length}</p>}
        {content}

        <ModalFooter style={{ marginTop: '3rem' }}>
          <ButtonGroup style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', gap: '1rem'}}>
              <Button
                type="button"
                onClick={onPrevious}
                outline
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={onContinue}
              >
                {getContinueButtonTxt()}
              </Button>
            </div>
            <Button
              type="button"
              onClick={onCancel}
              outline
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </form>
    </FormProvider>
  )
}

export default DeclineLetter
