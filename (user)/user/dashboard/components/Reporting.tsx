import { Card, Collection, CollectionItem } from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react';
import { getReports } from '../mockData';
import { Show } from '@/app/shared/components/Show';
import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';

const Reporting = () => {
    const [list, setList] = useState<any[]>([]);
     // temporary function to replace isRole from @/middleware. will swich back to the one from @/middleware once determined which user role corresponds to analyst
     function isRole(permissions: any, role: any) {
        return false;
    }
    const session = useSessionUCMS();
    useEffect(() => {
        setList(getReports())
    }, [])
    return (
        <Show>
            {/* show if user is supervisor */}
            <Show.When isTrue={!isRole(session.data?.permissions, Role.EXTERNAL)}>
                <h3>Reporting</h3>
                <Card gridLayout={{desktop: {col: 3}}}
                    containerProps={{
                        className: 'bg-base-lightest border-6'
                      }}

                >
                    <Collection color='base-lightest' style={{ paddingTop: 0 }} >
                        {list.map((l, idx) => <CollectionItem key={l.id}
                            style={{ border: 'none', marginTop: idx === 0 ? '0' : 'normal', paddingTop: idx === 0 ? '0' : 'normal' }}>
                            {l.name}
                        </CollectionItem>)}
                    </Collection>
                </Card>
            </Show.When>
        </Show>
    )
}

export default Reporting