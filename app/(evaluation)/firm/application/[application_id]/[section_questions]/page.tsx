'use client'
import QuestionRenderer from '@/app/(entity)/application/qa-helpers/QuestionRenderer'
import { getAnalystQuestionnaires } from '@/app/(evaluation)/components/left-panel/constants'
import { useFirmSelector } from '@/app/(evaluation)/firm/store/hooks'
import { Params, QuestionnaireItem } from '@/app/(evaluation)/types/types'
import { ANSWER_ROUTE, QUESTIONNAIRE_LIST_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { QuestionType } from '@/app/shared/form-builder/questionnaire-types/question-types'
import { Answer, Question } from '@/app/shared/types/questionnaireTypes'
import { Role } from '@/app/shared/types/role'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { Button } from '@trussworks/react-uswds'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useCurrentApplication } from '../../../useApplicationData'
import AnswerValue from './AnswerValue'

const SectionQuestions = () => {
  const params = useParams<Params>();
  const sessionData = useSessionUCMS();
  const [title, setTitle] = useState<string>('');
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const { applicationData } = useCurrentApplication();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const firstContributorId = applicationData?.application_contributor?.[0]?.id;
  const completedAnalystQAs = useFirmSelector(state => state.evaluation.completedAnalystQAs);

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

  const analystQuestionnaires = useMemo(() => {
    if (!applicationData?.program_application) {return [];}
    return getAnalystQuestionnaires(applicationData.program_application);
  }, [applicationData?.program_application]);

  const isLastQuestionnaire = useMemo(() => {
    if (!analystQuestionnaires.length) {return false;}
    const lastQuestionnaire = analystQuestionnaires[analystQuestionnaires.length - 1];
    return params.section_questions === lastQuestionnaire.replace(/^\//, '');
  }, [params.section_questions, analystQuestionnaires]);

  const contributorIdToUse = isAnalystQuestionnaire ? matchingContributorId : firstContributorId;

  const { data, isLoading } = useSWR<Question[]>(
    contributorIdToUse ? `${QUESTIONNAIRE_ROUTE}/${contributorIdToUse}/${params.section_questions}` : null,
    fetcher
  );

  const { data: navItems } = useSWR<QuestionnaireItem[]>(
    firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null,
    fetcher
  );

  const combinedNavItems = useMemo(() => {
    if (!navItems) {return [];}
    if (userRole !== 'analyst') {return navItems;}

    const analystItems = analystQuestionnaires.map(url => ({
      title: url.replace(/-/g, ' ')
        .replace(/(\b\w)/g, l => l.toUpperCase())
        .replace(/^\//, '')
        .replace(/Eight A/g, '8(a)'),
      url: `/firm/application/${params.application_id}${url}`,
      section: 'Analyst Questionnaires'
    }));

    return [...navItems, ...analystItems];
  }, [navItems, params.application_id, userRole, analystQuestionnaires]);

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
      if (currentIndex >= 0 && currentIndex < analystQuestionnaires.length - 1) {
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

  // TODO Update url for hubzone redirect -KJ
  const handleHUBZoneCalculatorRedirect = () => {
    const userRole = getUserRole(sessionData?.data?.permissions || []);
    const accessToken = sessionData?.data?.access;
    const userId = sessionData?.data?.user_id;
    const applicationId = params.application_id;

    if (accessToken && firstContributorId && userId && applicationId) {
      const url = `http://localhost:3001/?wt=${accessToken}&application_contributor_id=${firstContributorId}&user_id=${userId}&application_id=${applicationId}&role=${userRole}`;
      window.open(url, '_blank'); // Makes sure it opens in a new tab
    } else {
      console.error('Missing required params for HUBZone Calculator');
    }
  };

  const showHUBZoneCalculatorButton = params.section_questions?.includes('hubzone-calculator');
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
                  {!showHUBZoneCalculatorButton && <AnswerValue key={index} question={question} />}
                </>
              )}
            </React.Fragment>
          ))}
        </form>
        {showHUBZoneCalculatorButton ? (
          <>
            <p>
              Click the button below to open the HUBZone Calculator. You will be able to review the Calculator entries made by the business, and their calculated eligibility. You can make notes on any of the entries, mark them as reviewed, and even make changes if necessary.  Save your changes in the Calculator, and return to this screen to continue the application review.
            </p>
            <Button onClick={handleHUBZoneCalculatorRedirect} className='margin-bottom-2' type='button'>
              Open HUBZone Answers
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
      </>
      }
      {isAnalystQuestionnaire && (
        <Button
          onClick={handleNextQuestionnaire}
          className='margin-top-4'
          type='button'
          disabled={!completedAnalystQAs[params.section_questions?.replace('analyst-questionnaire-', '') as keyof typeof completedAnalystQAs]}
        >
          {isLastQuestionnaire ? 'Done' : 'Save & Continue'}
        </Button>
      )}
    </div>
  )

}

export default SectionQuestions
