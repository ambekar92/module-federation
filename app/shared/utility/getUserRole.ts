import { Role } from '../types/role';

export const getUserRole = (permissions: any[]): 'reviewer' | 'analyst' | 'screener' | 'approver' | 'ogc' | 'oss' | 'external' | 'default' => {
  const externalRoles = [
    Role.EXTERNAL,
    Role.CONTRIBUTOR,
    Role.DELEGATE,
    Role.SPOUSE,
    Role.PRIMARY_QUALIFYING_OWNER,
    Role.QUALIFYING_OWNER,
    Role.OTHER_INDIVIDUALS,
    Role.NON_QUALIFYING_OWNER,
  ]

  const approverRoles = [
    Role.APPROVER,
    Role.APPROVER_8a_aabd,
    Role.APPROVER_DELEGATE,
  ];

  const reviewerRoles = [
    Role.REVIEWER,
    Role.REVIEWER_HIGH_TIER,
    Role.REVIEWER_LOW_TIER,
    Role.REVIEWER_HIGH,
    Role.REVIEWER_LOW,
  ];

  const analystRoles = [
    Role.ANALYST,
    Role.ANALYST_HIGH_TIER,
    Role.ANALYST_LOW_TIER,
    Role.ANALYST_HIGH,
    Role.ANALYST_LOW,
  ];

  const ogcRoles = [
    Role.ANALYST_CONTRIBUTOR_OGC,
  ]

  const ossRoles = [
    Role.ANALYST_CONTRIBUTOR_OSS,
  ]

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
  } else if (permissions.some(permission => approverRoles.includes(permission.slug))) {
    return 'approver'
  } else if (permissions.some(permission => ogcRoles.includes(permission.slug))) {
    return 'ogc'
  } else if (permissions.some(permission => ossRoles.includes(permission.slug))) {
    return 'oss'
  } else if (permissions.some(permission => externalRoles.includes(permission.slug))) {
    return 'external';
  } else {
    return 'default';
  }
};
