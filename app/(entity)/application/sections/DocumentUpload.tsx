import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import DocumentUploads from '../components/document-uploads/DocumentUploads';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import DocumentMockload from '../components/document-uploads/DocumentMockload';

function DocumentUpload() {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.documentUpload.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DocumentUploads />
      {/* <DocumentMockload /> */}
      <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href='/application/questionnaire-hubzone-calculator'>
          Previous
        </Link>
        <Link className='usa-button' href={applicationSteps.contributorInvitation.link}>
            Next
        </Link>
      </ButtonGroup>
    </>
  )
}
export default DocumentUpload
