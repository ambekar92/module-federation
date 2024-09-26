import { applicationSteps } from '@/app/(entity)/application/utils/constants';
import { ADMIN_DASHBOARD, APPLICATION_STEP_ROUTE, DASHBOARD, ASSIGN_DELEGATE_PAGE, CLAIM_YOUR_BUSINESS, QUESTIONNAIRE_LIST_PAGE, REVIEWERS_DASHBOARD_PAGE, SELECT_INTENDED_PROGRAMS_PAGE, TASKS_DASHBOARD_PAGE, buildRoute } from '@/app/constants/url';
import { Role } from '../types/role';

export const capitalizeAndSplit = (text: string) => {
  if (text === 'service_disabled_veteran') {
    return 'Service-Disabled Veteran'
  }
  return text.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '').slice(0, 10) // Restrict to 10 digits
  const length = cleaned.length

  if (length < 4) {
    return cleaned
  } else if (length < 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
}

export const formatSSN = (ssn: string) => {
  if (!ssn) {return ssn}
  const cleaned = ssn.replace(/\D/g, '') // Remove all non-digits
  const length = cleaned.length

  if (length < 4) {
    return cleaned
  } else if (length < 6) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else if (length <= 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`
  }
}

export const filterText = (
  text: string,
  onlyNumbers: boolean = false,
): string => {
  if (onlyNumbers) {
    // Filter out everything but digits
    return text.replace(/\D/g, '')
  }
  // Filter out non-alphanumeric characters (as per the original function)
  return text.replace(/[^a-zA-Z0-9]/g, '')
}

export type CookieApplication = {
  id: number;
  progress: string;
  workflow_state: string;
};

export type CookieEntity = {
  id: number;
};

export function handleInternalRoles(lastPermissionSlug: Role): string {
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
}

export function handlePrimaryQualifyingOwner(sessionData: []): string {
  if(sessionData?.permissions[1].slug === Role.PRIMARY_QUALIFYING_OWNER) {
    if (sessionData.applications.length && sessionData.applications[0]['workflow_state'] !== 'submitted') {
      return DASHBOARD
    } else {
      return sessionData.applications.length ? DASHBOARD : sessionData.entities.length > 0 ? buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, { entity_id: sessionData.entities[0].entity_id }) : CLAIM_YOUR_BUSINESS
    }
  } else if (sessionData?.permissions[1].slug === Role.DELEGATE) {
    return sessionData.entities.length > 0 ? DASHBOARD : CLAIM_YOUR_BUSINESS
  }
  return CLAIM_YOUR_BUSINESS; // Default return statement
}

export function handleNonPrimaryRoles(sessionData: []): string {
  return sessionData?.applications.length ? DASHBOARD : CLAIM_YOUR_BUSINESS
}

function getEntityRedirect(entityData: CookieEntity[] | null): string {
  if (entityData?.length) {
    const lastEntity = entityData[entityData.length - 1];
    return buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, { entity_id: lastEntity.id });
  }
  return CLAIM_YOUR_BUSINESS;
}

export function getApplicationRedirect(application: CookieApplication): string {
  if (application.workflow_state === 'submitted' || application.workflow_state === 'under_review') {
    return DASHBOARD;
  }

  const progressToStepMap: Record<string, string> = {
    'Contributor Invitation': applicationSteps.contributorInvitation.link,
    'Control & Operations': applicationSteps.controlAndOwnership.link,
    'Document Upload': applicationSteps.documentUpload.link,
    'Eligible Programs': applicationSteps.eligiblePrograms.link,
    'Ownership': applicationSteps.ownership.link,
    'Sign Application': applicationSteps.sign.link,
    'Delegates': 'assign-a-delegate',
    'Questionnaires': 'questionnaire-list'
  };

  const stepLink = progressToStepMap[application.progress] || applicationSteps.ownership.link;

  if (application.progress === 'Questionnaires') {
    return buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: application.id });
  }

  if (application.progress === 'Delegates') {
    return buildRoute(ASSIGN_DELEGATE_PAGE, { applicationId: application.id });
  }

  return buildRoute(APPLICATION_STEP_ROUTE, {
    applicationId: application.id,
    stepLink: stepLink
  });
}
