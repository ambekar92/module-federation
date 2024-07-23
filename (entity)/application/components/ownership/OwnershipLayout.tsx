import { ELIGIBLE_APPLY_PROGRAMS_ROUTE } from '@/app/constants/routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { fetcherPUT } from '@/app/services/fetcher';
import { Button, ButtonGroup, GridContainer } from '@trussworks/react-uswds';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { selectApplication, setOwnerTypeSelected, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';
import { applicationSteps, calculateEligiblePrograms, qaAppLinkPrefix } from '../../utils/constants';

type OwnershipLayoutProps = {
  children: React.ReactNode;
	contributorId: number;
	applicationId: number | null;
};

function OwnershipLayout({children, contributorId, applicationId}: OwnershipLayoutProps) {
  const { ownerTypeSelected, owners, ownershipPercentageTotal } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddNew = () => {
    dispatch(setOwnerTypeSelected(true))
  }

  useEffect(() => {
    dispatch(setStep(0))
    const programs = calculateEligiblePrograms(owners);
    setEligiblePrograms(programs);
  }, [dispatch, owners]);

  const handleNextClick = async () => {
    if (ownershipPercentageTotal === 100) {
      setIsLoading(true);
      try {
        const postData = {
          application_id: applicationId,
          programs: eligiblePrograms.map(program => program.id)
        };

        await fetcherPUT(`${ELIGIBLE_APPLY_PROGRAMS_ROUTE}`, postData);
        window.location.href = `${qaAppLinkPrefix}${contributorId}${applicationSteps.controlAndOwnership.link}`;
      } catch (error) {
        console.error('Error submitting data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        <h1>Ownership</h1>
        <h3 className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>
				We will now collect information for the owners of the business. We use this information to determine eligibility for our various programs, so please be as complete as possible.
        </h3>
      </div>
      <div>
      	<h2>Business Structure</h2>
        <p>Based on the information provided by SAM, [Business Name] is designated as a Partnership.</p>
        <p>If this designation is incorrect, please discontinue this application and update your information on <a href="/application">SAM.gov</a></p>
      </div>

      <hr className='margin-y-3 width-full border-base-lightest'/>

      <div className='display-flex flex-justify flex-align-center'>
        <h3 className='margin-y-0'>Owners <span data-testid='percentTotal' style={{fontWeight: 'lighter'}}>{ownershipPercentageTotal}%</span></h3>
        {!ownerTypeSelected && owners.length === 0 && <Button type='button' outline disabled={ownershipPercentageTotal >= 100} onClick={() => handleAddNew()}>Add Owner</Button>}
      </div>

      <div className='flex-fill' style={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
        <GridContainer containerSize='widescreen' className={`width-full padding-y-2 margin-top-2 
        ${owners.length > 0 && 'bg-base-lightest'} ${ownerTypeSelected && 'bg-base-lightest'}`}>
          {children}
        </GridContainer>

        <div className='flex-fill'>
          {owners.length > 0 && (
            <div className='display-flex flex-justify-end'>
              <Button type='button' outline disabled={ownershipPercentageTotal >= 100} onClick={() => handleAddNew()}>Add Owner</Button>
            </div>
          )}
        </div>

        <hr className='margin-y-3 margin-bottom-0 width-full border-base-lightest'/>

        <ButtonGroup className='display-flex flex-justify padding-y-2 margin-right-2px'>
          <Link href={`/application/assign-a-delegate/${contributorId}`} className='usa-button usa-button--outline'>
						Previous
          </Link>
          {ownershipPercentageTotal !== 100 ? (
            <Button type='button' className='usa-button' disabled>
            Next
            </Button>
          ) : (
            <Button
              type='button'
              className='usa-button'
              onClick={handleNextClick}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Next'}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </>
  )
}
export default OwnershipLayout;
