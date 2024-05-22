import React, { useState } from 'react';
import { Accordion, Alert, Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import ValidationTable from './ValidationTable'; // Ensure correct path
import { BusinessProfileType } from '../utils/types'; // Ensure correct path
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import { businessProfileData } from '../utils/data';

const BusinessAccordion = () => {
  const [businessProfile, setBusinessProfile] = useState<BusinessProfileType>(businessProfileData)

  const onClickVerify = (uei: string) => {
    const updatedProfile = { ...businessProfile };
    if (updatedProfile[uei]) {
      updatedProfile[uei].claimed = true;
      setBusinessProfile(updatedProfile);
    }
  };
  // Helper function to generate accordion item props
  const validateBusinessAccordionProps = (uei: string): AccordionItemProps[] => [
    {
      title: <div style={{ display: 'flex', justifyContent: 'space-between' }}>{businessProfile[uei].name}</div>,
      content: (
        <div className="default-table">
          {businessProfile[uei].claimed ? (
            <Alert role="alert" type="success" heading="Claimed" headingLevel="h5" slim />
          ) : null}
          <ValidationTable profile={businessProfile[uei]} />
          {!businessProfile[uei].claimed && (
            <ButtonGroup type="default" className='default-btn'>
              <Button
                type="button"
                name={uei}
                onClick={() => onClickVerify(uei)}
              >
                  Claim
              </Button>
            </ButtonGroup>
          )}
        </div>
      ),
      expanded: true,
      id: `business-profile-${uei}`,
      className: 'myCustomAccordionItem',
      headingLevel: 'h4'
    }
  ];

  return (
    <Grid row gap>
      {Object.keys(businessProfile).map((uei) => (
        <Grid key={uei} mobile={{ col: 12 }} desktop={{ col: 6 }} style={{ marginBottom: '1rem' }}>
          <Accordion
            bordered={true}
            items={validateBusinessAccordionProps(uei)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BusinessAccordion;
