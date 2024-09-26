import { buildRoute, DASHBOARD, DOCUMENT_PAGE, FIRM_EVALUATION_PAGE, GET_HELP_ROUTE, MESSAGE_PAGE, NOTIFICATIONS_PAGE, REVIEWERS_DASHBOARD_PAGE, TASKS_DASHBOARD_PAGE, USER_PROFILE_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { logout } from '@/app/lib/logout';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { PrimaryNav } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { isInApplicationFlow } from '../utils';

const MobileNavitems = ({toggleMobileNav, mobileExpanded}: {toggleMobileNav: any, mobileExpanded: boolean}) => {
  const session = useSessionUCMS()
  const userRole = getUserRole(session?.data?.permissions || []);
  const params = useParams<{application_id: string}>();

  const navitems = [
    ...(userRole === 'analyst' || userRole === 'approver' || userRole === 'reviewer' || userRole === 'screener' ? [
      <React.Fragment key="auth_3">
        <Link className="usa-nav_link" href={TASKS_DASHBOARD_PAGE}>
          <span>Home</span>
        </Link>
      </React.Fragment>
    ] : []),
    ...(userRole === 'external' ? [
      <React.Fragment key="auth_4">
        <Link
          className="usa-nav_link"
          href={DASHBOARD}>
          <span>Dashboard</span>
        </Link>
      </React.Fragment>
    ] : []),
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={MESSAGE_PAGE}>
        <span>Messages</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={DOCUMENT_PAGE}>
        <span>Documents</span>
      </Link>
    </React.Fragment>,
    ...(userRole === 'reviewer' || userRole === 'approver' ? [
      <React.Fragment key="auth_4">
        <Link
          className="usa-nav_link"
          href={REVIEWERS_DASHBOARD_PAGE}>
          <span>Team Tasks</span>
        </Link>
      </React.Fragment>
    ] : []),
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={NOTIFICATIONS_PAGE}>
        <span>Notifications</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={GET_HELP_ROUTE}>
        <span>Get Help</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={USER_PROFILE_PAGE}>
        <span>Profile</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={''} onClick={() => logout()}>
        <span>Logout</span>
      </Link>
    </React.Fragment>,
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

export default MobileNavitems
