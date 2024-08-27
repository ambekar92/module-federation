import React from 'react'
import ReadinessForm from './Form'

const ReadinessPage = () => {

  return (
    <>
      <header>
        <h2>Readiness</h2>
        <p className='font-ui-md'>Is your business ready to take full advantage of the SBA Certification Program?</p>
      </header>

      <main className='bg-base-lightest padding-2 radius-sm'>
        <ReadinessForm />
      </main>
    </>
  )
}

export default ReadinessPage
