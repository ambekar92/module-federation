import { Card, Collection, CollectionItem } from '@trussworks/react-uswds'
import React, { useContext, useEffect, useState } from 'react';
import { getReports } from '../mockData';
import SupervisorCtx from './supervisorContext';
import { Show } from '@/app/shared/components/Show';

const Reporting = () => {
    const [list, setList] = useState<any[]>([]);
    const supervisor = useContext(SupervisorCtx);
    useEffect(() => {
        setList(getReports())
    }, [])
    return (
        <Show>
            <Show.When isTrue={supervisor?.isSupervisor}>
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