'use client';
import RightPanel from '@/app/(evaluation)/components/RightPanel';
import LeftPanel from '@/app/(evaluation)/components/left-panel/LeftPanel';
import { useLeftItems } from '@/app/(evaluation)/components/left-panel/useLeftItems';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useMemo } from 'react';
import { Provider } from 'react-redux';
import firmStore from '../../store/store';
import { useCurrentApplication } from '../../useApplicationData';
import Spinner from '@/app/shared/components/spinner/Spinner';

const routesWithoutRightNav = ['business-summary', 'documents', 'analysis', 'messages', 'audit', 'task-timers', 'done', 'evaluation', 'review', 'notes', 'analyst-questionnaire'];
const routesWithoutLeftNav = ['done'];

const Layout = ({ children }: PropsWithChildren) => {
  const { applicationData, isLoading } = useCurrentApplication();
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const pathName = usePathname();

  const { hideRightPanel, hideLeftPanel } = useMemo(() => ({
    hideRightPanel: routesWithoutRightNav.some(segment => pathName.indexOf(segment) !== -1) || pathName.includes('analyst-questionnaire'),
    hideLeftPanel: routesWithoutLeftNav.some(segment => pathName.indexOf(segment) !== -1)
  }), [pathName]);

  const {isLoading: isNavItemsLoading, navItems, error} = useLeftItems();

  if(isLoading) {
    return <Spinner center />
  }

  const showRightPanel = (
    (userRole === 'screener' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'screening' && applicationData?.process.data?.review_start === true && !hideRightPanel) ||
    (userRole === 'analyst' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'analyst' && applicationData?.process.data?.review_start === true && !hideRightPanel) ||
    (userRole === 'reviewer' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'reviewer' && !hideRightPanel)
  );

  return (
    <Provider store={firmStore}>
      <div className="grid-row" style={{maxWidth: '100vw'}}>
        {!hideLeftPanel && (
          <div className="grid-col-2 bg-white">
            <LeftPanel
              isNavItemsLoading={isNavItemsLoading}
              navItems={navItems}
              error={error}
            />
          </div>
        )}
        <div className={`${hideRightPanel ? 'grid-col-9' : 'grid-col-7'} ${hideLeftPanel && hideRightPanel && 'grid-col-12'} bg-gray-5 padding-2`}>
          {children}
        </div>
        {showRightPanel && (
          <div className="grid-col-3 bg-white">
            <RightPanel
              navItems={navItems}
            />
          </div>
        )}
      </div>
    </Provider>
  );
};

export default Layout;
