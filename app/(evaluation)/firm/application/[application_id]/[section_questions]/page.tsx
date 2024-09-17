'use client'
import { controlAndOperationQuestionnaire, getAnalystQuestionnaires, ownershipQuestionnaire } from '@/app/(evaluation)/components/left-panel/constants'
import { useQuestionnaireState } from '@/app/(evaluation)/components/left-panel/useQuestionnaireState'
import { Params, QuestionnaireItem } from '@/app/(evaluation)/types/types'
import { ANSWER_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes'
import { useSessionUCMS } from '@/app/lib/auth'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { Answer, Question } from '@/app/shared/types/questionnaireTypes'
import { Role } from '@/app/shared/types/role'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { Button } from '@trussworks/react-uswds'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useCurrentApplication } from '../../../useApplicationData'
import AnswerValue from './AnswerValue'
import FirmQuestionRenderer from './FirmQuestionRenderer'

const SectionQuestions = () => {
  const params = useParams<Params>();
  const sessionData = useSessionUCMS();
  const [title, setTitle] = useState<string>('');
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const { applicationData } = useCurrentApplication();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const firstContributorId = applicationData?.application_contributor?.[0]?.id;
  const [isComplete, setIsComplete] = useState(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const router = useRouter();

  const analystContributorId = useMemo(() => {
    if (!applicationData?.application_contributor) {
      return null;
    }

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

      const analystContributor = applicationData.application_contributor.find(contributor => {
        return analystRoles.some(role => role.toLowerCase().replace(/_/g, '-') === contributor.application_role.name);
      });
      return analystContributor?.id || null;
    }
  }, [applicationData, userRole]);

  const analystContributorName = useMemo(() => {
    if (!applicationData?.application_contributor) {
      return null;
    }

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

      const analystContributor = applicationData.application_contributor.find(contributor => {
        return analystRoles.some(role => role.toLowerCase().replace(/_/g, '-') === contributor.application_role.name);
      });
      return `${analystContributor?.user.first_name} ${analystContributor?.user.last_name} - ${analystContributor?.application_role.title}` || null;
    }
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
    ]

    const reviewerContributorId = applicationData.application_contributor.find(contributor => {
      return reviewerRoles.some(role => role.toLowerCase().replace(/_/g, '-') === contributor.application_role.name);
    });
    return reviewerContributorId?.id || null;
  }, [applicationData, userRole]);

  const analystQuestionnaires = useMemo(() => {
    if (!applicationData?.program_application) {return [];}
    return getAnalystQuestionnaires(applicationData.program_application);
  }, [applicationData?.program_application]);

  const isLastQuestionnaire = useMemo(() => {
    if (!analystQuestionnaires.length) {return false;}
    const lastQuestionnaire = analystQuestionnaires[analystQuestionnaires.length - 1];
    return params.section_questions === lastQuestionnaire.replace(/^\//, '');
  }, [params.section_questions, analystQuestionnaires]);

  const isAnalystQuestionnaire = useMemo(() => {
    return params.section_questions?.startsWith('analyst-questionnaire');
  }, [params.section_questions]);

  const { data: reviewerData, isLoading: reviewerLoading } = useSWR<Question[]>(
    userRole === 'reviewer' && reviewerContributorId && isAnalystQuestionnaire
      ? `${QUESTIONNAIRE_ROUTE}/${reviewerContributorId}/${params.section_questions}`
      : null,
  );

  const { data: analystData, isLoading: analystLoading } = useSWR<Question[]>(
    (userRole === 'analyst' || userRole === 'reviewer') && analystContributorId && isAnalystQuestionnaire
      ? `${QUESTIONNAIRE_ROUTE}/${analystContributorId}/${params.section_questions}`
      : null
  );

  const { data: regularData, isLoading: regularLoading } = useSWR<Question[]>(
    !isAnalystQuestionnaire && firstContributorId
      ? `${QUESTIONNAIRE_ROUTE}/${firstContributorId}/${params.section_questions}`
      : null
  );

  const { data: navItems } = useSWR<QuestionnaireItem[]>(
    firstContributorId ? `${QUESTIONNAIRE_ROUTE}/${firstContributorId}` : null
  );

  const combinedNavItems = useMemo(() => {
    if (!navItems) {return [];}

    const baseItems = [
      {
        id: (navItems.length || 0) + 1,
        title: 'Owner and Management',
        url: `/firm/application/${params.application_id}${ownershipQuestionnaire}`,
        section: 'Application',
      },
      {
        id: (navItems.length || 0) + 2,
        title: 'Control and Operation',
        url: `/firm/application/${params.application_id}${controlAndOperationQuestionnaire}`,
        section: 'Application',
      },
      ...navItems
    ];

    if (userRole === 'analyst') {
      const analystItems = analystQuestionnaires.map(url => ({
        title: url.replace(/-/g, ' ')
          .replace(/(\b\w)/g, l => l.toUpperCase())
          .replace(/^\//, '')
          .replace(/Eight A/g, '8(a)'),
        url: `/firm/application/${params.application_id}${url}`,
        section: 'Analyst Questionnaires'
      }));

      return [...baseItems, ...analystItems];
    }

    return baseItems;
  }, [navItems, params.application_id, userRole, analystQuestionnaires]);

  const { updateQuestionnaireCompletion } = useQuestionnaireState(applicationData, analystQuestionnaires);

  function onContinue() {
    const current = combinedNavItems.find(q => q.title === title);
    if (!current) { setShowNextButton(false); return; }
    const currIdx = combinedNavItems.indexOf(current);
    if (currIdx === (combinedNavItems.length - 1)) { return; }
    const next = combinedNavItems[currIdx + 1].url;
    router.push(next.startsWith('/') ? next : `../${next}`);
  }

  const handleAnswerChange = async (question: Question, value: any) => {
    if (sessionData.data.user_id && (analystContributorId || reviewerContributorId)) {
      const isReviewerQuestion = question.name.startsWith('reviewer-');
      const contributorId = isReviewerQuestion ? reviewerContributorId : analystContributorId;

      if (contributorId === null || contributorId === undefined) {
        return;
      }

      const newAnswer: Answer = {
        id: question.id,
        profile_answer_flag: question.profile_answer_flag,
        reminder_flag: false,
        application_contributor_id: contributorId,
        value: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value,
        question_id: question.id,
        answer_by: sessionData.data.user_id,
      };

      setSelectedAnswers(prevState => ({
        ...prevState,
        [question.name]: newAnswer
      }));

      // Saves the answer immediately
      const answerForAPI = {
        profile_answer_flag: question.profile_answer_flag,
        application_contributor_id: contributorId,
        value: { answer: newAnswer.value },
        question_id: question.id,
        answer_by: sessionData.data.user_id,
        reminder_flag: false
      };

      try {
        await axios.post(ANSWER_ROUTE, [answerForAPI]);
      } catch (error) {
        // Handled
      }
    }
    const questionnaireKey = params.section_questions?.replace('analyst-questionnaire-', '') as string;
    updateQuestionnaireCompletion(questionnaireKey, true);
  };

  const handleNextQuestionnaire = () => {
    if (isLastQuestionnaire) {
      router.push('evaluation');
    } else {
      const currentIndex = analystQuestionnaires.findIndex(url => url.includes(params.section_questions as string));
      if (currentIndex >= 0 && currentIndex < analystQuestionnaires.length - 1) {
        const nextUrl = analystQuestionnaires[currentIndex + 1];
        router.push(`/firm/application/${params.application_id}${nextUrl}`);
      }
    }
  };

  // TODO Update url for hubzone redirect -KJ
  const handleHUBZoneCalculatorRedirect = () => {
    const userRole = getUserRole(sessionData?.data?.permissions || []);
    const accessToken = sessionData?.data?.access;
    const userId = sessionData?.data?.user_id;
    const applicationId = params.application_id;

    if (accessToken && firstContributorId && userId && applicationId) {
      const url = `${process.env.NEXT_PUBLIC_HUBZONE_URL}?wt=${accessToken}&application_contributor_id=${firstContributorId}&user_id=${userId}&application_id=${applicationId}&role=${userRole}`;
      window.open(url, '_blank'); // Makes sure it opens in a new tab
    } else {
      // Handled
    }
  };

  const showHUBZoneCalculatorButton = params.section_questions === 'hubzone-calculator';

  const renderQuestions = (questions: Question[] | undefined, isAnalyst: boolean) => {
    if (!questions) {return null;}

    return questions.map((question, index) => (
      <React.Fragment key={index}>
        {isAnalyst ? (
          <FirmQuestionRenderer
            contributorId={analystContributorId}
            userId={sessionData?.data?.user_id}
            key={question.id}
            question={question}
            index={index}
            userName={analystContributorName}
            selectedAnswers={selectedAnswers}
            handleAnswerChange={handleAnswerChange}
            onRefetchQuestionnaires={() => {}}
            reviewerQuestion={userRole === 'reviewer' ? analystData?.find(q => q.name === question.name) : undefined}
            isReviewer={userRole === 'reviewer'}
          />
        ) : (
          !showHUBZoneCalculatorButton && <AnswerValue key={index} question={question} />
        )}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    if (combinedNavItems.length > 0) {
      const currentSection = combinedNavItems.find(item =>
        item.url.includes(params.section_questions as string) ||
        (params.section_questions as string).includes(item.url.split('/').pop() as string)
      );
      if (currentSection) {
        let newTitle = currentSection.title;
        if (newTitle.startsWith('Analyst Questionnaire')) {
          newTitle = newTitle.replace('Analyst Questionnaire ', '');
        }
        setTitle(newTitle);
      } else if (params.section_questions?.startsWith('analyst-questionnaire-')) {
        const questionnaireTitle = params.section_questions
          .replace('analyst-questionnaire-', '')
          .replace(/-/g, ' ')
          .replace(/(\b\w)/g, l => l.toUpperCase());
        setTitle(questionnaireTitle);
      }
    }
  }, [combinedNavItems, params.section_questions])

  useEffect(() => {
    if (isAnalystQuestionnaire) {
      const relevantData = userRole === 'analyst' ? analystData : reviewerData;
      if (relevantData && relevantData.length > 0) {
        const firstQuestion = relevantData[0];
        const isFirstQuestionAnswered = firstQuestion.answer &&
          firstQuestion.answer.value !== null &&
          firstQuestion.answer.value !== undefined;
        setIsComplete(isFirstQuestionAnswered);
      }
    }
  }, [isAnalystQuestionnaire, userRole, analystData, reviewerData]);

  useEffect(() => {
    if (combinedNavItems.length > 0) {
      const currentSection = combinedNavItems.find(item => item.url.includes(params.section_questions as string));
      if (currentSection) {
        let newTitle = currentSection.title;
        if (newTitle.startsWith('Analyst Questionnaire')) {
          newTitle = newTitle.replace('Analyst Questionnaire ', '');
        }
        setTitle(newTitle);
      }
    }
  }, [combinedNavItems, params.section_questions]);

  useEffect(() => {
    if (isAnalystQuestionnaire) {
      const relevantData = userRole === 'analyst' ? analystData : reviewerData;
      if (relevantData && relevantData.length > 0) {
        const firstQuestion = relevantData[0];
        const isFirstQuestionAnswered = firstQuestion.answer &&
          firstQuestion.answer.value !== null &&
          firstQuestion.answer.value !== undefined;

        const hasSelectedAnswers = Object.keys(selectedAnswers).length > 0;

        setIsComplete(isFirstQuestionAnswered || hasSelectedAnswers);
      }
    }
  }, [isAnalystQuestionnaire, userRole, analystData, reviewerData, selectedAnswers]);

  useEffect(() => {
    if (isAnalystQuestionnaire) {
      const relevantData = userRole === 'analyst' ? analystData : reviewerData;
      if (relevantData && relevantData.length > 0) {
        const firstQuestion = relevantData[0];
        const isFirstQuestionAnswered = firstQuestion.answer &&
          firstQuestion.answer.value !== null &&
          firstQuestion.answer.value !== undefined;

        const questionnaireKey = params.section_questions?.replace('analyst-questionnaire-', '') as string;
        updateQuestionnaireCompletion(questionnaireKey, isFirstQuestionAnswered);
      }
    }
  }, [isAnalystQuestionnaire, userRole, analystData, reviewerData, params.section_questions, updateQuestionnaireCompletion]);

  return (
    <div className="width-full maxw-full">
      <h1>{title}</h1>

      {(reviewerLoading || analystLoading || regularLoading) && <Spinner center />}

      {!reviewerLoading && !analystLoading && !regularLoading && !reviewerData && !analystData && !regularData && (
        <div>No data found</div>
      )}

      {(reviewerData || analystData || regularData) && !reviewerLoading && !analystLoading && !regularLoading && (
        <>
          <form>
            {isAnalystQuestionnaire ? (
              <>
                {userRole === 'reviewer' && renderQuestions(reviewerData, true)}
                {(userRole === 'analyst') && renderQuestions(analystData, true)}
              </>
            ) : (
              renderQuestions(regularData, false)
            )}
          </form>
          {showHUBZoneCalculatorButton ? (
            <>
              <p>
								Click the button below to open the HUBZone Calculator. You will be able to review the Calculator entries made by the business, and their calculated eligibility. You can make notes on any of the entries, mark them as reviewed, and even make changes if necessary. Save your changes in the Calculator, and return to this screen to continue the application review.
              </p>
              <Button onClick={handleHUBZoneCalculatorRedirect} className='margin-bottom-2' type='button'>
								Open HUBZone Calculator
              </Button>
            </>
          ) : (
            (((userRole === 'screener' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'screening' && applicationData?.process.data?.review_start === true) ||
							(userRole === 'analyst' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'analyst' && applicationData?.process.data?.review_start === true) ||
							(userRole === 'reviewer' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'reviewer') ||
							(userRole === 'approver' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'approver')) &&
							showNextButton
            ) && <Button onClick={onContinue} className='margin-top-4' type='button'>Accept & Continue</Button>
          )}
          {isAnalystQuestionnaire && (
            <Button
              onClick={handleNextQuestionnaire}
              className={isAnalystQuestionnaire ? 'float-right margin-left-auto' : 'margin-top-4'}
              type='button'
              disabled={!isComplete}
            >
              {isLastQuestionnaire ? 'Done' : 'Save & Continue'}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default SectionQuestions
