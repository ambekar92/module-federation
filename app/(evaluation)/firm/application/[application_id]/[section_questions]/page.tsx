'use client'
import { getAnalystQuestionnaires } from '@/app/(evaluation)/components/left-panel/constants'
import { Params, QuestionnaireItem } from '@/app/(evaluation)/types/types'
import { ANSWER_ROUTE, QUESTIONNAIRE_LIST_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { QuestionType } from '@/app/shared/form-builder/questionnaire-types/question-types'
import useFetchOnce from '@/app/shared/hooks/useFetchOnce'
import { Answer, Question } from '@/app/shared/types/questionnaireTypes'
import { Role } from '@/app/shared/types/role'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { Button } from '@trussworks/react-uswds'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useApplicationData } from '../../../useApplicationData'
import AnswerValue from './AnswerValue'
import QuestionRenderer from '@/app/(entity)/application/qa-helpers/QuestionRenderer'
import { useEvaluationDispatch, useEvaluationSelector } from '@/app/(evaluation)/redux/hooks'
import { setCompletedAnalystQA } from '@/app/(evaluation)/redux/evaluationSlice'

const SectionQuestions = () => {
  const params = useParams<Params>();
  const sessionData = useSessionUCMS();
  const [title, setTitle] = useState<string>('');
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const firstContributorId = applicationData?.application_contributor?.[0]?.id;
  const dispatch = useEvaluationDispatch();
  const completedAnalystQAs = useEvaluationSelector(state => state.evaluation.completedAnalystQAs);

  const matchingContributorId = useMemo(() => {
    if (!applicationData?.application_contributor || userRole !== 'analyst') {
      return null;
    }

    const analystRoles: Role[] = [
      Role.ANALYST,
      Role.ANALYST_HIGH_TIER,
      Role.ANALYST_LOW_TIER,
      Role.ANALYST_HIGH,
      Role.ANALYST_LOW,
      Role.ANALYST_CONTRIBUTOR_OGC,
      Role.ANALYST_CONTRIBUTOR_OSS
    ];

    const matchingContributor = applicationData.application_contributor.find(contributor => {
      return analystRoles.some(role => role.toLowerCase().replace(/_/g, '-') === contributor.application_role.name);
    });

    return matchingContributor?.id || null;
  }, [applicationData, userRole]);

  const isAnalystQuestionnaire = useMemo(() => {
    return params.section_questions?.startsWith('analyst-questionnaire');
  }, [params.section_questions]);
  const analystQuestionnaires = useMemo(() => getAnalystQuestionnaires(), []);
  const isLastQuestionnaire = useMemo(() => {
    return params.section_questions === analystQuestionnaires[analystQuestionnaires.length - 1].replace(/^\//, '');
  }, [params.section_questions, analystQuestionnaires]);

  const contributorIdToUse = isAnalystQuestionnaire ? matchingContributorId : firstContributorId;

  const { data, isLoading } = useFetchOnce<Question[]>(
    contributorIdToUse ? `${QUESTIONNAIRE_ROUTE}/${contributorIdToUse}/${params.section_questions}` : null,
    fetcher
  );

  const { data: navItems } = useFetchOnce<QuestionnaireItem[]>(
    firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null,
    fetcher
  );

  const combinedNavItems = useMemo(() => {
    if (!navItems) {return [];}
    if (userRole !== 'analyst') {return navItems;}

    const analystItems = getAnalystQuestionnaires().map(url => ({
      title: url.replace(/-/g, ' ')
        .replace(/(\b\w)/g, l => l.toUpperCase())
        .replace(/^\//, '')
        .replace(/Eight A/g, '8(a)'),
      url: `/firm/application/${params.application_id}${url}`,
      section: 'Analyst Questionnaires'
    }));

    return [...navItems, ...analystItems];
  }, [navItems, params.application_id, userRole]);

  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const router = useRouter();

  function onContinue() {
    const current = combinedNavItems.find(q => q.title === title);
    if (!current) { setShowNextButton(false); return; }
    const currIdx = combinedNavItems.indexOf(current);
    if (currIdx === (combinedNavItems.length - 1)) { return; }
    const next = combinedNavItems[currIdx + 1].url;
    router.push(next.startsWith('/') ? next : `../${next}`);
  }

  const handleAnswerChange = async (question: Question, value: any) => {
    if (sessionData.data.user_id && matchingContributorId) {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [question.name]: {
          id: question.id,
          profile_answer_flag: question.profile_answer_flag,
          reminder_flag: false,
          application_contributor_id: matchingContributorId,
          value: question.question_type === 'multi_select'
            ? value.map((option: { value: string }) => option.value)
            : value,
          question_id: question.id,
          answer_by: sessionData.data.user_id,
        }
      }));

      // Saves the answer immediately
      const answer = {
        profile_answer_flag: question.profile_answer_flag,
        application_contributor_id: matchingContributorId,
        value: { answer: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value
        },
        question_id: question.id,
        answer_by: sessionData.data.user_id,
        reminder_flag: false
      };

      try {
        await axiosInstance.post(ANSWER_ROUTE, [answer]);
      } catch (error) {
        // Error caught haha -KJ
      }
    }
  };

  const handleNextQuestionnaire = () => {
    if (isLastQuestionnaire) {
      router.push('evaluation');
    } else {
      const currentIndex = analystQuestionnaires.findIndex(url => url.includes(params.section_questions as string));
      if (currentIndex < analystQuestionnaires.length - 1) {
        const nextUrl = analystQuestionnaires[currentIndex + 1];
        router.push(`/firm/application/${params.application_id}${nextUrl}`);
      }
    }
  };

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
    if (isAnalystQuestionnaire && data) {
      const allQuestionsAnswered = data.every(question => selectedAnswers[question.name]?.value !== null);
      const currentQuestionnaireKey = params.section_questions?.replace('analyst-questionnaire-', '') as keyof typeof completedAnalystQAs;

      if (allQuestionsAnswered) {
        dispatch(setCompletedAnalystQA({ key: currentQuestionnaireKey, value: true }));
      }
    }
  }, [isAnalystQuestionnaire, data, selectedAnswers, dispatch, params.section_questions]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>No data found</div>}
      {!!data && !isLoading && <>
        <h1>{title}</h1>
        <form>
          {data.map((question, index) => (
            <React.Fragment key={index}>
              {isAnalystQuestionnaire && matchingContributorId ? (
                <QuestionRenderer
                  contributorId={matchingContributorId}
                  userId={sessionData?.data?.user_id}
                  key={question.id}
                  question={question}
                  index={index}
                  selectedAnswers={selectedAnswers}
                  handleAnswerChange={handleAnswerChange}
                  onRefetchQuestionnaires={() => {}}
                />
              ) : (
                <>
                  {question.question_type === QuestionType.GRID &&
                    <div key={question.id}>
                      {question?.grid_questions?.map(q => <AnswerValue question={q} key={q.id} />)}
                    </div>}
                  <AnswerValue key={index} question={question} />
                </>
              )}
            </React.Fragment>
          ))}
        </form>
        {(
          (userRole === 'screener' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'screening' && applicationData?.process.data?.review_start === true && showNextButton) ||
          (userRole === 'analyst' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'analyst' && applicationData?.process.data?.review_start === true && showNextButton) ||
          (userRole === 'reviewer' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'reviewer' && showNextButton) ||
          (userRole === 'approver' && applicationData?.workflow_state === 'under_review' && applicationData?.process?.data.step === 'approver' && showNextButton)
        )
          && (<Button onClick={onContinue} className='margin-top-4' type='button'>Accept & Continue</Button>)}
      </>
      }
      {isAnalystQuestionnaire && (
        <Button
          onClick={handleNextQuestionnaire}
          className='margin-top-4'
          type='button'
          // disabled={!completedAnalystQAs[params.section_questions?.replace('analyst-questionnaire-', '') as keyof typeof completedAnalystQAs]}
        >
          {isLastQuestionnaire ? 'Done' : 'Save & Continue'}
        </Button>
      )}
    </div>
  )

}

export default SectionQuestions
