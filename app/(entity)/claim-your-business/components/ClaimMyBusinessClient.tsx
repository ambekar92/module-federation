'use client'

import { useState } from 'react'
import { CmbResponseType } from '../utils/types'
import Styles from './ClaimMyBusiness.module.scss'
import ClaimBusinessForm from './forms/CMBForm'
import ClaimBusinessLanding from './layout/CMBLanding'
import ValidateBusinessForm from './validation/ValidateBusinessForm'

export default function ClaimBusinessClient(): JSX.Element {
  const [readyToProceedClaim, setReadyToProceedClaim] = useState(false)
  const [readyToValidate, setReadyToValidate] = useState(false)
  const [samData, setSamData] = useState<CmbResponseType>()

  const claimFormComplete = (responseData: CmbResponseType) => {
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
