'use client'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'
import SupervisorCtx from './supervisorContext'
import { Show } from '@/app/shared/components/Show'

const Welcome = () => {
    const supervisor = useContext(SupervisorCtx)
    const session = useSession();
  return (
    <div>
        <Show>
            <Show.When isTrue={supervisor?.isSupervisor}>
                <strong data-testid="reviewer-dashboard">Reviewer Dashboard</strong>
            </Show.When>
            <Show.Otherwise>
                <strong data-testid="user-dashboard">User Dashboard</strong>
            </Show.Otherwise>
        </Show>
        <h1>Welcome, {session.data?.user?.name}</h1>
    </div>
  )
}

export default Welcome