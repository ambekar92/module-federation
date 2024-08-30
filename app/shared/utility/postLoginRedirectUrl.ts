import { ADMIN_DASHBOARD, CLAIM_YOUR_BUSINESS, DASHBOARD, REVIEWERS_DASHBOARD_PAGE, TASKS_DASHBOARD_PAGE } from '@/app/constants/url';
import { Application } from '@/app/services/types/application-service/Application';
import { Entity } from '../types/responses';
import { Role } from '../types/role';
import { handleNonPrimaryRoles, handlePrimaryQualifyingOwner } from './helpers';

export function postLoginRedirectUrl(
  firstPermissionSlug: Role, lastPermissionSlug: Role): string {

  switch (firstPermissionSlug) {
    case Role.INTERNAL:
      switch (lastPermissionSlug) {
        case Role.ADMIN:
          return ADMIN_DASHBOARD;
        case Role.ANALYST:
        case Role.ANALYST_HIGH_TIER:
        case Role.ANALYST_LOW_TIER:
        case Role.ANALYST_HIGH:
        case Role.ANALYST_LOW:
        case Role.ANALYST_CONTRIBUTOR_OGC:
        case Role.ANALYST_CONTRIBUTOR_OSS:
        case Role.REVIEWER:
        case Role.REVIEWER_HIGH_TIER:
        case Role.REVIEWER_LOW_TIER:
        case Role.REVIEWER_HIGH:
        case Role.REVIEWER_LOW:
          return REVIEWERS_DASHBOARD_PAGE;
        default:
          return TASKS_DASHBOARD_PAGE;
      }
    case Role.EXTERNAL:
      switch (lastPermissionSlug) {
        case Role.QUALIFYING_OWNER:
        case Role.OTHER_INDIVIDUALS:
        case Role.NON_QUALIFYING_OWNER:
        case Role.CONTRIBUTOR:
          return DASHBOARD;
        case Role.EXTERNAL:
        case Role.SPOUSE:
        case Role.PRIMARY_QUALIFYING_OWNER:
        case Role.DELEGATE:
          return CLAIM_YOUR_BUSINESS;
        default:
          return '/';
      }
    case Role.PRIMARY_QUALIFYING_OWNER:
      // Todo
      // Need to validate application progress for redirect
      return CLAIM_YOUR_BUSINESS;
    case Role.CONTRIBUTOR:
      return DASHBOARD;
    default:
      return '/';
  }
}
