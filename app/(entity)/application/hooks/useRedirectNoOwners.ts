import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { useEffect } from 'react';
import { applicationSteps } from '../utils/constants';

interface Props {
  ownerData: Question[] | undefined;
  applicationId: number;
  applicationRole: any | undefined;
}
/**
   * Hook to redirect to the ownership step if there are no owners
   * @param {{ownerData: Question[], applicationId: string}} props - properties for the hook
   * @param {Question[]} props.ownerData - owner data
   * @param {string} props.applicationId - id of the application
   *
   * If there are no owners, redirect to the ownership step
*/
export const useRedirectIfNoOwners = ({ownerData, applicationId, applicationRole}: Props) => {
  useEffect(() => {
    if (applicationRole && applicationRole.length > 0 && applicationRole[0].application_role.name === 'primary-qualifying-owner') {
      const isOwnerDataEmpty = (data: Question) =>
        !data?.answer ||
        !data?.answer.value?.answer ||
        !Array.isArray(data?.answer.value?.answer) ||
        data?.answer.value?.answer.length === 0;

      if (ownerData &&
          isOwnerDataEmpty(ownerData[0]) &&
          isOwnerDataEmpty(ownerData[1])
      ) {
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId,
          stepLink: applicationSteps.ownership.link
        });
      }
    }
  }, [ownerData, applicationId]);
};
