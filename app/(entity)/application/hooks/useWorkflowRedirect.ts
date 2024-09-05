import { APPLICATION_VIEW_PAGE, buildRoute, DASHBOARD } from '@/app/constants/url';
import { useEffect } from 'react';

interface UseWorkflowRedirectProps {
  applicationData?: {
    workflow_state?: string;
  } | null;
  applicationId?: number;
  hasDelegateRole?: boolean;
}

/**
   * Hook to redirect to the correct location based on the application's workflow state and if the user has the delegate role
   *
   * @param {UseWorkflowRedirectProps} props - properties for the hook
   * @param {UseWorkflowRedirectProps.applicationData} applicationData - application data
   * @param {UseWorkflowRedirectProps.applicationId} applicationId - id of the application
   * @param {UseWorkflowRedirectProps.hasDelegateRole} hasDelegateRole - if the user has the delegate role
   *
   * if the user has the delegate role, redirect to the dashboard
   * if the application is not in draft or returned_for_firm state, redirect to the application view page
*/

export const useWorkflowRedirect = ({
  applicationData,
  applicationId,
  hasDelegateRole
}: UseWorkflowRedirectProps) => {

  useEffect(() => {
    if (hasDelegateRole) {
      window.location.href = (DASHBOARD);
    }
    if (
      applicationData &&
      applicationData.workflow_state !== 'draft' &&
      applicationData.workflow_state !== 'returned_for_firm' &&
      !hasDelegateRole
    ) {
      window.location.href = (buildRoute(APPLICATION_VIEW_PAGE, { applicationId: applicationId }));
    }
  }, [applicationData, applicationId, hasDelegateRole]);
};
