import { COMPLETE_EVALUATION_TASK_ROUTE, HTML_TO_PDF_ROUTE } from '@/app/constants/routes'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import { Application } from '@/app/services/types/application-service/Application'
import { DocumentTemplateType } from '@/app/services/types/document-service/DocumentTemplate'
import { HtmlToPdfDocument } from '@/app/services/types/document-service/HtmlToPdfDocument'
import Checkbox from '@/app/shared/form-builder/form-controls/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import React, { Dispatch, RefObject, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import BodyContentRenderer from '../../../BodyContentRenderer'
import { declineLetterSchema } from '../schema'
import { Decision, DeclineLetterType, MakeApprovalFormType, ReviewSummaryType, Steps } from '../types'
import { useProgramStatus } from '../useProgramStatus'

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
  const { approvedLetters, declinedLetters, declinedPrograms, isLoading } = useProgramStatus(reviewSummaryData);
  const {setValue, reset} = useFormContext<MakeApprovalFormType>();
  const { data: session } = useSessionUCMS();
  const bodyContentRef = useRef<HTMLDivElement>(null);

  const methods = useForm<DeclineLetterType>({
    resolver: zodResolver(declineLetterSchema),
    defaultValues: { approvalDecisions: false },
    shouldUnregister: true
  })

  useEffect(() => {
    if (!isLoading) {
      if (declinedLetters.length === 1 && approvedLetters[0].includes(DocumentTemplateType.generalDecline)) {
        setCurrentStep(Steps.ApprovalLetter);
      } else {
        setSupplementalLetters([DocumentTemplateType.generalDecline, ...declinedLetters.filter(letter => letter !== DocumentTemplateType.generalDecline)]);
      }
    }
  }, [declinedPrograms, declinedLetters, isLoading, setCurrentStep]);

  if(!applicationData) {
    return <h3>No application data found...</h3>
  }

  async function onViewPdf() {
    try {
      if (!bodyContentRef.current) {
        throw new Error('Body content not found');
      }

      const html = bodyContentRef.current.innerHTML;
      const payload = {
        html: html
      }

      const legalBusinessName = applicationData?.sam_entity.legal_business_name.replace(/\s+/g, '-');
      const currentProgram = declinedPrograms[currentLetterIdx];

      const response = await axiosInstance.post<HtmlToPdfDocument>(
        `${HTML_TO_PDF_ROUTE}?file_name=${legalBusinessName}-${currentProgram}_approved.pdf&upload_user_id=${session.user_id}&entity_id=${applicationData?.entity.entity_id}&document_type_id=1&document_type=approval_letters`,
        payload
      );

      if (response.data && response.data.document.path_name) {
        let fullUrl = response.data.document.path_name;
        if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
          fullUrl = `http://${fullUrl}`;
        }
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  }

  function onContinue() {
    if (currentLetterIdx === supplementalLetters.length - 1) {
      const formData = methods.getValues();
      if (!formData.approvalDecisions) {
        methods.setError('approvalDecisions', {
          type: 'manual',
          message:  'Please confirm the declination before continuing.'
        });
        return;
      }
      methods.handleSubmit(onSubmit)();
    } else {
      setCurrentLetterIdx(prevIdx => prevIdx + 1);
      console.log(supplementalLetters)
    }
  }

  function onPrevious() {
    if (currentLetterIdx > 0) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx - 1);
    } else {
      if (approvedLetters.length > 1) {
        setCurrentStep(Steps.ApprovalLetter);
      } else {
        setCurrentStep(Steps.ReviewSummary);
      }
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
          const decision = reviewSummaryData[`approval${programName}`]
          const baseDecision = {
            program_id: program.program_id,
            approved: 1
          }

          if (decision === Decision.Disagree) {
            const reviewerAppealValue = reviewSummaryData[`approvalReviewerAppeal-${programName}`] === Decision.Concur ? 1 : 0

            return {
              ...baseDecision,
              approver_decline_reason: reviewSummaryData[`approvalCommentsOnDisagreement-${programName}`],
              approver_can_appeal: reviewerAppealValue,
            }
          }

          return baseDecision
        })

        const postData = {
          process_id: processId,
          data: {
            program_decisions: JSON.stringify(programDecisions)
          }
        }

        await axiosInstance.post(COMPLETE_EVALUATION_TASK_ROUTE, postData)
        await axiosInstance.post(COMPLETE_EVALUATION_TASK_ROUTE, { process_id: processId, data: {approved: true} });

        setCurrentStep(Steps.ReviewSummary);
        reset();
        modalRef.current?.toggleModal();
        window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData?.id }) + '?name=completed-approval'
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
    } else {
      return `Continue & View ${supplementalLetters.length - currentLetterIdx - 1} Supplemental Letter${supplementalLetters.length - currentLetterIdx - 1 > 1 ? 's' : ''}`;
    }
  }

  if(isLoading) {
    return
  }

  const content = (
    <>
      <div className='display-flex flex-justify-end' style={{border: '1px solid black', borderBottom: 'none', padding: '0.5rem 1rem'}}><Button type='button' onClick={onViewPdf} outline>View PDF</Button></div>
      <div style={containerStyles}>
        <div className="body-content-renderer">
          <BodyContentRenderer applicationId={applicationData?.id} isEditable name={supplementalLetters[currentLetterIdx]} />
        </div>
      </div>
      {currentLetterIdx === supplementalLetters.length - 1 && (
        <>
          <h5>Signature</h5>
          <Checkbox<DeclineLetterType>
            name="approvalDecisions"
            label={'By clicking this checkbox, you are attesting that you’ve done a thorough review and are ready to officially approve or deny the certifications listed in this application. Once you select “Sign and Submit”, the applicant will be notified and receive their official letters.'}
          />
        </>
      )}
    </>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h4>Decline Letter(s)</h4>
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
