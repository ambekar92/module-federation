import React from 'react'
import MatchForm from './Form'

const MatchPage = () => {
  return (
    <>

      <header>
        <h2>Match</h2>

        <p className='font-ui-md'>Do you sell what the government buys?</p>

        <p className='text-semibold'>Type in your NAICS or a description of
            your business to see how much the federal government has awarded in your field.
        </p>
      </header>

      <main >
        <MatchForm />
      </main>

    </>
  )
}

export default MatchPage
