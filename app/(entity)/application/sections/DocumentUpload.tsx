import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import DocumentUploads from '../components/document-uploads/DocumentUploads';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps, qaAppLinkPrefix } from '../utils/constants';
import DocumentMockload from '../components/document-uploads/DocumentMockload';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QuestionnaireProps } from '../utils/types';

function DocumentUpload({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Document Upload');

  useEffect(() => {
    dispatch(setStep(applicationSteps.documentUpload.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DocumentUploads />
      {/* <DocumentMockload /> */}
      <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline'
				 aria-disabled={!contributorId}
				 href={`/application/questionnaire/${contributorId}/hubzone-calculator`}>
          Previous
        </Link>
        <Link className='usa-button' aria-disabled={!contributorId} href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.contributorInvitation.link}`}>
            Next
        </Link>
      </ButtonGroup>
    </>
  )
}
export default DocumentUpload
