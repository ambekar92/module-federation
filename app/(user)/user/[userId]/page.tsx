import React from 'react'
import UserDetails from './components/user-details/UserDetails'
// import UserProfileForm from './components/UserProfileForm/UserProfileForm'

const User = ({ params: { userId } }: { params: { userId: string } }) => {
  // return <UserProfileForm userId={userId} />
  return <UserDetails userId={userId} />
}

export default User
