'use client'
import React from 'react'
import { Alert } from '@trussworks/react-uswds'
interface MessageProps {
  label: string
}
const ErrorAlert: React.FC<MessageProps> = ({ label }) => {
  return (
    <div className="padding-top-3">
      <Alert type="error" headingLevel="h2">
        <span>{label}</span>
      </Alert>
    </div>
  )
}
export default ErrorAlert
