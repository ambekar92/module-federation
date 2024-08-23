import React from 'react';
import { useCurrentApplication } from '../../firm/useApplicationData';
import LeftPanelHeader from './LeftPanelHeader';
import NavigationItems from './NavigationItems';
import { NavItem } from '../../types/types';

interface LeftPanelProps {
  isNavItemsLoading: boolean;
  navItems: NavItem[];
  error: any;
}

function LeftPanel({ isNavItemsLoading, navItems, error }: LeftPanelProps) {
  const { applicationData } = useCurrentApplication();

  if (!applicationData) {
    return null;
  }

  return (
    <div className='bg-white padding-top-2'>
      <LeftPanelHeader applicationData={applicationData} />
      <div className="grid-container">
        <NavigationItems
          navItems={navItems}
          isNavItemsLoading={isNavItemsLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default LeftPanel;
