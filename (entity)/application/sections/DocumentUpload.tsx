import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DocumentUploads from '../components/document-uploads/DocumentUploads';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps, qaAppLinkPrefix } from '../utils/constants';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QuestionnaireProps } from '../utils/types';

function DocumentUpload({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Document Upload');
  const [skipHubzoneSup, setSkipHubzoneSup] = useState(false);

  useEffect(() => {
    dispatch(setStep(applicationSteps.documentUpload.stepIndex));
    const skipHubzoneSupValue = localStorage.getItem('skipHubzoneSup') === 'true';
    setSkipHubzoneSup(skipHubzoneSupValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previousLink = skipHubzoneSup
    ? `/application/questionnaire/${contributorId}/individual-contributor-hubzone-business-relationships`
    : `/application/questionnaire/${contributorId}/hubzone-calculator-supplemental`;

  return (
    <>
      <DocumentUploads />
      <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
        <Link
          className='usa-button usa-button--outline'
          aria-disabled={!contributorId}
          href={previousLink}
        >
          Previous
        </Link>
        <Link
          className='usa-button'
          aria-disabled={!contributorId}
          href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.contributorInvitation.link}`}
        >
          Next
        </Link>
      </ButtonGroup>
    </>
  )
}

export default DocumentUpload
