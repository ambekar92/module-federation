'use client' // Temp until BE
import React, { useState } from 'react'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import ValidateBusinessForm from './fragments/ValidateBusinessForm'
import ClaimBusinessForm from './fragments/ClaimBusinessForm'
import Styles from './ClaimMyBusiness.module.scss';

export default function ClaimBusiness(): JSX.Element {
  const [readyToValidate, setReadyToValidate] = useState(false)

  const claimFormComplete = () => {
    setReadyToValidate(true)
  }

  return (
    <div className={Styles.mb_default} >
      {readyToValidate ? <ValidateBusinessForm /> : <ClaimBusinessForm claimFormComplete={claimFormComplete} />}
    </div>
  )
}
