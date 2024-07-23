'use client';
import RightPanel from '@/app/(evaluation)/components/RightPanel'
import LeftPanel from '@/app/(evaluation)/components/left-panel/LeftPanel';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const routesWithoutRightNav = ['firm-summary', 'documents', 'analysis', 'messages', 'audit', 'task-timers']

const layout = ({children}: PropsWithChildren) => {
  const pathName = usePathname();
  const hideRightPanel = routesWithoutRightNav.some(segment => pathName.indexOf(segment) !== -1);
  
  return (
    <div className="grid-row">
        <div className="grid-col-3 bg-white">
          <LeftPanel />
        </div>
        <div className={`${hideRightPanel ? 'grid-col-9' : 'grid-col-6'} bg-gray-5 padding-2`}>
          {children}
        </div>
        {!hideRightPanel && <div className="grid-col-3 bg-white">
          <RightPanel />
        </div>}
      </div>
  )
}

export default layout