import { zodResolver } from '@hookform/resolvers/zod';
import {
  Grid,
  GridContainer,
  Link,
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading
} from '@trussworks/react-uswds';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClaimInputs from './ClaimInputs';
import ErrorModal from './ErrorModal';
import { ClaimBusinessSchema } from '../utils/schemas';
import { ClaimBusinessInputs } from '../utils/types';
import Styles from '../ClaimMyBusiness.module.scss';
import React from 'react';
import { ApiResponse } from '@/app/services/fetcher';

interface claimBusinessFormProps {
  // eslint-disable-next-line no-unused-vars
  claimFormComplete: (responseData: ApiResponse) => void
}

function ClaimBusinessForm({ claimFormComplete }: claimBusinessFormProps) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const { control, handleSubmit, setError, formState: { errors, isValid, touchedFields } } = useForm<ClaimBusinessInputs>({
    resolver: zodResolver(ClaimBusinessSchema),
    mode: 'onBlur',
    defaultValues: {
      uei: '',
      cageCode: '',
      bankAccountNumber: '',
      tin: '',
      serverError: undefined
    }
  });

  return (
    <GridContainer containerSize="widescreen">

      <ErrorModal open={open} handleClose={handleClose} error={errors.serverError?.message} />

      <Grid row>
        <Grid col={12}>
          <h1 className="underline-heading">Claim Your Business</h1>
          <h3>To claim your business, you must verify your business information with SAM.gov. If you have multiple businesses, you will need to verify each business separately.</h3>
        </Grid>
      </Grid>
      <Grid row gap>
        <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
          <SummaryBox className={Styles.mb_default}>
            <SummaryBoxHeading headingLevel="h3">
            	This process must be completed by a Qualifying Owner of the business
            </SummaryBoxHeading>
            <SummaryBoxContent>
              <p>The Qualifying Owner is also responsible for attesting to the legally-required verification of information during the application process.</p>
            </SummaryBoxContent>
          </SummaryBox>
          <SummaryBox className={Styles.mb_default}>
            <SummaryBoxHeading headingLevel="h3">Verify your business ownership with SAM.gov.</SummaryBoxHeading>
            <SummaryBoxContent>
              <p>SBA uses the business information from your <Link href="https://sam.gov/content/home" target="_blank" title="Open SAM.gov">SAM.gov</Link> account to verify your identity.</p>
              <p>Before you begin:</p>
              <ul>
                <li>Ensure your SAM.gov account is current and active. <Link href="https://sam.gov/content/status-tracker" target="_blank" title="Check Entity Status">https://sam.gov/content/status-tracker</Link></li>
                <li>If you already have a SAM.gov account, we recommend confirming your UEI, TIN, CAGE (if applicable), and bank account number in SAM.gov <Link href="https://sam.gov/content/entity-registration" target="_blank" title="Get Started with Registration and the Unique Entity ID">https://sam.gov/content/entity-registration</Link>.</li>
                <li className="text-bold">Note that if you make changes to your SAM.gov account, it will not be available in UCP until after it has been reviewed and ACTIVATED by SAM.gov.</li>
              </ul>
              <p role="note" className="text-bold">IMPORTANT NOTE: SBA will only accept submissions from Qualifying Owners (primary, majority business owners).</p>
            </SummaryBoxContent>
          </SummaryBox>
          <SummaryBox className={Styles.mb_default}>
            <SummaryBoxHeading headingLevel="h3">
              For sole proprietorships
            </SummaryBoxHeading>
            <SummaryBoxContent>
              <p>You can use your Social Security Number (SSN)
                for business purposes. However, it is highly recommended that businesses
                obtain an Employer Identification Number (EIN). Applying for an EIN is
                simple and using your SSN for business can pose security and privacy risks.
                Please visit <Link href="https://irs.gov" target="_blank" title="Open irs.gov">
                  IRS.gov
              </Link> to apply for an EIN.</p>
            </SummaryBoxContent>
          </SummaryBox>
        </Grid>

        <ClaimInputs
          handleOpen={handleOpen}
          claimFormComplete={claimFormComplete}
          control={control}
          errors={errors}
          setError={setError}
          handleSubmit={handleSubmit}
          isValid={isValid}
          touchedFields={touchedFields}
        />
      </Grid>
    </GridContainer>
  )

}

export default ClaimBusinessForm
