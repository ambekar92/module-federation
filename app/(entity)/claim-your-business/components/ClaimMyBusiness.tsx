/* eslint-disable no-debugger */
/* eslint-disable no-console */
'use client' // Temp until BE
import React, { useState } from 'react'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import ValidateBusinessForm from './fragments/ValidateBusinessForm'
import ClaimBusinessForm from './fragments/ClaimBusinessForm'
import Styles from './ClaimMyBusiness.module.scss';
import { BusinessProfileType, IBusinessProfile } from './utils/types'

export default function ClaimBusiness(): JSX.Element {
  const [readyToValidate, setReadyToValidate] = useState(false)
  const [samData, setSamData] = useState<BusinessProfileType>({})

  const claimFormComplete = (responseData: any) => {
    const businessesArray = responseData
    const businessesData: { [key: string]: any } = {}
    businessesArray.forEach((business: IBusinessProfile) => {
      businessesData[business.uei] = business
    })

    setSamData(businessesData)
    setReadyToValidate(true)
  }

  return (
    <div className={Styles.mb_default} >
      {readyToValidate ? <ValidateBusinessForm samData={samData} /> : <ClaimBusinessForm claimFormComplete={claimFormComplete} />}
    </div>
  )
}
