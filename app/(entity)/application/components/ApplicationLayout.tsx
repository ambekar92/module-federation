import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import { selectApplication } from '../redux/applicationSlice';
import { useApplicationSelector } from '../redux/hooks';
import OwnershipStepIndicator from './ApplicationStepIndicator';

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

function ApplicationLayout({children}: ApplicationLayoutProps) {
  const { currentStep } = useApplicationSelector(selectApplication);

  return (
    <>
      <GridContainer className='height-full display-flex flex-column' containerSize='widescreen'>
        <div className='step-indicator__application'>
          <OwnershipStepIndicator stepNumber={currentStep} />
        </div>

        <hr className='margin-y-0 border-base-lightest'/>
        {children}
      </GridContainer>
    </>
  )
}
export default ApplicationLayout;
