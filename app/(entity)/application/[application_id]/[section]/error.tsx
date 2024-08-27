'use client'

import React from 'react'

const error = (error: Error) => {
  console.error(error)
  return (
    <div>
      <p>
                Something went wrong. Please come back later
      </p>
      <pre>Error was logged in console</pre>
    </div>
  )
}

export default error
