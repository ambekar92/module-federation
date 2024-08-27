'use client'
import React from 'react'

const error = ({error}: any) => {
  console.error('error', error)
  return (
    <div>
      <p>Error occurred. Please try again later</p>
      <pre>Message for developer: error details are in the console</pre>
    </div>
  )
}

export default error
