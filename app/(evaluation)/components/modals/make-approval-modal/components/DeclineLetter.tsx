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
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import BodyContentRenderer from '../../../BodyContentRenderer'
import { declineLetterSchema } from '../schema'
import { Decision, DeclineLetterType, MakeApprovalFormType, ReviewSummaryType, Steps } from '../types'
import { useProgramStatus } from '../useProgramStatus'
import { formatProgramText } from '@/app/shared/utility/formatProgramText'

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
  const {getValues, setValue, reset} = useFormContext<MakeApprovalFormType>();
  const { data: session } = useSessionUCMS();
  const bodyContentRef = useRef<HTMLDivElement>(null);

  const methods = useForm<DeclineLetterType>({
    resolver: zodResolver(declineLetterSchema),
    defaultValues: getValues('declineLetter'),
    shouldUnregister: true
  })

  const currentProgram = declinedPrograms[currentLetterIdx];
  const currentDecision = useWatch({
    control: methods.control,
    name: `approvalDecisions.${currentProgram}`,
  });

  useEffect(() => {
    if (currentDecision) {
      methods.clearErrors(`approvalDecisions.${currentProgram}`);
    }
  }, [currentDecision, currentProgram, methods]);

  useEffect(() => {
    if (!isLoading) {
      if (declinedLetters.length === 0) {
        setCurrentStep(Steps.ApprovalLetter);
      } else {
        setSupplementalLetters([DocumentTemplateType.generalDecline, ...declinedLetters.filter(letter => letter !== DocumentTemplateType.generalDecline)]);
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

  async function onViewPdf() {
    try {
      if (!bodyContentRef.current) {
        throw new Error('Body content not found');
      }

      const html = bodyContentRef.current.innerHTML;
      const formData = new URLSearchParams();
      formData.append('html', html);
      formData.append('internal_document', 'true');

      const legalBusinessName = applicationData?.sam_entity.legal_business_name.replace(/\s+/g, '-');
      const currentProgram = declinedPrograms[currentLetterIdx];

      const response = await axiosInstance.post<HtmlToPdfDocument>(
        `${HTML_TO_PDF_ROUTE}?file_name=${legalBusinessName}-${currentProgram}_declined.pdf&upload_user_id=${session.user_id}&entity_id=${applicationData?.entity.entity_id}&document_type_id=1`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
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
      methods.handleSubmit(onSubmit)();
    } else {
      if (currentLetterIdx > 0) {
        const formData = methods.getValues();
        const currentProgram = declinedPrograms[currentLetterIdx - 1];
        if (!formData.approvalDecisions[currentProgram]) {
          methods.setError(`approvalDecisions.${currentProgram}`, {
            type: 'manual',
            message: 'Please decline the certification before continuing.'
          });
          return;
        }
      }
      setCurrentLetterIdx(prevIdx => prevIdx + 1);
    }
  }

  function onPrevious() {
    if (currentLetterIdx > 0) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx - 1);
    } else {
      if (approvedLetters.length > 0) {
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
            approved: decision === Decision.Concur ? 1 : 0,
          }

          if (decision === Decision.Disagree) {
            const reviewerAppealValue = reviewSummaryData[`approvalReviewerAppeal-${programName}`] === Decision.Concur ? 1 : 0

            return {
              ...baseDecision,
              approver_decline_reason: reviewSummaryData[`approvalCommentsOnDisagreement-${programName}`],
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
        window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData?.id }) + '?name=completed-approval'
      } else {
        throw new Error('Process id not found or review summary data is missing')
      }
    } catch (err) {
      alert('An error has occurred, please contact help desk.')
    }
  }

  function getContinueButtonTxt() {
    if (currentLetterIdx === 0) {
      return `Continue & View ${supplementalLetters.length - 1} Supplemental Letter${supplementalLetters.length > 2 ? 's' : ''}`;
    } else if (currentLetterIdx < supplementalLetters.length - 1) {
      return 'Sign and Continue';
    } else {
      return 'Sign and Submit';
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
          <BodyContentRenderer applicationId={applicationData?.id} name={supplementalLetters[currentLetterIdx]} />
        </div>
      </div>
      {currentLetterIdx > 0 && (
        <>
          <h5>Signature</h5>
          {declinedPrograms.map((program, index) => (
            <div key={program} style={{ display: index === currentLetterIdx - 1 ? 'block' : 'none' }}>
              <Checkbox<DeclineLetterType>
                name={`approvalDecisions.${program}`}
                label={`I have reviewed and decline the ${formatProgramText(program)} certification.`}
              />
            </div>
          ))}
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
