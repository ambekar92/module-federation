'use client'
import React, { useState } from 'react'
import { Grid, Button } from '@trussworks/react-uswds'
import InfoCard from './components/InfoCard'
import EditInfo from './components/EditEntityProfileInfo'
import SucessAlert from './components/SuccessAlerts'
import { IPerson } from './components/utils/constants'

const EntityProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isInformationSaved, setIsInformationSaved] = useState(false)
  const [entityProfile, setEntityProfile] = useState<IPerson[]>([])

  const handleEditProfile = (updatedProfile: IPerson) => {
    setEntityProfile([updatedProfile])
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }
  const handleInformationSaved = (saved: boolean) => {
    setIsInformationSaved(saved)
    setIsEditing(false)
  }

  return (
    <>
      <div style={{ fontSize: '40px', fontWeight: 700, paddingTop: '2rem' }}>
        Entity Profile
      </div>
      <hr className="margin-y-3 margin-bottom-0 width-full border-base-lightest" />
      <Grid row>
        <Grid className="flex-10">
          <div
            style={{ fontSize: '32px', fontWeight: 700, paddingTop: '1.5rem' }}
          >
            Info
          </div>
        </Grid>
        <Grid>
          <div style={{ paddingTop: '1.5rem' }}>
            <Button
              type="button"
              style={{ width: '6.5rem' }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </div>
        </Grid>
      </Grid>
      <div>
        {isInformationSaved && (
          <>
            <SucessAlert label="Your changes have been successfully saved." />
          </>
        )}
        {isEditing ? (
          <EditInfo
            onInformationSaved={handleInformationSaved}
            onEditProfile={handleEditProfile}
          />
        ) : (
          <InfoCard infoData={entityProfile} />
        )}
      </div>
    </>
  )
}
export default EntityProfile
