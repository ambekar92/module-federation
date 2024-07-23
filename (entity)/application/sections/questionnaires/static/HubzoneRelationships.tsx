'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { ButtonGroup } from '@trussworks/react-uswds';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationDispatch } from '../../../redux/hooks';
import { setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { applicationSteps, qaAppLinkPrefix } from '../../../utils/constants';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { QuestionnaireProps } from '../../../utils/types';
import Questions from '../../../qa-helpers/Questions';

function HubzoneRelationships({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  }, [dispatch]);

  return (
    <>
      <QAWrapper
        fill
        mainContent={
          <Questions
            contributorId={contributorId}
            url={`${QUESTIONNAIRE_ROUTE}/${contributorId}/individual-contributor-hubzone-business-relationships`}
            title={'Hubzone Business Relationships'}
          />
        }
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' aria-disabled={!contributorId} href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.controlAndOwnership.link}`}>
          Previous
        </Link>
        <Link className='usa-button' aria-disabled={!contributorId} href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.documentUpload.link}`}>
          Next
        </Link>
      </ButtonGroup>
    </>
  );
}

export default HubzoneRelationships;
