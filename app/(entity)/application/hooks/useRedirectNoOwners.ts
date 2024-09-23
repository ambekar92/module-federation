import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { useEffect } from 'react';
import { applicationSteps } from '../utils/constants';

interface Props {
	ownerData: Question[] | undefined;
	applicationId: number;
}
/**
   * Hook to redirect to the ownership step if there are no owners
   * @param {{ownerData: Question[], applicationId: string}} props - properties for the hook
   * @param {Question[]} props.ownerData - owner data
   * @param {string} props.applicationId - id of the application
   *
   * If there are no owners, redirect to the ownership step
*/
export const useRedirectIfNoOwners = ({ownerData, applicationId}: Props) => {
  useEffect(() => {
    if (ownerData &&
        (!ownerData[0]?.answer ||
         !ownerData[0]?.answer.value.answer ||
         !Array.isArray(ownerData[0]?.answer.value.answer) ||
         ownerData[0]?.answer.value.answer.length === 0)) {
      window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId,
        stepLink: applicationSteps.ownership.link
      });
    }
  }, [ownerData, applicationId]);
};
