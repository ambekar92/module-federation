import { useCurrentApplication } from '../../firm/useApplicationData';
import { NavItem } from '../../types/types';
import LeftPanelHeader from './LeftPanelHeader';
import NavigationItems from './NavigationItems';

interface LeftPanelProps {
  isNavItemsLoading?: boolean;
  navItems?: NavItem[];
  error?: any;
}

function LeftPanel({ isNavItemsLoading, navItems, error }: LeftPanelProps) {
  const { applicationData } = useCurrentApplication();

  if (!applicationData) {
    return null;
  }

  return (
    <div className='bg-white padding-top-2 minh-screen'>
      <LeftPanelHeader applicationData={applicationData} />
      <div className="grid-container padding-x-1">
        <NavigationItems
          navItems={navItems ?? []}
          isNavItemsLoading={isNavItemsLoading ?? false}
          error={error}
          applicationData={applicationData}
        />
      </div>
    </div>
  );
}

export default LeftPanel;
