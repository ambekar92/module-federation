import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import DocumentUploads from '../components/document-uploads/DocumentUploads';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';

function DocumentUpload() {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(4));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DocumentUploads />
      <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href='/application/questionnaire-eight-a?step=3'>
          Previous
        </Link>
        <Link className='usa-button' href='/application/sign'>
            Next
        </Link>
      </ButtonGroup>
    </>
  )
}
export default DocumentUpload
