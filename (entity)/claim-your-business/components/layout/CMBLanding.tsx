import { toolTipCmbInvitationInfo } from '@/app/constants/tooltips'
import Tooltip from '@/app/shared/components/tooltip/Tooltip'
import { Button, ButtonGroup } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useState } from 'react'
import CustomHeader from '../../../../shared/components/forms/CustomHeader'
import InvitationCodeForm from '../forms/InvitationCodeForm'

interface claimBusinessLandingProps {
  proceedToClaimBusiness: () => void
}

function ClaimBusinessLanding({
  proceedToClaimBusiness,
}: claimBusinessLandingProps) {
  const [enterInvitationCode, setEnterInvitationCode] = useState(false)

  const onEnterCodeClick = () => {
    setEnterInvitationCode(true)
  }

  const submitForm = () => {
    proceedToClaimBusiness()
  }

  return (
    <section>
      {enterInvitationCode ? (
        <InvitationCodeForm submitForm={submitForm} />
      ) : (
        <section>
          <CustomHeader title="Small Business Certification"></CustomHeader>
          <div className="usa-alert usa-alert--warning maxw-full width-full">
            <div
              className="usa-alert__body width-full"
              style={{ maxWidth: '100%' }}
            >
              <h4 className="usa-alert__heading">
								Have an Invitation Code?
                <span className='text-normal'>
                  <Tooltip text={toolTipCmbInvitationInfo}/>
                </span>
              </h4>
              <p className="usa-alert__text">
                If you have been emailed an invitation code please click the
                link to enter.
              </p>
              <ButtonGroup className="display-flex flex-column flex-align-end">
                <Button type="button" onClick={onEnterCodeClick}>
                  Enter Code
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <h2>Before you begin:</h2>
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
            <Tooltip text={toolTipCmbInvitationInfo}/>
          </p>
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
              your UEI, TIN, CAGE (if applicable), and bank account number in
              SAM.gov{' '}
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
              Note that if you make changes to your SAM.gov account, it will not
              be available in UCP until after it has been reviewed and{' '}
              <b>ACTIVATED</b> by SAM.gov.
            </li>
          </ul>
          <div className="usa-alert usa-alert--info maxw-full width-full">
            <div
              className="usa-alert__body width-full"
              style={{ maxWidth: '100%' }}
            >
              <h4 className="usa-alert__heading">Important Note</h4>
              <p className="usa-alert__text">
                SBA will only accept submissions from Qualifying Owners
                (primary, majority business owners).
              </p>
            </div>
          </div>
          <ButtonGroup className="display-flex flex-justify flex-fill padding-y-2">
            <Button type="button" className={'display-none'}>
              Previous
            </Button>
            <Button type="button" onClick={proceedToClaimBusiness}>
              Begin
            </Button>
          </ButtonGroup>
        </section>
      )}
    </section>
  )
}

export default ClaimBusinessLanding
