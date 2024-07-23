'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { Show } from '@/app/shared/components/Show'
import { Role } from '@/app/shared/types/role'

const Welcome = () => {
    const session = useSessionUCMS();
    // temporary function to replace isRole from @/middleware. will swich back to the one from @/middleware once determined which user role corresponds to analyst
    function isRole(permissions: any, role: any) {
        return false;
    }
    
  return (
    <div>
        <Show>
            <Show.When isTrue={!isRole(session.data?.permissions, Role.EXTERNAL)}>
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