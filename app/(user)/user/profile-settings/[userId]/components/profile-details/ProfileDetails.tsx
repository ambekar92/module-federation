'use client' // Temp until BE
import React, { useEffect, useState, useRef } from 'react'
import ProfileDetailForm from './fragments/ProfileDetailForm'

//API
import Service from '../../../../../../services/fetcher-legacy'

interface ProfileDetailProps {
  userId: string
}

export default function ProfileDetails({
  userId,
}: ProfileDetailProps): JSX.Element {
  const dataFetchedRef = useRef(false)
  const [userData, setUserData] = useState({})

  const fetchUserData = async () => {
    try {
      const response = await Service.getUserProfileInfo(userId)
      setUserData(response)
    } catch (error) {
      setUserData('')
    }
  }

  useEffect(() => {
    if (dataFetchedRef.current) {
      return
    }
    dataFetchedRef.current = true
    fetchUserData()
  },[])

  return <ProfileDetailForm userProfileData={userData}/>
}
