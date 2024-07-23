'use client' // Temp until BE
import React, { useEffect, useState } from 'react'
import UserDetailForm from './fragments/UserDetailForm'
import { userProfileData } from './utils/data'
import { API_ROUTE } from '@/app/constants/routes'

interface userDetailProps {
  userId: string
}

export default function UserDetails({ userId }: userDetailProps): JSX.Element {
  const [userData, setUserData] = useState({})

  const fetchUserData = async () => {
    try {
      const url = API_ROUTE + `/user/?userId=${parseInt(userId)}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      response.ok ? setUserData(response.json()) : setUserData(userProfileData)
    } catch (error) {
      setUserData(userProfileData)
    }
  }

  useEffect(() => {
    fetchUserData()
  })

  return <UserDetailForm userProfileData={userProfileData} />
}
