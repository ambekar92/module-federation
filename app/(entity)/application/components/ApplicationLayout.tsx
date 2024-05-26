import { Button, ButtonGroup, GridContainer } from '@trussworks/react-uswds';
import Link from 'next/link';
import React from 'react';
import { selectApplication } from '../redux/applicationSlice';
import { useApplicationSelector } from '../redux/hooks';
import { applicationLinks } from '../utils/constants';
import OwnershipStepIndicator from './ApplicationStepIndicator';

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

function ApplicationLayout({children}: ApplicationLayoutProps) {
  const { currentStep, maxSteps, displayStepNavigation } = useApplicationSelector(selectApplication);

  return (
    <>
      <GridContainer className='height-full display-flex flex-column' containerSize='widescreen'>
        <OwnershipStepIndicator stepNumber={currentStep} />
        <hr className='margin-y-0 border-base-lightest'/>

        {children}

        {displayStepNavigation && (
          <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
            {currentStep === 0 ? (
              <Button type='button' outline disabled className='usa-button'>
							Previous
          	</Button>
            ) : (
              <Link href={currentStep > 0 ? applicationLinks[currentStep-1] : ''} className='usa-button usa-button--outline'>
							Previous
              </Link>
            )}

            {currentStep < maxSteps ? (
              <Link href={applicationLinks[currentStep+1]} className='usa-button'>
								Next
              </Link>
            ): (
              <Button type='button' outline disabled className='usa-button'>
								Next
              </Button>
            )}
          </ButtonGroup>
        )}
      </GridContainer>
    </>
  )
}
export default ApplicationLayout;
