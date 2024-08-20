import { Application } from '@/app/services/types/application-service/Application'
import Checkbox from '@/app/shared/form-builder/form-controls/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import React, { Dispatch, RefObject, useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { approvalLetterSchema } from '../schema'
import { MakeApprovalFormType, ReviewSummaryType, Steps, Decision, ApprovalLetterType } from '../types'
import BodyContentRenderer from '../../../BodyContentRenderer'
import { DocumentTemplateType } from '@/app/services/types/document-service/DocumentTemplate'
import { formatProgramText } from '@/app/shared/utility/formatProgramText'
import { axiosInstance } from '@/app/services/axiosInstance'
import { COMPLETE_EVALUATION_TASK_ROUTE, HTML_TO_PDF_ROUTE } from '@/app/constants/routes'
import { HtmlToPdfDocument } from '@/app/services/types/document-service/HtmlToPdfDocument'
import { pdfTabStyles } from '../constants'
import { useProgramStatus } from '../useProgramStatus'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'

const containerStyles: React.CSSProperties = {padding: '0rem 1rem', minHeight: '20vh', maxHeight: '60vh', overflowY: 'auto', border: '1px solid black'}

interface ApprovalLetterProps {
  modalRef: RefObject<ModalRef>;
  setCurrentStep: Dispatch<React.SetStateAction<number>>;
  applicationData: Application | null;
  reviewSummaryData: ReviewSummaryType | null;
	processId: number | undefined;
}

const ApprovalLetter: React.FC<ApprovalLetterProps> = ({
  modalRef,
  setCurrentStep,
  applicationData,
  reviewSummaryData,
  processId
}) => {
  const [currentLetterIdx, setCurrentLetterIdx] = useState<number>(0);
  const [supplementalLetters, setSupplementalLetters] = useState<DocumentTemplateType[]>([]);
  const { approvedPrograms, approvedLetters, declinedPrograms, isLoading } = useProgramStatus(reviewSummaryData);
  const { getValues, setValue, reset } = useFormContext<MakeApprovalFormType>();

  const methods = useForm<ApprovalLetterType>({
    resolver: zodResolver(approvalLetterSchema),
    defaultValues: getValues('approvalLetter'),
    shouldUnregister: true
  });

  useEffect(() => {
    if (!isLoading) {
      if (approvedLetters.length === 0) {
        setCurrentStep(Steps.DeclineLetter);
      } else {
        setSupplementalLetters(approvedLetters);
      }
    }
  }, [approvedLetters, approvedPrograms, isLoading, setCurrentStep]);

  // async function onViewPdf() {
  //   try {
  //     const bodyContentElement = document.querySelector('.body-content-renderer');
  //     if (!bodyContentElement) {
  //       throw new Error('Body content not found');
  //     }

  //     const html = bodyContentElement.innerHTML;

  //     const formData = new URLSearchParams();
  //     formData.append('upload_user_id', '32');
  //     formData.append('html', html);
  //     formData.append('file_name', 'approval_letter.pdf');
  //     formData.append('document_type_id', '1');
  //     formData.append('entity_id', '146');
  //     formData.append('internal_document', 'true');

  //     const response = await axiosInstance.post<HtmlToPdfDocument>(
  //       HTML_TO_PDF_ROUTE,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       }
  //     );

  //     if (response.data && response.data.path_name) {
  //       window.open(response.data.path_name, '_blank');
  //     } else {
  //       throw new Error('Invalid response from server');
  //     }
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     alert('There was an error generating the PDF. Please try again.');
  //   }
  // }

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
        <title>${applicationData?.sam_entity.legal_business_name}_${formatProgramText(approvedPrograms[currentLetterIdx])}_approval.pdf</title>
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

  async function onSubmit(formData: ApprovalLetterType) {
    try {
      setValue('approvalLetter', formData)
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
              firm_can_appeal: reviewerAppealValue,
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

  async function onContinue() {
    if (currentLetterIdx < supplementalLetters.length - 1) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx + 1);
    } else if(declinedPrograms.length === 0) {
      methods.handleSubmit(onSubmit)();
    } else {
      setCurrentStep(Steps.DeclineLetter);
    }
  }

  function onPrevious() {
    if (currentLetterIdx > 0) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx - 1);
    } else if (currentLetterIdx === 0) {
      setCurrentStep(Steps.ReviewSummary);
    }
  }

  function onCancel() {
    setCurrentStep(Steps.ReviewSummary);
    reset();
    modalRef.current?.toggleModal();
  }

  function getContinueButtonTxt() {
    if (currentLetterIdx === supplementalLetters.length - 1 && declinedPrograms.length > 0) {
      return 'Sign and Continue';
    } else if(declinedPrograms.length === 0) {
      return 'Sign and Submit';
    }
    return 'Continue';
  }

  if(isLoading) {
    return
  }

  if(!applicationData) {
    return <h3>No application data found...</h3>
  }

  const content = (
    <>
      <div className='display-flex flex-justify-end' style={{border: '1px solid black', borderBottom: 'none', padding: '0.5rem 1rem'}}><Button type='button' onClick={openContentInNewTab} outline>View PDF</Button></div>
      <div style={containerStyles}>
        <div className="body-content-renderer">
          <BodyContentRenderer name={supplementalLetters[currentLetterIdx]} />
        </div>
      </div>
      <h5>Signature</h5>
      {approvedPrograms.map((program, index) => (
        <div key={program} style={{ display: index === currentLetterIdx ? 'block' : 'none' }}>
          <Checkbox<ApprovalLetterType>
            name={`approvalDecisions.${program}`}
            label={`I have reviewed and approve the ${formatProgramText(program)} certification.`}
          />
        </div>
      ))}
    </>
  );

  return (
    <FormProvider {...methods}>
      <h4>Approval Letter(s)</h4>
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
    </FormProvider>
  )
}

export default ApprovalLetter
