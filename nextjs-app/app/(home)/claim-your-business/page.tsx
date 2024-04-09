import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ValidateBusinessForm from '../components/ClaimBusinessForm/ValidateBusinessForm'
import ClaimBusinessForm from '../components/ClaimBusinessForm/ClaimBusinessForm'

export default function ClaimBusiness(): JSX.Element {
  //tmp
  const readyToValidate = false
  //   const { isAuthenticated, session } = useAuth()
  //   const [readyToValidate, setReadyToValidate] = useState(false)

  //   if (!isAuthenticated) {
  //     return <Login redirect="/claimbusiness" />
  //   }

  const claimFormComplete = () => {
    // setReadyToValidate(true)
  }

  return (
    <div>
      <div className="claim-business">
        {/* <h1>Welcome, {session?.user?.name}</h1> */}
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
        {readyToValidate ? (
          <ValidateBusinessForm />
        ) : (
          <ClaimBusinessForm
          //   claimFormComplete={claimFormComplete}
          />
        )}
      </div>
    </div>
  )
}
