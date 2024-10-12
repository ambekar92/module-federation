import { buildRoute, DASHBOARD, DELEGATE_DASHBOARD_PAGE, DOCUMENT_PAGE, FIRM_EVALUATION_PAGE, MESSAGE_PAGE, REVIEWERS_DASHBOARD_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { checkUserPermissionSlug } from '@/app/shared/utility/getApplicationRole';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { PrimaryNav } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { isInApplicationFlow } from '../utils';
import { useInbox } from '@/app/services/queries/communication-service/useInbox';

const AuthenticatedNavitems = ({toggleMobileNav, mobileExpanded}: {toggleMobileNav: any, mobileExpanded: boolean}) => {
  const session = useSessionUCMS()
  const userRole = getUserRole(session?.data?.permissions || []);
  const params = useParams<{application_id: string}>();
  const {data: messagesData, isLoading: messagesLoading} = useInbox()

  let dashboardLink;
  if(checkUserPermissionSlug(session.data, 'delegate')) {
    dashboardLink = DELEGATE_DASHBOARD_PAGE
  } else {
    dashboardLink = DASHBOARD
  }

  const navitems = [
    ...(isInApplicationFlow() ? [
      <React.Fragment key="auth_1">
        <Link className="usa-nav_link" href={buildRoute(FIRM_EVALUATION_PAGE, { application_id: params.application_id })}>
          <span>Home</span>
        </Link>
      </React.Fragment>
    ] : []),
    ...(userRole === 'external' ? [
      <React.Fragment key="auth_4">
        <Link
          className="usa-nav_link"
          href={dashboardLink}>
          <span>Dashboard</span>
        </Link>
      </React.Fragment>
    ] : []),
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={MESSAGE_PAGE}>
        {!messagesLoading && messagesData
				&& Array.isArray(messagesData)
				&& messagesData.results.length > 0
				&& messagesData.results.some(message => message.total_unread > 0) && (
          <span style={{ position: 'relative', top: '2px', right: '5px' }}>
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#E41D3D',
              }}
            ></div>
          </span>
        )}
        <span>Messages</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={DOCUMENT_PAGE}>
        <span>Documents</span>
      </Link>
    </React.Fragment>,
    ...(userRole === 'analyst' || userRole === 'approver' ? [
      <React.Fragment key="auth_4">
        <Link
          className="usa-nav_link"
          href={REVIEWERS_DASHBOARD_PAGE}>
          <span>Team Tasks</span>
        </Link>
      </React.Fragment>
    ] : [])
  ];

  return (
    <PrimaryNav
      aria-label="Primary navigation"
      items={navitems}
      mobileExpanded={mobileExpanded}
      onToggleMobileNav={toggleMobileNav}
    />
  )
}

export default AuthenticatedNavitems
