import React from 'react'
import ValidateBusinessForm from '../components/ClaimBusinessForm/ValidateBusinessForm'
import ClaimBusinessForm from '../components/ClaimBusinessForm/ClaimBusinessForm'

export default function ClaimBusiness(): JSX.Element {
  const readyToValidate = false

  return (
    <div>
      <div className="claim-business">
        <p>
          Welcome to UCMS. The first step to submitting an application is
          claiming your business.
          <br />
          This process must be completed by a{' '}
          <b>Qualifying Owner of the business</b>.
          <br />
          The Qualifying Owner is also responsible for attesting to the
          legally-required verification of information during the application
          process.
        </p>
        {readyToValidate ? <ValidateBusinessForm /> : <ClaimBusinessForm />}
      </div>
    </div>
  )
}
