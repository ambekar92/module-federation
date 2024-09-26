'use client';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_LIST_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { useParams } from 'next/navigation';
import { applicationSteps } from '../../utils/constants';
import StepsIndicator from './StepIndicator';
import { useEffect, useState } from 'react';

interface ApplicationStepIndicatorProps {
  stepNumber: number
}

function ApplicationStepIndicator({
  stepNumber = 0,
}: ApplicationStepIndicatorProps) {
  const [isClient, setIsClient] = useState(false);
  const session = useSessionUCMS();
  const params = useParams<{application_id: string}>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const userRole: string = session.data.permissions?.[session.data.permissions.length - 1]?.slug || ''

  let steps: string[] = []
  let stepLinks: string[] = []

  if (userRole === 'primary_qualifying_owner' || userRole === 'delegate') {
    steps = [
      'Ownership',
      'Control & Operations',
      'Program Selection',
      'Individual Questionnaire',
      'Document Upload',
      'Contributor Invitation',
      'Sign',
    ]
    stepLinks = [
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.ownership.link
      }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.controlAndOwnership.link
      }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.eligiblePrograms.link
      }),
      buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: params.application_id }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.documentUpload.link
      }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.contributorInvitation.link
      }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.sign.link
      }),
    ]
  } else {
    // Non-owner user steps and links
    steps = [
      'Individual Questionnaire',
      'Document Upload',
      'Sign',
    ]
    stepLinks = [
      buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: params.application_id }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.documentUpload.link
      }),
      buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: params.application_id,
        stepLink: applicationSteps.sign.link
      }),
    ]
  }

  if(!userRole || !steps || !stepLinks || !steps.length || !stepLinks.length) {
    return null
  }
  return (
    <StepsIndicator
      currentStep={stepNumber < steps.length ? stepNumber : steps.length - 1}
      steps={steps}
      headingLevel="h4"
      stepLinks={stepLinks}
    />
  )
}

export default ApplicationStepIndicator
