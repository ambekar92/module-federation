import React, { useState, useEffect } from 'react'
import {
  Accordion,
  Alert,
  ButtonGroup,
  Button,
  Table,
  Link,
  SummaryBox,
  SummaryBoxHeading,
  SummaryBoxContent,
  Grid,
  GridContainer,
} from '@trussworks/react-uswds'
import {
  BusinessProfileType,
  IAccordionItem,
  IBusinessProfile,
} from '../utils/types'
import ErrorModal from './ErrorModal'
import SuccessModal from './SuccessModal'

const validationTableContent = ({
  legal_business_name,
  dba_name,
  uei,
  physical_address_1,
  physical_address_2,
  physical_city,
  mailing_address_state_or_province,
  entity_structure,
  govt_bus_poc_first_name,
  govt_bus_poc_last_name,
  owned
}: IBusinessProfile) => (
  <>
    <thead>
      <tr>
        <th scope="col" colSpan={2}>
          SAM.gov profile
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Business Name</th>
        <td>{legal_business_name}</td>
      </tr>
      <tr>
        <th scope="row">DBA</th>
        <td>{dba_name}</td>
      </tr>
      <tr>
        <th scope="row">Business UEI</th>
        <td>{uei}</td>
      </tr>
      <tr>
        <th scope="row">Business Address</th>
        <td>
          {physical_address_1}, {physical_address_2 !== '' && physical_address_2},{' '}
          {physical_city}, {mailing_address_state_or_province}
        </td>
      </tr>
      <tr>
        <th scope="row">Government Contact</th>
        <td>{govt_bus_poc_first_name} {govt_bus_poc_last_name}</td>
      </tr>
      <tr>
        <th scope="row">Business Structure</th>
        <td>{entity_structure}</td>
      </tr>
      <tr>
        <th scope="row">Entity-Owned</th>
        <td>{owned}</td>
      </tr>
    </tbody>
  </>
)

interface ValidateBusinessFormProps {
  samData: BusinessProfileType
}

function ValidateBusinessForm({ samData }: ValidateBusinessFormProps) {
  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const handleClose = () => setOpen(false)

  const [businessProfile, setBusinessProfile] = useState<BusinessProfileType>(samData)

  const handleRequest = async (uei: string) => {
    try {
      const response = await fetch('/api/kafka/produce', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':
						'elUDIAmYyTg1e0RVftRoeZUfSPZ9M7FyUior8GaXt3uvw3ODpKoEGlEzltfu4hlI',
        },
        body: JSON.stringify({
          sam_entity_id: uei,
          owner_user_id: uei,
          type: 'string',
          structure: 'string',
        }),
      });

      // Check for mock purpose error trigger based on UEI
      if (uei === '1234567890cd') {
        throw new Error('network error');
      }

      // Handling response.ok indicating a successful HTTP response
      if (!response.ok) {
        throw new Error('network error');
      }

      setOpen(true);
    } catch (error: any) {
      console.error('Error: ', error.message);
      setErrorMsg('network error');
      setOpen(true);
    }
  }

  const onClickVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const uei = e.currentTarget.name
    const updatedProfile = { ...businessProfile }
    // await handleRequest(uei)
    // this condition should be just businessProfile[uei], but for mock purposes we are checking the uei number for it not to mark it as claimed.
    if (businessProfile[uei]) {
      updatedProfile[uei].claimed = true
      setBusinessProfile(updatedProfile)
    }
  }

  const validateBusinessAccordionProps = (uei: string): IAccordionItem[] => [
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {businessProfile[uei].legal_business_name}
        </div>
      ),
      content: (
        <div className="default-table">
          {businessProfile[uei].claimed ? (
            <Alert
              role="alert"
              type="success"
              heading="Claimed"
              headingLevel="h5"
              slim
            ></Alert>
          ) : null}
          <Table bordered={false}>
            {validationTableContent(businessProfile[uei])}
          </Table>
          {!businessProfile[uei].claimed ? (
            <div className="default-btn">
              <div className="usa-button-group-container">
                <ButtonGroup type="default">
                  <Button
                    type="button"
                    role="button"
                    name={uei}
                    onClick={(e) => {
                      onClickVerify(e)
                    }}
                  >
                    Claim
                  </Button>
                  <br />
                </ButtonGroup>
              </div>
            </div>
          ) : null}
        </div>
      ),
      expanded: true,
      id: '123',
      className: 'myCustomAccordionItem',
      headingLevel: 'h4',
    },
  ]

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  return (
    <>
      <GridContainer containerSize="widescreen">
        {
          errorMsg !== '' ? <ErrorModal open={open} handleClose={handleClose} error={errorMsg} /> : <SuccessModal open={open} handleClose={handleClose}/>
        }
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
          {Object.keys(businessProfile).map((uei: string) => (
            <Grid
              key={uei}
              mobile={{ col: 12 }}
              desktop={{ col: 6 }}
              style={{ marginBottom: '1rem' }}
            >
              <Accordion
                bordered={true}
                items={validateBusinessAccordionProps(uei)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid row>
          <Grid col={12}>
            <ButtonGroup className='display-flex flex-justify-end width-full padding-y-2' type="default">
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
  )
}

export default ValidateBusinessForm
