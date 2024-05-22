import { Button, Grid, GridContainer, Table } from '@trussworks/react-uswds';
import React from 'react';
import { selectApplication, setIsStructuredSelected, setOwnerTypeSelected, setSelectedStructure } from '../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../redux/hooks';
import ApplicationLayout from './ApplicationLayout';

type OwnershipLayoutProps = {
  children: React.ReactNode;
};

function OwnershipLayout({children}: OwnershipLayoutProps) {
  const { selectedStructure, ownerTypeSelected } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const handleClick =(option: 'Sole Proprietorship' | 'Partnership' | 'Corporation' | 'LLC') => {
    dispatch(setSelectedStructure(option))
    dispatch(setIsStructuredSelected(true))
  }

  const handleAddNew =() => {
    dispatch(setOwnerTypeSelected(true))
  }

  return (
    <ApplicationLayout headerMain='Ownership' headerSub='We will now collect information for the owner of the business. We use this information to determine eligibility for our various programs, so please be as complete as possible.'>
      <div>
      	<h2>Business Structure</h2>
        <p>Based off the information provided by SAM, [Business Name] is designated as a Partnership.</p>
        <p>If this designation is incorrect, please discontinue this application and update your information on <a href="/application">SAM.gov</a></p>
      </div>
      <Grid row gap='lg'>
        <Grid className='margin-top-1' tablet={{col: true}}>
          <Button
            type="button"
            outline={selectedStructure !== 'Sole Proprietorship'}
            disabled={selectedStructure !== 'Sole Proprietorship'}
            className={`width-full cursor-default ${selectedStructure === 'Sole Proprietorship' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
						Sole Proprietorship
          </Button>
        </Grid>

        <Grid className='margin-top-1' tablet={{col: true}}>
          <Button type="button"
            outline={selectedStructure !== 'Partnership'}
            disabled={selectedStructure !== 'Partnership'}
            className={`width-full cursor-default ${selectedStructure === 'Partnership' && 'text-ink bg-primary-light hover:bg-primary-light hover:text-ink'}`}
          >
						Partnership
          </Button>
        </Grid>

        <Grid className='margin-top-1' tablet={{col: true}}>
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
        </Grid>
      </Grid>

      <hr className='margin-y-3 border-base-lightest'/>

      <div className='display-flex flex-justify flex-align-center'>
        <h3 className='margin-y-0'>Owners <span style={{fontWeight: 'lighter'}}>0%</span></h3>
        <Button type='button' outline onClick={() => handleAddNew()}>Add New</Button>
      </div>
      {ownerTypeSelected && (
        <GridContainer containerSize='widescreen' className='bg-base-lightest padding-y-2 margin-top-2'>
          {children}
        </GridContainer>
      )}

      <Table bordered className='width-full'>
        <thead>
          <tr>
            <th scope="col">Legal Name</th>
            <th scope="col">Email</th>
            <th scope="col">Ownership (%)</th>
            <th scope="col">Martial Status</th>
            <th scope="col">Veteran Status</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
      </Table>
    </ApplicationLayout>
  )
}
export default OwnershipLayout;
