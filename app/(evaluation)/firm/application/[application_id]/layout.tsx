/* eslint-disable react-hooks/rules-of-hooks */
// Todo need to find a better way not to include useApplicationData everywhere to check view permission
'use client';

import RightPanel from '@/app/(evaluation)/components/RightPanel'
import LeftPanel from '@/app/(evaluation)/components/left-panel/LeftPanel';
import { useLeftItems } from '@/app/(evaluation)/components/left-panel/useLeftItems';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useSessionUCMS } from '@/app/lib/auth';
import { useParams } from 'next/navigation';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { Provider } from 'react-redux';
import evaluationStore from '@/app/(evaluation)/redux/evaluationStore';

const routesWithoutRightNav = ['business-summary', 'documents', 'analysis', 'messages', 'audit', 'task-timers', 'done', 'evaluation', 'review', 'notes', 'analyst-questionnaire']
const routesWithoutLeftNav = ['done'];

const layout = ({ children }: PropsWithChildren) => {
  const params = useParams<{application_id: string}>();
  // TODO: Make application state be validated and shared in using redux
  const { applicationData, mutate } = useApplicationData(ApplicationFilterType.id, params.application_id)
  const sessionData = useSessionUCMS()
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const pathName = usePathname();
  const hideRightPanel = routesWithoutRightNav.some(segment => pathName.indexOf(segment) !== -1) || pathName.includes('analyst-questionnaire');
  const hideLeftPanel = routesWithoutLeftNav.some(segment => pathName.indexOf(segment) !== -1);
  const {isLoading: isNavItemsLoading, navItems, error} = useLeftItems();

  return (
    <Provider store={evaluationStore}>
      <div className="grid-row">
        {!hideLeftPanel && <div className="grid-col-2 bg-white">
          <LeftPanel
            isNavItemsLoading={isNavItemsLoading}
            navItems={navItems}
            error={error}
          />
        </div>}
        <div className={`${hideRightPanel ? 'grid-col-9' : 'grid-col-7'} ${hideLeftPanel && hideRightPanel && 'grid-col-12'} bg-gray-5 padding-2`}>
          {children}
        </div>
        {(
          (userRole === 'screener' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'screening' && applicationData?.process.data?.review_start === true && !hideRightPanel) ||
        (userRole === 'analyst' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'analyst' && applicationData?.process.data?.review_start === true && !hideRightPanel) ||
        (userRole === 'reviewer' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'reviewer' && !hideRightPanel))
       && (
         <div className="grid-col-3 bg-white">
           <RightPanel
             isNavItemsLoading={isNavItemsLoading}
             navItems={navItems}
             error={error}
           />
         </div>)}
      </div>
    </Provider>
  )
}

export default layout
