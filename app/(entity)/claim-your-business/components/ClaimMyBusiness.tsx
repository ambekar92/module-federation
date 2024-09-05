'use client'
import { useEffect, useState } from 'react'
import { CmbResponseType } from '../utils/types'
import Styles from './ClaimMyBusiness.module.scss'
import ClaimBusinessForm from './forms/CMBForm'
import ClaimBusinessLanding from './layout/CMBLanding'
import ValidateBusinessForm from './validation/ValidateBusinessForm'
import { useSessionUCMS } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import { buildRoute, SELECT_INTENDED_PROGRAMS_PAGE } from '@/app/constants/url'

export default function ClaimBusiness(): JSX.Element {
  const [readyToProceedClaim, setReadyToProceedClaim] = useState(false)
  const [readyToValidate, setReadyToValidate] = useState(false)
  const [samData, setSamData] = useState<CmbResponseType>()
  const { data: session, status } = useSessionUCMS();

  useEffect(() => {
    if (status === 'authenticated' && session?.entities?.length > 0) {
      const lastEntity = session.entities[session.entities.length - 1];
      if (lastEntity?.entity_id) {
        redirect(buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, { entity_id: lastEntity.entity_id }))
      }
    }
  }, [session, status])

  const claimFormComplete = (responseData: CmbResponseType) => {
    setSamData(responseData)
    setReadyToValidate(true)
  }

  const proceedToClaimBusiness = () => {
    setReadyToProceedClaim(true)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
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
