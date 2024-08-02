/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import RightPanel from '@/app/(evaluation)/components/RightPanel'
import LeftPanel from '@/app/(evaluation)/components/left-panel/LeftPanel';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const routesWithoutRightNav = ['firm-summary', 'documents', 'analysis', 'messages', 'audit', 'task-timers', 'done', 'evaluation', 'review']
const routesWithoutLeftNav = ['done'];

const layout = ({children}: PropsWithChildren) => {
  const pathName = usePathname();
  const hideRightPanel = routesWithoutRightNav.some(segment => pathName.indexOf(segment) !== -1);
  const hideLeftPanel = routesWithoutLeftNav.some(segment => pathName.indexOf(segment) !== -1);

  return (
    <div className="grid-row">
      {!hideLeftPanel && <div className="grid-col-2 bg-white">
        <LeftPanel />
      </div>}
      <div className={`${hideRightPanel ? 'grid-col-9' : 'grid-col-7'} ${hideLeftPanel && hideRightPanel && 'grid-col-12'} bg-gray-5 padding-2`}>
        {children}
      </div>
      {!hideRightPanel && <div className="grid-col-3 bg-white">
        <RightPanel />
      </div>}
    </div>
  )
}

export default layout
