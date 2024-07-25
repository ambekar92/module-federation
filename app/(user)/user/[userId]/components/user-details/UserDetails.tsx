'use client' // Temp until BE
import React, { useEffect, useState } from 'react'
import UserDetailForm from './fragments/UserDetailForm'
import { userProfileData } from './utils/data'
import { API_ROUTE } from '@/app/constants/routes'
import useSWR from 'swr'
import fetcher from '@/app/services/fetcher'

interface userDetailProps {
  userId: string
}

export default function UserDetails({ userId }: userDetailProps): JSX.Element {
  const [userData, setUserData] = useState({})

  const url = API_ROUTE + `/users/${parseInt(userId)}`
  const { data: responseData, error: responseError } = useSWR(
    () => url,
    fetcher,
  )

  useEffect(() => {
    if (responseData) {
      setUserData(responseData)
    }
    if (responseError) {
      console.log('responseError = ', responseError)
    }
  }, [responseData, responseError])

  return <UserDetailForm userProfileData={userData} />
}
