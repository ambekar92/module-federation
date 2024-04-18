'use client'

import { Button } from '@trussworks/react-uswds'
import { signIn } from 'next-auth/react'
import React from 'react'

const LoginButton = ({
  action,
}: {
  action: 'Sign In' | 'Create New Account'
}) => {
  return (
    <Button type="button" onClick={() => signIn()}>
      {action}
    </Button>
  )
}

export default LoginButton
