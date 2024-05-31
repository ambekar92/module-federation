'use client'
import CustomHeader from '@/app/shared/components/forms/CustomHeader';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Questionnaire from '../components/questionnaire/Questionnaire';
import { sections } from '../components/questionnaire/utils/helpers';
import { MultiStepQuestionsProps } from '../components/questionnaire/utils/types';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import HubMock from '../components/questionnaire/HubMock';

const ProgramSpecificQuestions = ({ step = 0 }: MultiStepQuestionsProps) => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const programSpecificSteps = sections.find(section => section.sectionName === 'Program Specific')?.questions || [];
  const [currentStep, setCurrentStep] = useState(step > programSpecificSteps.length - 1 ? 0 : step);

  const handleNext = () => {
    if (currentStep < programSpecificSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* <CustomHeader title='Application Questionnaire' /> */}

      {/* <StepsIndicator
        currentStep={1}
        steps={sections.map(section => section.sectionName)}
        headingLevel="h4"
      /> */}

      <QAWrapper
        fill
        mainContent={currentStep !== 3 ?
          <Questionnaire url={programSpecificSteps[currentStep].url} title={programSpecificSteps[currentStep].title} />
          : <HubMock />
        }
      />
      <hr className='margin-y-0 border-base-lightest'/>
      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        {currentStep === 0 ? (
          <Link className='usa-button usa-button--outline' href={sections[1].questions[3].route}>
            Previous
          </Link>
        ) : (
          <Button type='button' className='usa-button' outline onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep === programSpecificSteps.length - 1 ? (
          <Link className='usa-button' href={applicationSteps.documentUpload.link}>
            Next
          </Link>
        ) : (
          <Button type='button' className='usa-button' onClick={handleNext}>
            Next
          </Button>
        )}
      </ButtonGroup>
    </>
  );
};

export default ProgramSpecificQuestions;
