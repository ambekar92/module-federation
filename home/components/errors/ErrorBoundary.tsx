// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react'
import HttpError from '../../utils/HtmlError'

interface Props {
   children: ReactNode
}

interface State {
   hasError: boolean
   error: Error | HttpError | null
}

class ErrorBoundary extends Component<Props, State> {
   state: State = {
      hasError: false,
      error: null
   }

   static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error }
   }

   componentDidCatch(error: Error) {
      this.setState({ error })
   }

   render() {
      if (this.state.hasError) {
         // Check if the error is an HttpError
         if (this.state.error instanceof HttpError) {
            const { statusCode, header } = this.state.error

            // Render based on status code
            return (
               <main className="error-boundary">
                  <img className="logo_sm" src="../sba-stacked.svg" alt="Logo" />
                  <section className="container">
                     <h1 className="status">{statusCode}</h1>
                     <h2 className="header">{header}</h2>
                     <p className="message">{this.state.error.message}</p>
                     <a className="button" href="/">
                        Go to Homepage
                     </a>
                     <img className="logo_bg" src="../public/sba-isolated.png" alt="Isolated Logo" />
                  </section>
               </main>
            )
         }
         // Render if not an instance of HttpError
         return <div>Something went wrong.</div>
      }

      return this.props.children
   }
}

export default ErrorBoundary
