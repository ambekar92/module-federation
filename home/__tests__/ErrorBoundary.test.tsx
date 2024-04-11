import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../components/errors/ErrorBoundary'
import { MockErrorComponent, MockSuccessComponent } from './MockBoundary'
import React from 'react'
import HttpError from '../utils/HtmlError'

describe('ErrorBoundary', () => {
   test('renders child component when no error is thrown', () => {
      render(
         <ErrorBoundary>
            <MockSuccessComponent />
         </ErrorBoundary>
      )
      expect(screen.getByText('Component loaded successfully')).toBeInTheDocument()
   })

   test('renders fallback UI for a 404 error', () => {
      console.error = jest.fn() // Suppress error logs for this test

      render(
         <ErrorBoundary>
            <MockErrorComponent statusCode={404} />
         </ErrorBoundary>
      )
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument()
   })

   test('renders fallback UI for a 500 error', () => {
      render(
         <ErrorBoundary>
            <MockErrorComponent statusCode={500} />
         </ErrorBoundary>
      )
      expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument()
   })
})
