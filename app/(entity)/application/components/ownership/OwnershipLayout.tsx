import { Button, ButtonGroup, Grid, GridContainer } from '@trussworks/react-uswds';
import React, { useEffect } from 'react';
import { selectApplication, setOwnerTypeSelected, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';
import Link from 'next/link';
import { applicationSteps } from '../../utils/constants';

type OwnershipLayoutProps = {
  children: React.ReactNode;
};

function OwnershipLayout({children}: OwnershipLayoutProps) {
  const { ownerTypeSelected, owners, ownershipPercentageTotal } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const handleAddNew =() => {
    dispatch(setOwnerTypeSelected(true))
  }

  useEffect(() => {
    dispatch(setStep(0))
  }, [setStep]);

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

      <Grid row gap='lg'>
        {/* <Grid className='margin-top-1' tablet={{col: true}}>
          <Button
            type="button"
            outline={selectedStructure !== 'Sole Proprietorship'}
            disabled={selectedStructure !== 'Sole Proprietorship'}
            className={`width-full cursor-default ${selectedStructure === 'Sole Proprietorship' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
						Sole Proprietorship
          </Button>
        </Grid> */}

        {/* <Grid className='margin-top-1' tablet={{col: 4}}>
          <Button type="button"
            outline={selectedStructure !== 'Partnership'}
            disabled={selectedStructure !== 'Partnership'}
            className={`width-full cursor-default ${selectedStructure === 'Partnership' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
						Partnership
          </Button>
        </Grid> */}

        {/* <Grid className='margin-top-1' tablet={{col: true}}>
          <Button type="button"
            outline={selectedStructure !== 'Corporation'}
            disabled={selectedStructure !== 'Corporation'}
            className={`width-full cursor-default ${selectedStructure === 'Corporation' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
						Corporation
          </Button>
        </Grid>

        <Grid className='margin-top-1' tablet={{col: true}}>
          <Button type="button"
            outline={selectedStructure !== 'LLC'}
            disabled={selectedStructure !== 'LLC'}
            className={`width-full cursor-default ${selectedStructure === 'LLC' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
					 LLC
          </Button>
        </Grid> */}
      </Grid>

      <hr className='margin-y-3 width-full border-base-lightest'/>

      <div className='display-flex flex-justify flex-align-center'>
        <h3 className='margin-y-0'>Owners <span data-testid='percentTotal' style={{fontWeight: 'lighter'}}>{ownershipPercentageTotal}%</span></h3>
        {!ownerTypeSelected && owners.length === 0 && <Button type='button' outline disabled={ownershipPercentageTotal >= 100} onClick={() => handleAddNew()}>Add Owner</Button>}
      </div>

      <div className='flex-fill' style={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
        <GridContainer containerSize='widescreen' className={` width-full padding-y-2 margin-top-2 ${ownerTypeSelected && 'bg-base-lightest'}`}>
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
          <Link href='/assign-a-delegate' className='usa-button usa-button--outline'>
						Previous
          </Link>
          {ownershipPercentageTotal !== 100 ? (
            <Button type='button' className='usa-button' disabled>
            Next
            </Button>
          ) : (
            <Link className='usa-button' href={applicationSteps.controlAndOwnership.link}>
						Next
            </Link>
          )}
        </ButtonGroup>
      </div>
    </>
  )
}
export default OwnershipLayout;
