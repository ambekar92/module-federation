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

interface claimBusinessFormProps {
  claimFormComplete: () => void
}

function ClaimBusinessForm({ claimFormComplete = () => {} }: claimBusinessFormProps) {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState('');
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<ClaimBusinessInputs>({
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

      <ErrorModal open={open} handleClose={handleClose} error={serverError} />

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
                <li>We recommend confirming your UEI, TIN, CAGE (if applicable), and bank account number in SAM.gov <Link href="https://sam.gov/content/entity-registration" target="_blank" title="Get Started with Registration and the Unique Entity ID">https://sam.gov/content/entity-registration</Link>.</li>
                <li>Ensure your SAM.gov account is current and active. <Link href="https://sam.gov/content/status-tracker" target="_blank" title="Check Entity Status">https://sam.gov/content/status-tracker</Link></li>
                <li className="text-bold">Note that if you make changes to your SAM.gov account, it will not be available in UCP until after it has been reviewed and ACTIVATED by SAM.gov.</li>
              </ul>
              <p role="note" className="text-bold">IMPORTANT NOTE: SBA will only accept submissions from Qualified Owners (primary, majority business owners).</p>
            </SummaryBoxContent>
          </SummaryBox>
        </Grid>

        <ClaimInputs
          handleOpen={handleOpen}
          claimFormComplete={claimFormComplete}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          isValid={isValid}
        />
      </Grid>
    </GridContainer>
  )

}

export default ClaimBusinessForm