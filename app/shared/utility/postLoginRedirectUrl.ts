import { CLAIM_YOUR_BUSINESS, DASHBOARD } from '@/app/constants/url';
import { Role } from '../types/role';
import { CookieApplication, CookieEntity, handleInternalRoles, handleNonPrimaryRoles, handlePrimaryQualifyingOwner } from './helpers';
import Cookies from 'js-cookie'
import { decrypt } from '@/app/shared/utility/encryption';

export function postLoginRedirectUrl(
  firstPermissionSlug: Role,
  lastPermissionSlug: Role,
): string {
  const applicationDataString = decrypt(Cookies.get('applicationData'));
      	const entityDataString = decrypt(Cookies.get('entityData'));
  const applicationData: CookieApplication[] | null = applicationDataString
    ? JSON.parse(applicationDataString)
    : null;
  const entityData: CookieEntity[] | null = entityDataString
    ? JSON.parse(entityDataString)
    : null;

  switch (firstPermissionSlug) {
    case Role.INTERNAL:
      return handleInternalRoles(lastPermissionSlug);
    case Role.EXTERNAL:
      switch (lastPermissionSlug) {
        case Role.QUALIFYING_OWNER:
        case Role.OTHER_INDIVIDUALS:
        case Role.NON_QUALIFYING_OWNER:
        case Role.SPOUSE:
          return handleNonPrimaryRoles(applicationData);
        case Role.PRIMARY_QUALIFYING_OWNER:
        case Role.DELEGATE:
          return handlePrimaryQualifyingOwner(applicationData, entityData);
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
