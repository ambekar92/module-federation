'use client'
import React, { useState, useEffect } from 'react'
import {
  Accordion,
  Alert,
  ButtonGroup,
  Button,
  Table,
  Link,
} from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'

const validationTableContent = (profile: {
  name: string
  dba: string
  uei: string
  address: string
  contact: string
  type: string
  owned: string
}) => (
  <>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Sam.gov.profile</th>
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

const businessTypeSelectOptions = (
  <>
    <option value="">- Select - </option>
    <option value="Sole Proprietorship">Sole Proprietorship</option>
    <option value="Partnership">Partnership</option>
    <option value="LLC">Limited Liability Company (LLC)</option>
    <option value="corporation">Corporation</option>
    <option value="S Corporation">S Corporation</option>
  </>
)

function ValidateBusinessForm() {
  const [businessProfile, setBusinessProfile] = useState({
    '1234567890ab': {
      dba: 'Buck Enterprises',
      name: 'Uncle Buck\'s Organic Coffee',
      uei: '01234567890ab',
      address: '123 Sesame Street, Manhattan NY',
      contact: 'Elon Musk',
      type: 'S Corporation',
      owned: 'Buck Corp',
      claimed: false,
    },
    '1234567890cd': {
      dba: 'Buck Enterprises',
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

  const onClickVerify = (e: Event) => {
    const updatedProfile = { ...businessProfile }
    updatedProfile[e.target.name].claimed = true
    setBusinessProfile({
      ...updatedProfile,
    })
  }

  const validateBusinessAccordionProps = (
    uei: string,
    onClick,
  ): AccordionItemProps[] => [
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
                    role="button"
                    name={uei}
                    onClick={(e: Event) => {
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
      <Alert
        role="alert"
        type="info"
        heading="Verify your business(es)"
        headingLevel="h4"
      >
        Below are the SAM registrations linked to your Taxpayer Identification
        Numbers (TIN). Review the information and click the Claim button if
        correct.
        <br />
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
        to make corrections. Note that if the business structure is incorrect,
        you will be required to resubmit your entire application. After your
        updates have been reviewed and ACTIVATED by SAM.gov, the changes will
        appear here within 3 business days.
      </Alert>
      <br />
      {Object.keys(businessProfile).map((uei: string) => (
        <>
          <Accordion
            name="validateBusinessAccordion"
            bordered={true}
            items={validateBusinessAccordionProps(uei, onClickVerify)}
          />
        </>
      ))}
      <br />
      <div className="default-btn">
        <div className="usa-button-group-container">
          <ButtonGroup type="default">
            <Link
              href="/claim-your-business"
              className="usa-button usa-button--outline"
            >
              Back
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}

export default ValidateBusinessForm
