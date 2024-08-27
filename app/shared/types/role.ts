export enum Role {
  // Admin Roles
ADMIN = 'ucms_admin',

// [some type] Roles
EXTERNAL = 'external_user',
INTERNAL = 'internal_user',
CONTRIBUTOR = 'contributor',
DELEGATE = 'delegate',
SPOUSE = 'spouse',
PRIMARY_QUALIFYING_OWNER = 'primary_qualifying_owner',
QUALIFYING_OWNER = 'qualifying_owner',
OTHER_INDIVIDUALS = 'other_individuals',
NON_QUALIFYING_OWNER = 'non_qualifying_owner',

// Screener Roles (RTB)
SCREENER = 'screener',
SCREENER_COMMON_APP = 'screener_common_app',

// Analyst Roles (RFI)
ANALYST = 'analyst',
ANALYST_HIGH_TIER = 'analyst_high_criteria',
ANALYST_LOW_TIER = 'analyst_low_criteria',
ANALYST_HIGH = 'analyst_high_tier',
ANALYST_LOW = 'analyst_low_tier',
ANALYST_CONTRIBUTOR_OGC = 'analyst_contributor_ogc',
ANALYST_CONTRIBUTOR_OSS = 'analyst_contributor_oss',

// Reviewer Roles (RFI)
REVIEWER = 'supervisor',
REVIEWER_HIGH_TIER = 'supervisor_high_criteria',
REVIEWER_LOW_TIER = 'supervisor_low_criteria',
REVIEWER_HIGH = 'reviewer_high_tier',
REVIEWER_LOW = 'reviewer_low_tier',

// Approver Roles
APPROVER = 'approver',
APPROVER_8a_aabd = 'approver_8a_aabd',
APPROVER_DELEGATE = 'approver_8a_delegate',
}
