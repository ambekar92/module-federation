'use client'
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import Questions from '../../../qa-helpers/Questions';
import { setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch } from '../../../redux/hooks';
import { applicationSteps, qaAppLinkPrefix } from '../../../utils/constants';
import { QuestionnaireProps } from '../../../utils/types';

function OwnershipQuestions({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.ownership.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QAWrapper
        fill
        mainContent={<Questions contributorId={contributorId} url={contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/owner-and-management` : ''} title={'Ownership'} />}
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={'/assign-a-delegate'}>
          Previous
        </Link>

        <Link className='usa-button' href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.controlAndOwnership.link}`}>
					Next
        </Link>
      </ButtonGroup>
    </>
  );
}
export default OwnershipQuestions
