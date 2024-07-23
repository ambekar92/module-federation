'use client' // Error components must be Client Components
import React from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <main className="error-boundary">
      <img className="logo_sm" src="/sba-stacked.svg" alt="logo" />
      <section className="container">
        {/* the way we access status on the error object will depend on what api we use to get data (fetch / axios (?)) - hardcoding for now [mdev]*/}
        <h1 className="status">500</h1>
        <p className="message">{error.message}</p>
        <a className="button" href="/">
          Go to Homepage
        </a>
        <img className="logo_bg" src="/sba-isolated.png" alt="Isolated Logo" />
      </section>
    </main>
  )
}

export default ErrorPage
