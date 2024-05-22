'use client'
import CustomHeader from '@/app/shared/components/forms/CustomHeader';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useState } from 'react';
import Questionnaire from '../components/Questionnaire';
import Sidebar from '../components/Sidebar';
import { sections } from '../utils/helpers';
import { MultiStepQuestionsProps } from '../utils/types';

const EightaQuestions = ({ step = 0 }: MultiStepQuestionsProps) => {
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
    <section>
      <CustomHeader title='Additional Information'>
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
        sidebar={<Sidebar sections={sections} handleStep={handleStep} />}
        mainContent={<Questionnaire url={eightaSteps[currentStep].url} title={eightaSteps[currentStep].title} />}
      />

      <ButtonGroup className='display-flex flex-justify flex-fill border-top padding-y-2'>
        {currentStep === 0 ? (
          <Link className='usa-button' href={sections[0].questions[3].route}>
            Previous
          </Link>
        ) : (
          <Button type='button' className='usa-button' onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep === eightaSteps.length - 1 ? (
          <Link className='usa-button' href='/additional-information/attestation'>
            Next
          </Link>
        ) : (
          <Button type='button' className='usa-button' onClick={handleNext}>
            Next
          </Button>
        )}
      </ButtonGroup>
    </section>
  );
};

export default EightaQuestions;
