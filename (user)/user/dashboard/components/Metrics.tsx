'use client'
import { Show } from '@/app/shared/components/Show';
import { useContext } from 'react';
import OpenAssignments from './OpenAssignments';
import Productivity from './Productivity';
import Reporting from './Reporting';
import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';

const Metrics = () => {
     // temporary function to replace isRole from @/middleware. will swich back to the one from @/middleware once determined which user role corresponds to analyst
     function isRole(permissions: any, role: any) {
        return false;
    }

    const session = useSessionUCMS();

    return (<>
        <Show>
            {/* show if user is not supervisor */}
            <Show.When isTrue={isRole(session.data?.permissions, Role.EXTERNAL)}>
                <OpenAssignments />
            </Show.When>
        </Show>
        
            
        <Productivity />
           
        
    </>

    )
}

export default Metrics