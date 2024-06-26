'use client'
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import HubMock from '../components/questionnaire/HubMock';
import { selectApplication, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';

const HubzoneCalculator = () => {
  const dispatch = useApplicationDispatch();
  const { totalQuestionnaires } = useApplicationSelector(selectApplication);

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QAWrapper
        fill
        mainContent={<HubMock />}
      />
      <hr className='margin-y-0 border-base-lightest'/>
      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={`/application/questionnaire?index=${totalQuestionnaires || 15}`}>
          Previous
        </Link>
        <Link className='usa-button' href={applicationSteps.documentUpload.link}>
            Next
        </Link>
      </ButtonGroup>
    </>
  );
};

export default HubzoneCalculator;
