import React from 'react'
import OwnershipForm from './Form'

const OwnershipPage = () => {
  return (
    <>
    <header>
        <h2>Ownership</h2>
        <p className='font-ui-md'>Provide information regarding the ownership of your business.</p>

        <p className='text-semibold'>Ensure that you accurately fill out all relevant fields.</p>
    </header>
    <main className='bg-base-lightest padding-2 radius-sm'>
        <OwnershipForm />
    </main>
    </>
  )
}

export default OwnershipPage