'use client'
import { CmbResponseType } from '@/app/services/cmb-fetcher'
import { useState } from 'react'
import Styles from './ClaimMyBusiness.module.scss'
import ClaimBusinessForm from './forms/CMBForm'
import ValidateBusinessForm from './forms/ValidateBusinessForm'
import ClaimBusinessLanding from './layout/CMBLanding'

export default function ClaimBusiness(): JSX.Element {
  const [readyToProceedClaim, setReadyToProceedClaim] = useState(false)
  const [readyToValidate, setReadyToValidate] = useState(false)
  const [samData, setSamData] = useState<CmbResponseType>()

  const claimFormComplete = (responseData: CmbResponseType ) => {
    setSamData(responseData)
    setReadyToValidate(true)
  }

  const proceedToClaimBusiness = () => {
    setReadyToProceedClaim(true)
  }

  return (
    <div>
      {readyToProceedClaim ? (
        <div className={Styles.mb_default}>
          {readyToValidate && samData ? (
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
