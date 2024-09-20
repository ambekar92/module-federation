import { Role } from '@/app/shared/types/role';
import { ReassignType } from './types';
import { SessionType } from '@/app/tarmac/types';

export const permissionsMap = {
  [ReassignType.REASSIGN_SCREENER]: [Role.SCREENER, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER, Role.SCREENER_COMMON_APP],
  [ReassignType.REASSIGN_ANALYST]: [Role.ANALYST_HIGH_TIER, Role.ANALYST_LOW_TIER, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER],
  [ReassignType.REASSIGN_APPROVER]: [Role.APPROVER_8a_aabd],
  [ReassignType.REASSIGN_EXPERT]: [Role.ANALYST_CONTRIBUTOR_OGC, Role.ANALYST_CONTRIBUTOR_OSS],
}

export const titleMap = {
  [ReassignType.REASSIGN_SCREENER]: 'Reassign Application',
  [ReassignType.REASSIGN_ANALYST]: 'Reassign User',
  [ReassignType.REASSIGN_APPROVER]: 'Reassign Approver',
  [ReassignType.REASSIGN_EXPERT]: 'Reassign Expert',
}

export const userRolesOptionsMap = (reassignType: ReassignType | null, currentUserSession: SessionType) => {
  // reassign expert requirement for drop down user options is: Combo dropbox with all people with the same role as the User
  const isAnalystContributorOGC = currentUserSession.data.permissions.some(permission => permission.slug === Role.ANALYST_CONTRIBUTOR_OGC);
  switch(reassignType) {
    case ReassignType.REASSIGN_SCREENER:
      return Role.SCREENER_COMMON_APP;
    case ReassignType.REASSIGN_ANALYST:
      return Role.ANALYST_LOW_TIER;
    case ReassignType.REASSIGN_APPROVER:
      return Role.APPROVER_8a_aabd;
    case ReassignType.REASSIGN_EXPERT:

      if (isAnalystContributorOGC) {
        return Role.ANALYST_CONTRIBUTOR_OGC;
      } else {
        return Role.ANALYST_CONTRIBUTOR_OSS;
      }
  }

}

export const subjectSuffixMap = {
  [ReassignType.REASSIGN_SCREENER]: '_Screening_reassignment',
  [ReassignType.REASSIGN_ANALYST]: '_Analyst_reassignment',
  [ReassignType.REASSIGN_APPROVER]: '_Approver_reassignment',
  [ReassignType.REASSIGN_EXPERT]: '_Expert_reassignment',
}
