'use client'
import { ButtonGroup, Link } from '@trussworks/react-uswds';
import { useSession } from 'next-auth/react';
import { applicationSteps } from '../utils/constants';

function Hubzone() {
  const session = useSession();
  const accessToken = session?.data?.user?.accessToken;

  return (
    <div className="flex-fill">
      <iframe
        className="flex-grow"
        src={`http://localhost:3001/firm?wt=${accessToken}`}
        style={{ border: 0, minHeight: '100vh', height: 'max-content'}}
        allowFullScreen
        aria-hidden="false"
        loading="lazy"
        width={'100%'}
        height={'100%'}
      />
      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href='/application/questionnaire-program-specific?step=3'>
          Previous
        </Link>
        <Link className='usa-button' href={applicationSteps.documentUpload.link}>
          Next
        </Link>
      </ButtonGroup>
    </div>
  )
}

export default Hubzone;
