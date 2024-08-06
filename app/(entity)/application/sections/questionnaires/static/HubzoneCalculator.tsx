'use client'
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { useEffect } from 'react';
import HubMock from '../../../components/questionnaire/HubMock';
import { setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch } from '../../../redux/hooks';
import { applicationSteps } from '../../../utils/constants';
import { QuestionnaireProps } from '../../../utils/types';

function HubzoneCalculator({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Hubzone Calculator');

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QAWrapper
        fill
        mainContent={
          <HubMock />
        }
      />
      <hr className='margin-y-0 border-base-lightest'/>
    </>
  );
};

export default HubzoneCalculator;
