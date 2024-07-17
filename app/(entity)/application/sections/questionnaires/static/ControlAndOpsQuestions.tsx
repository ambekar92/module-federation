'use client'
import { CONTROL_AND_OPERATIONS_ROUTE } from '@/app/constants/questionnaires';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import QuestionnaireTemp from '../QuestionnaireTemp';
import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import { setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch } from '../../../redux/hooks';
import { applicationSteps, qaAppLinkPrefix } from '../../../utils/constants';
import { QuestionnaireProps } from '../../../utils/types';
import Questions from '../../../qa-helpers/Questions';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';

function ControlAndOpsQuestions({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.controlAndOwnership.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QAWrapper
        fill
        mainContent={<Questions
          // url={CONTROL_AND_OPERATIONS_ROUTE}
          url={contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/control-and-operation` : ''}
          title={'Control & Operations'}
        />}
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={'select-intended-programs'}>
          Previous
        </Link>

        <Link className='usa-button' href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.controlAndOwnership.link}`}>
						Next
        </Link>
      </ButtonGroup>
    </>
  );
}
export default ControlAndOpsQuestions
