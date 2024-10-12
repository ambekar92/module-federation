'use client'
import { Button, Card } from '@trussworks/react-uswds';
import { useRouter } from 'next/navigation';
import React from 'react';

const resources = [
  {
    title: 'Loans',
    subtitle: 'start or expand your business with loans guaranteed by the Small Business Administration',
    description: `The U.S. Small Business Administration (SBA) helps small businesses get funding by setting
        guidelines for loans and reducing lender risk. These SBA-backed loans make it easier for small
        business to get the funding they need.`,
    url: 'https://www.sba.gov/funding-programs/loans',
  },
  {
    title: 'Investment Capital',
    subtitle: 'find an investor for your business. investors make both debt and equity investments',
    description: `Find an investor for your business from among more than 300 Small Business
        Investment Companies (SBICs) licensed by SBA.`,
    url: 'https://www.sba.gov/funding-programs/investment-capital',
  },
  {
    title: 'Disaster Assistance',
    subtitle: 'get help after a disaster with low-interest disaster loans from the Small Business Administration',
    description: 'SBA provides low-interest disaster loans to help businesses and homeowners recover from declared disasters.',
    url: 'https://www.sba.gov/funding-programs/disaster-assistance',
  },
  {
    title: 'Surety Bonds',
    subtitle: 'protect your work and your client  with an sba-guaranteed surety bond',
    description: `The Small Business Administration (SBA) guarantees bid, performance,
        and payment surety bonds issued by certain surety companies.`,
    url: 'https://www.sba.gov/funding-programs/surety-bonds',
  },
  {
    title: 'Grants',
    subtitle: 'look for government grants that help business do scientific research and development',
    description: `SBA provides grants to nonprofits, Resource Partners, and educational organizations. These grands aim to support entrepreneurship, through
        counseling and training programs.`,
    url: 'https://www.sba.gov/funding-programs/grants',
  }
]

const Resources = () => {
  const router = useRouter();
  return (
    <div>
      <h2>Resources</h2>
      {resources.map((resource, idx) => <Card key={idx}>
        <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
          <div>
            <h3 style={{marginBottom: '0'}}>{resource.title}</h3>
            <p style={{textTransform: 'uppercase', marginTop: '.5rem'}}>{resource.subtitle}</p>
            <p style={{marginTop: '2rem'}}>{resource.description}</p>
          </div>
          <Button style={{alignSelf: 'flex-end'}} outline type='button' onClick={() => router.push(resource.url)}>Learn More</Button>
        </div>
      </Card> )}
    </div>
  )
}

export default Resources
