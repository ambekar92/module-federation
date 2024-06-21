import { Show } from '@/app/shared/components/Show';
import {
  Accordion,
  Button,
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
  CmbResponseType,
  IAccordionItem
} from '../../utils/types';
import ConfirmModal from '../modals/ConfirmModal';
import ErrorModal from '../modals/ErrorModal';
import SuccessModal from '../modals/SuccessModal';
import ValidationTable from './ValidationTable';
interface ValidateBusinessFormProps {
  samData: CmbResponseType
}

function ValidateBusinessForm({ samData }: ValidateBusinessFormProps) {
  const [open, setOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const handleClose = () => setOpen(false);
  const handleModalOpen = () => setShowConfirmationModal(!showConfirmationModal);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPostSuccessful, setPostSuccessful] = useState(false);

  const validateBusinessAccordionProps = (): IAccordionItem[] => {
    return ([{
      title: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {samData.sam_entity.legal_business_name}
        </div>
      ),
      content: (
        <div className="default-table">
          <ValidationTable profiles={samData} />
        </div>
      ),
      expanded: true,
      id: `accordion-item-${1}`,
      className: 'myCustomAccordionItem',
      headingLevel: 'h4',
    }]);
  };

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  return (
    <>
      <GridContainer containerSize="widescreen">
        <Show>
          <Show.When isTrue={errorMsg === 'success'}>
            <SuccessModal open={open} handleClose={handleClose} />
          </Show.When>
        </Show>

        <Show>
          <Show.When isTrue={errorMsg === 'network error'}>
            <ErrorModal open={open} handleClose={handleClose} error={errorMsg} />
          </Show.When>
        </Show>

        <Show>
          <Show.When isTrue={showConfirmationModal && errorMsg === ''}>
            <ConfirmModal handleClose={handleModalOpen} open={showConfirmationModal} setErrorMsg={setErrorMsg} setPostSuccessful={setPostSuccessful} business={samData} />
          </Show.When>
        </Show>

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
              {isPostSuccessful ? (
                <Link href="/select-intended-programs" className="usa-button usa-button">
								Continue
                </Link>
              ): (
                <Button
                  onClick={handleModalOpen}
                  type='button'
                >
                Next
                </Button>
              )}
            </ButtonGroup>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}

export default ValidateBusinessForm;
