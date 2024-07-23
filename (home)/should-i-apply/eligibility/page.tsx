import React from 'react'
import EligibilityForm from './Form'

const EligibilityPage = () => {
  return (
    <>
        <header>
            <h2>Eligibility</h2>
            <p className='font-ui-md'>Are you eligible for the SBA Certification Program?</p>

        </header>
        <main className='bg-base-lightest padding-2 radius-sm'>
            <EligibilityForm />
        </main>
    </>
  )
}

export default EligibilityPage