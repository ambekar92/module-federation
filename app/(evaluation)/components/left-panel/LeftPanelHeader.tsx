import React, { useMemo } from 'react';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import ActionsDropdown from './ActionsDropdown';

interface LeftPanelHeaderProps {
  applicationData: any;
}

const LeftPanelHeader: React.FC<LeftPanelHeaderProps> = React.memo(({ applicationData }) => {
  const sessionData = useSessionUCMS();
  const userRole = useMemo(() => getUserRole(sessionData?.data?.permissions || []), [sessionData?.data?.permissions]);

  const renderProgram = (obj: Record<string, any> | undefined) => {
    return (
      <ul className="usa-list usa-list--unstyled">
        {obj && Object.entries(obj).map(([key, value]) => (
          <li key={key} className="display-inline">
            {value.programs.name === 'eight_a' ?
              '8(a)'
              : value.programs.name === 'hubzone' ?
                'HUBZone'
                : value.programs.name.toUpperCase().replace(/_/g, '')
            } {' '}
          </li>
        ))}
      </ul>
    );
  };

  const shouldShowActionsDropdown = useMemo(() => {
    if (!applicationData) {return false;}
    const { process, workflow_state } = applicationData;
    // return true
    return (
      (userRole === 'analyst' && process?.data.step === 'analyst' && process.data?.review_start === true) ||
      (userRole === 'screener' && process?.data.step === 'screening' && workflow_state === 'under_review' && process.data?.review_start === true) ||
      (userRole === 'reviewer' && process?.data.step === 'reviewer' && workflow_state === 'under_review') ||
      (userRole === 'approver' && process?.data.step === 'approver' && workflow_state === 'under_review') ||
      (userRole === 'ogc' && process?.data.step === 'ogc' && workflow_state === 'under_review')
    );
  }, [applicationData, userRole]);

  return (
    <div className="grid-container margin-top-2">
      <h2 className="margin-top-0">{applicationData?.sam_entity?.legal_business_name ?? 'N/A'}</h2>
      <div className="margin-top-1">
        <span className="text-bold margin-right-1">UEI</span>
        <span>{applicationData?.sam_entity?.uei ?? 'N/A'}</span>
      </div>
      <div className="margin-top-1">
        <p className="text-bold margin-right-1">Certification</p>
        {renderProgram(applicationData?.program_application)}
      </div>
      {shouldShowActionsDropdown && <ActionsDropdown />}
    </div>
  );
});

LeftPanelHeader.displayName = 'NavigationItems';

export default LeftPanelHeader;
