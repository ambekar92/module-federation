import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="not-found margin-top-0 position-relative flex-fill top-0">
      <img className="logo_sm position-absolute" src="/sba-stacked.svg" alt="logo" />
      <section className="container grid-container margin-top-0">
        <div className="grid-row flex-column flex-align-center">
          <p className="message">Page you are looking for does not exist.</p>
          <a className="usa-button" href="/">
            Go to Homepage
          </a>
          <img className="logo_bg" src="/sba-isolated.png" alt="Isolated Logo" />
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage
