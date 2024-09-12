import React from 'react'
import { Label } from '@trussworks/react-uswds'

interface LabeledProps {
  label: string
  id: string
}
interface SelectLabelProps {
  label: string
  id: string
}

export const Labeled: React.FC<LabeledProps> = ({ label, id }) => {
  return (
    <>
      <Label
        htmlFor={id}
        style={{
          color: '#3D4551',
          fontSize: '12px',
          opacity: '65%',
          position: 'relative',
          top: '.3rem',
        }}
        className="padding-left-1 margin-top-neg-1"
      >
        {label}
      </Label>
    </>
  )
}

export const SelectLabel: React.FC<SelectLabelProps> = ({ label, id }) => {
  return (
    <>
      <Label
        htmlFor={id}
        className="padding-left-1 margin-top-neg-3"
        style={{
          fontSize: '12px',
          position: 'relative',
          top: '1.2rem',
          opacity: '55%',
          zIndex: 1,
        }}
      >
        {label}
      </Label>
    </>
  )
}
