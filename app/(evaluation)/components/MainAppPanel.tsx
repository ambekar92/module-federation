import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { FIRM_EVALUATIONS_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'
import ReturnToFirmPanel from './returnToFirm/ReturnToFirmPanel'

function MainAppPanel() {
  const { application_id: application_id } = useParams()
  const handlePostRequest = async () => {
    try {
      const postData = {
        application_id: parseInt(application_id),
      }

      await fetcherPOST(`${FIRM_EVALUATIONS_ROUTE}`, postData)
    } catch (error: any) {
      console.error('Network Error: ', error)
      return
    }
  }
  return (
    <>
      <div className="grid-container">
        <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
          <div className="usa-card__container">
            <div className="usa-card__header">
              <h3 className="usa-card__heading">
                Welcome to this Application Review
              </h3>
            </div>
            <div className="margin-top-1">
              <div className="usa-card__body">
                <p>
                  Smiley was monstrous proud of his frog, and well he might be,
                  for fellers that had <br /> traveled and been everywheres, all
                  said he laid over any frog that ever they see.
                </p>
              </div>
            </div>
            <div className="margin-top-7">
              <div className="usa-card__footer">
                <a href="#" className="usa-button" onClick={handlePostRequest}>
                  Start Review
                </a>
              </div>
            </div>
          </div>
        </li>
      </div>

      <ReturnToFirmPanel />
    </>
  )
}

export default MainAppPanel
