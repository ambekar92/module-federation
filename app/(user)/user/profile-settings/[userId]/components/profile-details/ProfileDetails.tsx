'use client' // Temp until BE
import React, { useEffect, useState } from 'react'
import ProfileDetailForm from './fragments/ProfileDetailForm'

//API
import Service from '../../../../../../services/fetcher'

interface ProfileDetailProps {
  userId: string
}

export default function ProfileDetails({ userId }: ProfileDetailProps): JSX.Element {
  const [userData, setUserData] = useState({})

  const fetchUserData = async () => {
    try {
      const response = await Service.getUserProfileInfo(userId);
      setUserData(response.data)
    } catch (error) {
      setUserData('')
    }
  }

  useEffect(() => {
    fetchUserData()
  })

  return <ProfileDetailForm />
}
