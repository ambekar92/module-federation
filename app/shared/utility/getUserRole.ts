import { Role } from '../types/role';

export const getUserRole = (permissions: any[]): 'reviewer' | 'analyst' | 'screener' | 'default' => {
  const reviewerRoles = [
    Role.REVIEWER,
    Role.REVIEWER_HIGH_TIER,
    Role.REVIEWER_LOW_TIER,
    Role.REVIEWER_HIGH,
    Role.REVIEWER_LOW,
    Role.APPROVER,
    Role.APPROVER_8a_aabd,
    Role.APPROVER_AABD,
    Role.APPROVER_DELEGATE
  ];

  const analystRoles = [
    Role.ANALYST,
    Role.ANALYST_HIGH_TIER,
    Role.ANALYST_LOW_TIER,
    Role.ANALYST_HIGH,
    Role.ANALYST_LOW,
    Role.ANALYST_CONTRIBUTOR_OGC,
    Role.ANALYST_CONTRIBUTOR_OSS
  ];

  const screenerRoles = [
    Role.SCREENER,
    Role.SCREENER_COMMON_APP
  ];

  if (permissions.some(permission => reviewerRoles.includes(permission.slug))) {
    return 'reviewer';
  } else if (permissions.some(permission => analystRoles.includes(permission.slug))) {
    return 'analyst';
  } else if (permissions.some(permission => screenerRoles.includes(permission.slug))) {
    return 'screener';
  } else {
    return 'default';
  }
};
