import React from 'react'

const NotFoundPage = () => {
  return (
    <main className="not-found">
      <img className="logo_sm" src="/sba-stacked.svg" alt="logo" />
      <section className="container">
        <p className="message">Page you are looking for does not exist .</p>
        <a className="button" href="/">
          Go to Homepage
        </a>
        <img className="logo_bg" src="/sba-isolated.png" alt="Isolated Logo" />
      </section>
    </main>
  )
}

export default NotFoundPage
