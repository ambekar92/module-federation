import React from 'react'
import ProfileDetails from './components/profile-details/ProfileDetails'

const UserProfile = ({ params: { userId } }: { params: { userId: string } }) => {
  return <ProfileDetails userId={userId} />
}

export default UserProfile
