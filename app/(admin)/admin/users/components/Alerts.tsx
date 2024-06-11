'use client'
import React from 'react'
import { Alert } from '@trussworks/react-uswds'

interface CustomAlertProps {
  label: string
}

const CustomAlert: React.FC<CustomAlertProps> = ({ label }) => {
  return (
    <Alert type="success" heading="Success status" headingLevel="h4">
      {label}
    </Alert>
  )
}
export default CustomAlert
