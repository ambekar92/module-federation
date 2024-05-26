import { Button, Grid, GridContainer } from '@trussworks/react-uswds';
import React, { useEffect } from 'react';
import { selectApplication, setOwnerTypeSelected, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';

type OwnershipLayoutProps = {
  children: React.ReactNode;
};

function OwnershipLayout({children}: OwnershipLayoutProps) {
  const { selectedStructure, ownerTypeSelected, ownerType, ownershipPercentageTotal } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const handleAddNew =() => {
    dispatch(setOwnerTypeSelected(true))
  }

  useEffect(() => {
    dispatch(setStep(0))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1>Ownership</h1>
        <p className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>
				We will now collect information for the owner of the business. We use this information to determine eligibility for our various programs, so please be as complete as possible.
        </p>
      </div>
      <div>
      	<h2>Business Structure</h2>
        <p>Based off the information provided by SAM, [Business Name] is designated as a Partnership.</p>
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

        <Grid className='margin-top-1' tablet={{col: 4}}>
          <Button type="button"
            outline={selectedStructure !== 'Partnership'}
            disabled={selectedStructure !== 'Partnership'}
            className={`width-full cursor-default ${selectedStructure === 'Partnership' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
						Partnership
          </Button>
        </Grid>

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
        <h3 className='margin-y-0'>Owners <span style={{fontWeight: 'lighter'}}>{ownershipPercentageTotal}%</span></h3>
        <Button type='button' outline onClick={() => handleAddNew()}>Add New</Button>
      </div>

      {ownerTypeSelected ? (
        <GridContainer containerSize='widescreen' className={`bg-base-lightest padding-y-2 margin-top-2 ${ownerType === null && 'maxh-card'}`}>
          {children}
        </GridContainer>
      ): (
        <div></div>
      )}
      <div className='flex-fill'></div>
    </>
  )
}
export default OwnershipLayout;
