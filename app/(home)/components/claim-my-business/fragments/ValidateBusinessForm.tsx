import {
  ButtonGroup,
  Grid, GridContainer, Link,
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading
} from '@trussworks/react-uswds'
import { useEffect } from 'react'
import BusinessAccordion from './BusinessAccordion'

function ValidateBusinessForm() {
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  return (
    <main id='validate-business'>
      <GridContainer containerSize="widescreen">
        <Grid row>
          <Grid col={12}>
            <h1 className="underline-heading">Claim Your Business</h1>
          </Grid>
        </Grid>
        <Grid row gap>
          <Grid mobile={{ col: 12 }}>
            <SummaryBox style={{ marginBottom: '1.25rem' }}>
              <SummaryBoxHeading headingLevel="h3">Verify your business(es)</SummaryBoxHeading>
              <SummaryBoxContent>
                <p>
									Below are the SAM registrations linked to your Taxpayer Identification Numbers (TIN). Review
									the information and click the Claim button if correct.
                </p>
                <p>
                  If any of the information here is incorrect, <b style={{ color: 'red' }}>STOP</b> now and go to{' '}
                  <a href="https://sam.gov/content/home" target="_blank" title="Open SAM.gov" rel="noreferrer">
									SAM.gov
                  </a>{' '}
									to make corrections. Note that if the business structure is incorrect, you will be required
									to resubmit your entire application. After your updates have been reviewed and ACTIVATED by
									SAM.gov, the changes will appear here within 3 business days.
                </p>
              </SummaryBoxContent>
            </SummaryBox>
          </Grid>
        </Grid>

        <BusinessAccordion />

        <Grid row>
          <Grid col={1} offset={11}>
            <div className="default-btn">
              <div className="usa-button-group-container">
                <ButtonGroup type="default">
                  <Link href="/claim-your-business" className="usa-button usa-button--outline right-">
                    Back
                  </Link>
                </ButtonGroup>
              </div>
            </div>
          </Grid>
        </Grid>
      </GridContainer>
    </main>
  )
}

export default ValidateBusinessForm
