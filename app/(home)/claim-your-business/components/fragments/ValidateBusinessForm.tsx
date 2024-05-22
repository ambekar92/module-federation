/* eslint-disable no-console */
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

const validationTableContent = (profile: IBusinessProfile) => (
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
        <td>{profile.name}</td>
      </tr>
      <tr>
        <th scope="row">DBA</th>
        <td>{profile.dba}</td>
      </tr>
      <tr>
        <th scope="row">Business UEI</th>
        <td>{profile.uei}</td>
      </tr>
      <tr>
        <th scope="row">Business Address</th>
        <td>{profile.address}</td>
      </tr>
      <tr>
        <th scope="row">Government Contact</th>
        <td>{profile.contact}</td>
      </tr>
      <tr>
        <th scope="row">Business Structure</th>
        <td>{profile.type}</td>
      </tr>
      <tr>
        <th scope="row">Entity-Owned</th>
        <td>{profile.owned}</td>
      </tr>
    </tbody>
  </>
)

function ValidateBusinessForm() {
  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const handleClose = () => setOpen(false)

  const [businessProfile, setBusinessProfile] = useState<BusinessProfileType>({
    '1234567890ab': {
      dba: 'SUCCESS Buck Enterprises',
      name: 'Uncle Buck\'s Organic Coffee',
      uei: '01234567890ab',
      address: '123 Sesame Street, Manhattan NY',
      contact: 'Elon Musk',
      type: 'S Corporation',
      owned: 'Buck Corp',
      claimed: false,
    },
    '1234567890cd': {
      dba: 'ERROR Buck Enterprises',
      name: 'Uncle Buck\'s Flowershop',
      uei: '01234567890cd',
      address: '345 Sesame Street, Manhattan NY',
      contact: 'Clark Kent',
      type: 'S Corporation',
      owned: 'Buck Corp',
      claimed: false,
    },
    '1234567890ef': {
      dba: 'Buck Enterprises',
      name: 'Uncle Buck\'s Barbershop',
      uei: '01234567890ef',
      address: '567 Sesame Street, Manhattan NY',
      contact: 'Donald Trump',
      type: 'S Corporation',
      owned: 'Buck Corp',
      claimed: true,
    },
    '1234567890gh': {
      dba: 'Buck Enterprises',
      name: 'Uncle Buck\'s Candy Shop',
      uei: '01234567890gh',
      address: '789 Sesame Street, Manhattan NY',
      contact: 'Ryan Renolds',
      type: 'S Corporation',
      owned: 'Buck Corp',
      claimed: true,
    },
  })

  const handleRequest = async (uei: string) => {
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
    })

    // this condition should be !response.ok, but for mock purposes we are checking the uei number to throw the error.
    if (uei === '1234567890cd') {
      setErrorMsg('network error')
      setOpen(true)
      return
    }

    if (response.ok) {
      setOpen(true)
      return
    }
    const resData = await response
    console.log('Response Data: ', resData)
  }

  const onClickVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const uei = e.currentTarget.name
    const updatedProfile = { ...businessProfile }
    await handleRequest(uei)
    // this condition should be just businessProfile[uei], but for mock purposes we are checking the uei number for it not to mark it as claimed.
    if (businessProfile[uei] && uei !== '1234567890cd') {
      updatedProfile[uei].claimed = true
      setBusinessProfile(updatedProfile)
    }
  }

  const validateBusinessAccordionProps = (uei: string): IAccordionItem[] => [
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {businessProfile[uei].name}
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
                  Identification Numbers (TIN). Review the information and click
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
                href="/add-delegate"
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
