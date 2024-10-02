import { CLAIM_YOUR_BUSINESS, DASHBOARD } from '@/app/constants/url';
import { Role } from '../types/role';
import { CookieApplication, CookieEntity, handleInternalRoles, handleNonPrimaryRoles, handlePrimaryQualifyingOwner } from './helpers';
import Cookies from 'js-cookie'
import { decrypt } from '@/app/shared/utility/encryption';

export function postLoginRedirectUrl(
  firstPermissionSlug: Role,
  lastPermissionSlug: Role,
  sessionData: []
): string {
  switch (firstPermissionSlug) {
    case Role.INTERNAL:
      return handleInternalRoles(lastPermissionSlug);
    case Role.EXTERNAL:
      switch (lastPermissionSlug) {
        case Role.QUALIFYING_OWNER:
        case Role.OTHER_INDIVIDUALS:
        case Role.NON_QUALIFYING_OWNER:
        case Role.SPOUSE:
          return handleNonPrimaryRoles(sessionData);
        case Role.PRIMARY_QUALIFYING_OWNER:
        case Role.DELEGATE:
          return handlePrimaryQualifyingOwner(sessionData);
        case Role.CONTRIBUTOR:
          return DASHBOARD;
        case Role.EXTERNAL:
          return CLAIM_YOUR_BUSINESS;
        default:
          return '/';
      }
    case Role.PRIMARY_QUALIFYING_OWNER:
      return CLAIM_YOUR_BUSINESS;
    case Role.CONTRIBUTOR:
      return DASHBOARD;
    default:
      return '/';
  }
}
