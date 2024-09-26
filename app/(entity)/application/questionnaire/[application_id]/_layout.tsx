import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import { selectApplication } from '../../redux/applicationSlice';
import { useApplicationSelector } from '../../redux/hooks';
import ApplicationStepIndicator from '../../components/layout/ApplicationStepIndicator';

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

function ApplicationLayout({children}: ApplicationLayoutProps) {
  const { currentStep } = useApplicationSelector(selectApplication);

  return (
    <>
      <GridContainer className='height-full max-width-full padding-x-0 display-flex flex-column' containerSize='widescreen'>
        <div className='step-indicator__application'>
          <ApplicationStepIndicator stepNumber={currentStep} />
        </div>

        <hr className='margin-y-0 border-base-lightest'/>
        {children}
      </GridContainer>
    </>
  )
}
export default ApplicationLayout;
