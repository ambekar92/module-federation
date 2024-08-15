'use client'

import { Button } from '@trussworks/react-uswds'
import { signIn } from 'next-auth/react'
import React from 'react'

/**
 * 
 * @deprecated login action now happens through LoginMenu.tsx component
 */
const LoginButton = ({
  action,
}: {
  action: 'Sign In' | 'Create New Account'
}) => {
  return (
    <Button
      type="button"
      onClick={() => {
        localStorage.clear()
        signIn('okta')
      }}
    >
      {action}
    </Button>
  )
}

export default LoginButton
