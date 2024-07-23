'use client'
import React from 'react'
import { Alert } from '@trussworks/react-uswds'

interface CustomAlertProps {
  label: string
  name?: string
}

const CustomAlert: React.FC<CustomAlertProps> = ({ name, label }) => {
  return (
    <Alert type="success" headingLevel="h4">
      {name?  <>
            User <span style={{ fontWeight: 'bold' }}>{name}</span> has been successfully added
      </>: <p>{label}</p>}
    </Alert>
  )
}
export default CustomAlert
