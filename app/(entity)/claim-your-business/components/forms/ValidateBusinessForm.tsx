import { CmbResponseType } from '@/app/services/cmb-fetcher';
import {
  Accordion,
  Alert,
  ButtonGroup,
  Grid,
  GridContainer,
  Link,
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading
} from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import {
  IAccordionItem
} from '../../utils/types';
import ValidationTable from '../fragments/ValidationTable';
import ErrorModal from '../modals/ErrorModal';
import SuccessModal from '../modals/SuccessModal';

interface ValidateBusinessFormProps {
  samData: CmbResponseType;
}

function ValidateBusinessForm({ samData }: ValidateBusinessFormProps) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [errorMsg, setErrorMsg] = useState('');
  const handleClose = () => setOpen(false);

  const validateBusinessAccordionProps = (): IAccordionItem[] => [
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {samData.sam_entity.legal_business_name}
        </div>
      ),
      content: (
        <div className="default-table">
          {samData.message === 'This business has not been claimed yet'
					&& (
					  <>
					    <Alert
					      role="alert"
					      type="success"
					      heading="Claimed"
					      headingLevel="h4"
					      slim
					    />
					    <ValidationTable profile={samData} />
					  </>
					)}
        </div>
      ),
      expanded: true,
      id: '123',
      className: 'myCustomAccordionItem',
      headingLevel: 'h4',
    },
  ];

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <>
      <GridContainer containerSize="widescreen">
        {errorMsg !== '' ? (
          <ErrorModal open={open} handleClose={handleClose} error={errorMsg} />
        ) : (
          <SuccessModal open={open} handleClose={handleClose} />
        )}
        <Grid row>
          <Grid col={12}>
            <h1 className="underline-heading">Claim Your Business</h1>
          </Grid>
        </Grid>
        <Grid row gap>
          <Grid mobile={{ col: 12 }}>
            <SummaryBox style={{ marginBottom: '1.25rem' }}>
              <SummaryBoxHeading headingLevel="h3">
                Verify your business(es)
              </SummaryBoxHeading>
              <SummaryBoxContent>
                <p>
                  Below are the SAM registrations linked to your Taxpayer
                  Identification Number (TIN). Review the information and click
                  the Claim button if correct.
                </p>
                <p>
                  If any of the information here is incorrect,{' '}
                  <b style={{ color: 'red' }}>STOP</b> now and go to{' '}
                  <a
                    href="https://sam.gov/content/home"
                    target="_blank"
                    title="Open SAM.gov"
                    rel="noreferrer"
                  >
                    SAM.gov
                  </a>{' '}
                  to make corrections. Note that if the business structure is
                  incorrect, you will be required to resubmit your entire
                  application. After your updates have been reviewed and
                  ACTIVATED by SAM.gov, the changes will appear here within 3
                  business days.
                </p>
              </SummaryBoxContent>
            </SummaryBox>
          </Grid>
        </Grid>
        <Grid row gap>
          <Grid
            key={samData.sam_entity.uei}
            mobile={{ col: 12 }}
            desktop={{ col: 6 }}
            style={{ marginBottom: '1rem' }}
          >
            <Accordion
              bordered={true}
              items={validateBusinessAccordionProps()}
            />
          </Grid>
        </Grid>
        <Grid row>
          <Grid col={12}>
            <ButtonGroup className="display-flex flex-justify width-full padding-y-2" type="default">
              <Link
                href="/claim-your-business"
                className="usa-button usa-button--outline"
              >
                Back
              </Link>
              <Link
                href="/select-intended-programs"
                className="usa-button usa-button"
              >
                Next
              </Link>
            </ButtonGroup>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}

export default ValidateBusinessForm;
