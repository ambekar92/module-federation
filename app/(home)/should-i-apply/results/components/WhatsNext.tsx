'use client'
import { CardActionArea } from '@mui/material'
import { Button, Card } from '@trussworks/react-uswds'
import React from 'react'
import ReactGA from 'react-ga4';
import {REACT_GA_REPORT} from '../../../../constants/routes'

const WhatsNext = () => {
  ReactGA.initialize(`${REACT_GA_REPORT}`);

  const handleClickAppPrep = () => {
    ReactGA.event({
      category: 'Should I apply - result - prepare for application',
      action: 'Clicked Next Button',
    });

  };
  const handleClickHubZone = () => {
    ReactGA.event({
      category: 'Should I apply - result - HUBZone Calculator',
      action: 'Clicked Next Button',
    });

  };
  return (
    <div>
      <h2>What&apos;s Next</h2>

      <Card>
        <div className='padding-x-2'>
          <h3 className='margin-bottom-05'>Prepare for Application</h3>
          <p className='margin-top-0'>GET YOUR BUSINESS READY FOR CERTIFICATION</p>

          <p>Preview application questions, read tips for success, and know what documents to have ready when applying for certification.</p>

        </div>
        <div className='padding-bottom-2'>
          <CardActionArea style={{ marginLeft: 'auto', width: 'fit-content' }} >
            <Button type='button' onClick={handleClickAppPrep} outline>
              <a href="/resources/get-ready">Next</a>
            </Button>
          </CardActionArea>
        </div>
      </Card>

      <Card>
        <div className='padding-x-2'>
          <h3 className='margin-bottom-05'>HUBZone Calculator</h3>
          <p className='margin-top-0'>CHECK IF YOUR BUSINESS QUALIFIES FOR HUBZone</p>

          <p>The HUBZone Calculator is a tool designed to help applicants determine their eligibility for the HUBZone certification.</p>

        </div>
        <div className='padding-bottom-2'>
          <CardActionArea style={{ marginLeft: 'auto', width: 'fit-content' }}>
            <Button type='button' onClick={handleClickHubZone} outline>
              Next
            </Button>
          </CardActionArea>
        </div>
      </Card>
    </div>
  )
}

export default WhatsNext
