/* eslint-disable no-debugger */
/* eslint-disable no-console */
'use client' // Temp until BE
import React, { useState } from 'react'
import ClaimBusinessLanding from './layout/CMBLanding'
import ValidateBusinessForm from './forms/ValidateBusinessForm'
import ClaimBusinessForm from './forms/CMBForm'
import Styles from './ClaimMyBusiness.module.scss'
import { BusinessProfileType, IBusinessProfile } from '../utils/types'
import { CmbResponseType } from '@/app/services/cmb-fetcher'

export default function ClaimBusiness(): JSX.Element {
  const [readyToProceedClaim, setReadyToProceedClaim] = useState(false)
  const [readyToValidate, setReadyToValidate] = useState(false)
  const [samData, setSamData] = useState<BusinessProfileType>({})

  const claimFormComplete = (responseData: any) => {
    const businessesArray = responseData
    const businessesData: { [key: string]: any } = {}
    businessesArray.forEach((business: CmbResponseType) => {
      businessesData[business.uei] = business
    })

    setSamData(businessesData)
    setReadyToValidate(true)
  }

  const proceedToClaimBusiness = () => {
    setReadyToProceedClaim(true)
  }

  return (
    <div>
      {readyToProceedClaim ? (
        <div className={Styles.mb_default}>
          {readyToValidate ? (
            <ValidateBusinessForm samData={samData} />
          ) : (
            <ClaimBusinessForm claimFormComplete={claimFormComplete} />
          )}
        </div>
      ) : (
        <ClaimBusinessLanding proceedToClaimBusiness={proceedToClaimBusiness} />
      )}
    </div>
  )
}
