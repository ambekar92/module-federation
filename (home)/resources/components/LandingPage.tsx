'use client'
import React  from 'react'
import { Grid, Button } from '@trussworks/react-uswds'
import Link from 'next/link';

export const LandingPage: React.FC = () => {
  return (
    <div>
      <section
        style={{ boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.1)' }}
        className="display-flex flex-justify flex-align-center width-full"
      >
        <div className="margin-left-3">
          <h1 style={{ fontSize: '40px', fontWeight: 700 }}>Resources</h1>
        </div>
      </section>
      <section
        style={{ boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.1)' }}
        className="width-full"
      >
        <Grid>
          <Link href="/get-ready">
            <img
              src="/resourcebanner/Banner.svg"
              alt="resouceApplicationBanner"
            />

          </Link>
        </Grid>
      </section>

      <section
        style={{ boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.1)' }}
        className="margin-top-0 width-full"
      >
        <Grid className="display-flex flex-align-center flex-justify margin-left-3 " >
          <h2 style={{fontWeight:700, fontSize:'32px'}} className="margin-bottom-0">HUBZone Calculator</h2>
          <Link href="https://calculator.demo.sba-one.net/">
            <Button type='submit'outline>Open</Button></Link>
        </Grid>
        <Grid className='margin-left-3'><p style={{fontFamily: 'Lato Web', fontSize: '18px', fontWeight:400}}>CHECK IF YOUR BUSINESS QUALIFIES FOR HUBZONE.</p></Grid>
        <Grid className='margin-left-3 padding-bottom-1 '><p style={{fontFamily: 'Source Sans Pro', fontSize: '22px', fontWeight:400}}>The HUBZone Calculator is a tool designed to help applicants  determine their eligibility for the HUBZone certification.</p></Grid>
      </section>
      <section
        style={{ backgroundColor: 'rgba(239, 246, 251, 1)' }}
        className="width-full"
      >
        <Grid className="display-flex flex-align-center flex-justify margin-left-3" >
          <h2 style={{fontWeight:700, fontSize:'32px'}} className="margin-bottom-0">Knowledge Base</h2>
          <Link href="https://sbaone.atlassian.net/wiki/spaces/UCPUKB/overview">
            <Button type='submit'outline>Learn More</Button></Link>
        </Grid>
        <Grid className='margin-left-3 padding-bottom-1'><p style={{fontFamily: 'Source Sans Pro', fontSize: '20px', fontWeight:400}}>The Knowledge Base provides you with all the latest resources and updates regarding the Unified Certification Platform to assist you in the application and certification renewal process.</p></Grid>
      </section>
    </div>
  )
}
