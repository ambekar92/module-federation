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

import { APPLICATION_STEP_ROUTE, APPLICATION_VIEW_PAGE, buildRoute, CLAIM_YOUR_BUSINESS, QUESTIONNAIRE_LIST_PAGE, SELECT_INTENDED_PROGRAMS_PAGE } from '@/app/constants/url'
import { Question } from '../types/questionnaireTypes';
import { Application } from '@/app/services/types/application-service/Application'
import { applicationSteps } from '@/app/(entity)/application/utils/constants'
import { Entity } from '../types/responses'

export function areAllQuestionsAnswered(questions: Question[]): boolean {
  return questions.every(question => question.answer.value !== null);
}

export function getApplicationRedirect(application: Application): string {
  if (application.workflow_state === 'submitted' || application.workflow_state === 'under_review') {
    return buildRoute(APPLICATION_VIEW_PAGE, { applicationId: application.id });
  }

  const progressToStepMap: Record<string, string> = {
    'Contributor Invitation': applicationSteps.contributorInvitation.link,
    'Control & Operations': applicationSteps.controlAndOwnership.link,
    'Document Upload': applicationSteps.documentUpload.link,
    'Eligible Programs': applicationSteps.eligiblePrograms.link,
    'Ownership': applicationSteps.ownership.link,
    'Sign Application': applicationSteps.sign.link,
    'Questionnaires': 'questionnaire-list'
  };

  const stepLink = progressToStepMap[application.progress] || applicationSteps.ownership.link;

  if (application.progress === 'Questionnaires') {
    return buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: application.id });
  }

  return buildRoute(APPLICATION_STEP_ROUTE, {
    applicationId: application.id,
    stepLink: stepLink
  });
}

export function handlePrimaryQualifyingOwner(applicationData: Application[] | null, entityData: Entity[] | null): string {
  if (applicationData?.length) {
    const lastApplication = applicationData[applicationData.length - 1];
    return lastApplication.progress
      ? getApplicationRedirect(lastApplication)
      : getEntityRedirect(entityData);
  }

  return getEntityRedirect(entityData);
}

export function handleNonPrimaryRoles(applicationData: Application[] | null): string {
  if (applicationData?.length) {
    const lastApplication = applicationData[applicationData.length - 1];
    return getApplicationRedirect(lastApplication);
  }
  return CLAIM_YOUR_BUSINESS;
}

function getEntityRedirect(entityData: Entity[] | null): string {
  if (entityData?.length) {
    const lastEntity = entityData[entityData.length - 1];
    return buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, { entity_id: lastEntity.id });
  }

  return CLAIM_YOUR_BUSINESS;
}
