/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import RightPanel from '@/app/(evaluation)/components/RightPanel'
import LeftPanel from '@/app/(evaluation)/components/left-panel/LeftPanel';
import { useLeftItems } from '@/app/(evaluation)/components/left-panel/useLeftItems';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const routesWithoutRightNav = ['firm-summary', 'documents', 'analysis', 'messages', 'audit', 'task-timers', 'done', 'evaluation', 'review', 'notes', 'analyst-questionnaire']
const routesWithoutLeftNav = ['done'];

const layout = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();
  const hideRightPanel = routesWithoutRightNav.some(segment => pathName.indexOf(segment) !== -1) || pathName.includes('analyst-questionnaire');
  const hideLeftPanel = routesWithoutLeftNav.some(segment => pathName.indexOf(segment) !== -1);
  const {isLoading: isNavItemsLoading, navItems, error} = useLeftItems();

  return (
    <div className="grid-row">
      {!hideLeftPanel && <div className="grid-col-2">
        <LeftPanel
          isNavItemsLoading={isNavItemsLoading}
          navItems={navItems}
          error={error}
        />
      </div>}
      <div className={`${hideRightPanel ? 'grid-col-9' : 'grid-col-7'} ${hideLeftPanel && hideRightPanel && 'grid-col-12'} bg-gray-5 padding-2`}>
        {children}
      </div>
      {!hideRightPanel && <div className="grid-col-3 bg-white">
        <RightPanel
          isNavItemsLoading={isNavItemsLoading}
          navItems={navItems}
          error={error}
        />
      </div>}
    </div>
  )
}

export default layout
