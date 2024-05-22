import { Button, ButtonGroup, GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import { selectApplication, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../redux/hooks';
import OwnershipStepIndicator from './OwnershipStepIndicator';

type ApplicationLayoutProps = {
  children: React.ReactNode;
	headerMain?: string;
	headerSub?: string;
};

function ApplicationLayout({children, headerMain, headerSub}: ApplicationLayoutProps) {
  const { currentStep, maxSteps } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const handleNext =() => {currentStep < maxSteps && dispatch(setStep(currentStep + 1))}
  const handlePrev =() => {currentStep > 0 && dispatch(setStep(currentStep - 1))}

  return (
    <>
      <GridContainer containerSize='widescreen'>
        <OwnershipStepIndicator stepNumber={currentStep} />
        <hr className='margin-y-0 border-base-lightest'/>
        <div>
          <h1>{headerMain}</h1>
          <p className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>{headerSub}</p>
        </div>
        {children}

        <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
          <Button type='button' className='usa-button' onClick={handlePrev}>
						Prev
          </Button>
          <Button type='button' className='usa-button' onClick={handleNext}>
						Next
          </Button>
        </ButtonGroup>
      </GridContainer>
    </>
  )
}
export default ApplicationLayout;
