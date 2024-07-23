import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { QuestionnaireProps } from '../utils/types';
import { useApplicationDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { setStep } from '../redux/applicationSlice';
import { applicationSteps } from '../utils/constants';

function HubzoneResults({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{lineHeight: 1.5}} className='display-flex flex-column height-full'>
      <h2>To qualify for the HUBZone program, your business must meet specific criteria.</h2>

      <ol type='I' className='flex-fill text-size-base'>
        <li className='margin-bottom-105'>
          <strong>Location:</strong> The business must be located in a HUBZone.
        </li>

        <li className='margin-bottom-105'>
          <strong>Ownership:</strong> The business must be at least 51% owned and controlled by U.S. citizens, a Community Development Corporation, an agricultural cooperative, an Indian tribe, or a Native Hawaiian organization.
        </li>

        <li className='margin-bottom-105'>
          <strong>Size:</strong>  The business must be a small business as defined by the SBA standards, which vary by industry.
        </li>
        <li className='margin-bottom-105'>
          <strong>Employees:</strong> At least 35% of the business’s employees must reside in a HUBZone.
        </li>
        <li className='margin-bottom-105'>
          <strong>Principal Office:</strong> The principal office of the business must be located in a HUBZone.
        </li>
      </ol>

      <ButtonGroup className="display-flex flex-justify border-top padding-y-2 margin-right-2px">
        <Link
          className="usa-button usa-button--outline"
          href={`/application/questionnaire/${contributorId}`}
        >
              Previous
        </Link>
        <Link
          className="usa-button"
          href={`/application/${contributorId}/document-upload`}
        >
    					Next
        </Link>
      </ButtonGroup>
    </div>
  )
}
export default HubzoneResults;
