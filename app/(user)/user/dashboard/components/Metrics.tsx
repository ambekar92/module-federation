'use client'
import { Show } from '@/app/shared/components/Show';
import { useContext } from 'react';
import OpenAssignments from './OpenAssignments';
import Productivity from './Productivity';
import Reporting from './Reporting';
import SupervisorCtx from './supervisorContext';

const Metrics = () => {
    const supervisor = useContext(SupervisorCtx);

    return (<>
        <Show>
            <Show.When isTrue={!supervisor?.isSupervisor}>
                <OpenAssignments />
            </Show.When>
        </Show>
        <Show>
            <Show.When isTrue={true}>
                <Productivity isSupervisor={supervisor?.isSupervisor ?? false} />
            </Show.When>
        </Show>
        
    </>

    )
}

export default Metrics