import { Grid, SummaryBox, SummaryBoxContent, SummaryBoxHeading } from '@trussworks/react-uswds'
import Link from 'next/link'
import Styles from '../ClaimMyBusiness.module.scss'

function CMBFormSummaryBoxes() {
  return (
    <>
      <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
        <SummaryBox className={Styles.mb_default}>
          <SummaryBoxHeading headingLevel="h3">
              This process must be completed by a Qualifying Owner of the
              business
          </SummaryBoxHeading>
          <SummaryBoxContent>
            <p>
                The Qualifying Owner is also responsible for attesting to the
                legally-required verification of information during the
                application process.
            </p>
          </SummaryBoxContent>
        </SummaryBox>
        <SummaryBox className={Styles.mb_default}>
          <SummaryBoxHeading headingLevel="h3">
              Verify your business ownership with SAM.gov.
          </SummaryBoxHeading>
          <SummaryBoxContent>
            <p>
                SBA uses the business information from your{' '}
              <Link
                href="https://sam.gov/content/home"
                target="_blank"
                title="Open SAM.gov"
              >
                  SAM.gov
              </Link>{' '}
                account to verify your identity.
            </p>
            <p>Before you begin:</p>
            <ul>
              <li>
                  Ensure your SAM.gov account is current and active.{' '}
                <Link
                  href="https://sam.gov/content/status-tracker"
                  target="_blank"
                  title="Check Entity Status"
                >
                    https://sam.gov/content/status-tracker
                </Link>
              </li>
              <li>
                  If you already have a SAM.gov account, we recommend confirming
                  your UEI, TIN, CAGE (if applicable), and bank account number
                  in SAM.gov{' '}
                <Link
                  href="https://sam.gov/content/entity-registration"
                  target="_blank"
                  title="Get Started with Registration and the Unique Entity ID"
                >
                    https://sam.gov/content/entity-registration
                </Link>
                  .
              </li>
              <li>
                  Note that if you make changes to your SAM.gov account, it will
                  not be available in UCP until after it has been reviewed and{' '}
                <b>ACTIVATED</b> by SAM.gov.
              </li>
            </ul>
            <p role="note" className="text-bold">
                IMPORTANT NOTE: SBA will only accept submissions from Qualifying
                Owners (primary, majority business owners).
            </p>
          </SummaryBoxContent>
        </SummaryBox>
        <SummaryBox className={Styles.mb_default}>
          <SummaryBoxHeading headingLevel="h3">
              For sole proprietorships
          </SummaryBoxHeading>
          <SummaryBoxContent>
            <p>
                You can use your Social Security Number (SSN) for business
                purposes. However, it is highly recommended that businesses
                obtain an Employer Identification Number (EIN). Applying for an
                EIN is simple and using your SSN for business can pose security
                and privacy risks. Please visit{' '}
              <Link
                href="https://irs.gov"
                target="_blank"
                title="Open irs.gov"
              >
                  IRS.gov
              </Link>{' '}
                to apply for an EIN.
            </p>
          </SummaryBoxContent>
        </SummaryBox>
      </Grid>
    </>
  )
}
export default CMBFormSummaryBoxes
