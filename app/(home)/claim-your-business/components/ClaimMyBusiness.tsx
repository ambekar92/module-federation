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
      <GridContainer containerSize="widescreen">
        <Grid row>
          <Grid col={12}>
            <p>
							Welcome to UCMS. The first step to submitting an application is
							claiming your business.

              <span>This process must be completed by a <b>Qualifying Owner of the business</b>. </span>

              <span>
								The Qualifying Owner is also responsible for attesting to the
          			legally-required verification of information during the application
          			process.
              </span>
            </p>
          </Grid>
        </Grid>
      </GridContainer>
      {readyToValidate ? <ValidateBusinessForm /> : <ClaimBusinessForm claimFormComplete={claimFormComplete} />}
    </div>
  )
}
