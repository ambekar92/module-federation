'use client'
import { OWNER_AND_MANAGEMENT } from '@/app/constants/questionnaires';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import QaQuestionnaire from '@/app/shared/components/questionnaire/QaQuestionnaire';
import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';

function OwnershipQuestions() {
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
        mainContent={<QaQuestionnaire url={OWNER_AND_MANAGEMENT} title={'Ownership'} />}
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={'select-intended-programs'}>
          Previous
        </Link>

        <Link className='usa-button' href={applicationSteps.controlAndOwnership.link}>
						Next
        </Link>
      </ButtonGroup>
    </>
  );
}
export default OwnershipQuestions
