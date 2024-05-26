'use client'
import CustomHeader from '@/app/shared/components/forms/CustomHeader';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Questionnaire from '../components/questionnaire/Questionnaire';
import Sidebar from '../components/questionnaire/Sidebar';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { sections } from '../components/questionnaire/utils/helpers';
import { MultiStepQuestionsProps } from '../components/questionnaire/utils/types';

const EightaQuestions = ({ step = 0 }: MultiStepQuestionsProps) => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(3));
  }, []);

  const eightaSteps = sections.find(section => section.sectionName === '8(a) Business Development')?.questions || [];
  const [currentStep, setCurrentStep] = useState(step > eightaSteps.length - 1 ? 0 : step);

  const handleNext = () => {
    if (currentStep < eightaSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <>
      <CustomHeader title='Application Questionnaire'>
        <ButtonGroup>
          <Button className='padding-1 display-flex flex-align-center' outline type='button'>
            <CloseIcon fontSize='medium' /> Close
          </Button>
          <Button className='padding-1 display-flex flex-align-center' outline type='button'>
            <SaveIcon fontSize='medium' className='margin-right-05' /> Save
          </Button>
        </ButtonGroup>
      </CustomHeader>

      <StepsIndicator
        currentStep={1}
        steps={sections.map(section => section.sectionName)}
        headingLevel="h4"
      />

      <QAWrapper
        fill
        sidebar={<Sidebar sections={sections} handleStep={handleStep} />}
        mainContent={<Questionnaire url={eightaSteps[currentStep].url} title={eightaSteps[currentStep].title} />}
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        {currentStep === 0 ? (
          <Link className='usa-button usa-button--outline' href={sections[0].questions[3].route}>
            Previous
          </Link>
        ) : (
          <Button type='button' className='usa-button' outline onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep === eightaSteps.length - 1 ? (
          <Link className='usa-button' href='/application/document-upload'>
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

export default EightaQuestions;
