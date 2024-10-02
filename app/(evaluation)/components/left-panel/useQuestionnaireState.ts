import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import useSWR from 'swr';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Application } from '@/app/services/types/application-service/Application';
import { Role } from '@/app/shared/types/role';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';

export function useQuestionnaireState(applicationData: Application | null, analystQuestionnaires: string[]) {
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const [currentQuestionnaireIndex, setCurrentQuestionnaireIndex] = useState(0);
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});

  const matchingContributorId = useMemo(() => {
    if (!applicationData?.application_contributor) {return null;}
    if (userRole === 'analyst' || userRole === 'reviewer') {
      const analystRoles: Role[] = [
        Role.ANALYST,
        Role.ANALYST_HIGH_TIER,
        Role.ANALYST_LOW_TIER,
        Role.ANALYST_HIGH,
        Role.ANALYST_LOW,
        Role.ANALYST_CONTRIBUTOR_OGC,
        Role.ANALYST_CONTRIBUTOR_OSS,
      ];
      const matchingContributor = applicationData.application_contributor.find(contributor => {
        return analystRoles.some(role => role.toLowerCase().replace(/_/g, '-') === contributor.application_role.name);
      });
      return matchingContributor?.id || null;
    }
    return null;
  }, [applicationData, userRole]);

  const reviewerContributorId = useMemo(() => {
    if (!applicationData?.application_contributor || userRole !== 'reviewer') {
      return null;
    }
    const reviewerRoles: Role[] = [
      Role.REVIEWER,
      Role.REVIEWER_HIGH,
      Role.REVIEWER_HIGH_TIER,
      Role.REVIEWER_LOW,
      Role.REVIEWER_LOW_TIER
    ];
    const reviewerContributor = applicationData.application_contributor.find(contributor => {
      return reviewerRoles.some(role => role.toLowerCase().replace(/_/g, '-') === contributor.application_role.name);
    });
    return reviewerContributor?.id || null;
  }, [applicationData, userRole]);

  const currentQuestionnaire = analystQuestionnaires[currentQuestionnaireIndex];

  const contributorId = userRole === 'reviewer' ? reviewerContributorId : matchingContributorId;

  const { data: questionnaireData, isLoading } = useSWR<Question[]>(
    contributorId && currentQuestionnaire
      ? `${QUESTIONNAIRE_ROUTE}/${contributorId}${currentQuestionnaire}`
      : null,
  );

  useEffect(() => {
    if (questionnaireData && !isLoading) {
      const isAnyQuestionAnswered = questionnaireData.some(question =>
        question.answer && question.answer.value !== null && question.answer.value !== undefined
      );
      const currentQuestionnaireKey = currentQuestionnaire.replace('/', '').replace('analyst-questionnaire-', '');

      setCompletedQuestionnaires(prev => {
        if (prev[currentQuestionnaireKey] !== isAnyQuestionAnswered) {
          return { ...prev, [currentQuestionnaireKey]: (isAnyQuestionAnswered || currentQuestionnaireIndex === analystQuestionnaires.length - 1) };
        }
        return prev;
      });

      if (isAnyQuestionAnswered && currentQuestionnaireIndex < analystQuestionnaires.length - 1) {
        setCurrentQuestionnaireIndex(prevIndex => {
          if (prevIndex === currentQuestionnaireIndex) {
            return prevIndex + 1;
          }
          return prevIndex;
        });
      }
    }
  }, [questionnaireData, isLoading, currentQuestionnaire, currentQuestionnaireIndex, analystQuestionnaires.length]);

  const updateQuestionnaireCompletion = useCallback((questionnaireKey: string, isCompleted: boolean) => {
    setCompletedQuestionnaires(prev => {
      if (prev[questionnaireKey] !== isCompleted) {
        return { ...prev, [questionnaireKey]: isCompleted };
      }
      return prev;
    });
  }, []);

  return {
    currentQuestionnaire,
    questionnaireData,
    isLoading,
    completedQuestionnaires,
    contributorId,
    updateQuestionnaireCompletion
  };
}
