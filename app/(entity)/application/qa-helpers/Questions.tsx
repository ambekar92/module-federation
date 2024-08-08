import { ANSWER_ROUTE, CLOSE_APPLICATION_ROUTE, FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes';
import { axiosInstance } from '@/app/services/axiosInstance';
import fetcher from '@/app/services/fetcher';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import React, { useEffect, useRef, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import QuestionRenderer from './QuestionRenderer';
import { ModalRef } from '@trussworks/react-uswds';
import CloseApplicationModal from './CloseApplicationModal';
import { Application } from '@/app/shared/types/responses';
interface QuestionnaireProps {
  url: string;
  title: string;
  contributorId: number;
  onRefetchQuestionnaires: () => void;
  setCanNavigate: (canNavigate: boolean) => void;
}

const Questions: React.FC<QuestionnaireProps> = ({ url, title, contributorId, onRefetchQuestionnaires, setCanNavigate }) => {
  const dispatch = useApplicationDispatch();
  const { data, error, isLoading } = useFetchOnce<QaQuestionsType>(url, fetcher);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const { userId } = useApplicationId();
  const closeApplicationRef = useRef<ModalRef>(null);

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  const handleAnswerChange = async (question: Question, value: any) => {
    if (userId && contributorId) {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [question.name]: {
          id: question.id,
          profile_answer_flag: question.profile_answer_flag,
          reminder_flag: false,
          application_contributor_id: contributorId,
          value: question.question_type === 'multi_select'
            ? value.map((option: { value: string }) => option.value)
            : value,
          question_id: question.id,
          answer_by: userId,
        }
      }));

      // Saves the answer immediately
      const answer = {
        profile_answer_flag: question.profile_answer_flag,
        application_contributor_id: contributorId,
        value: { answer: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value
        },
        question_id: question.id,
        answer_by: userId,
        reminder_flag: false
      };

      try {
        await axiosInstance.post(ANSWER_ROUTE, [answer]);
      } catch (error) {
        // Error caught haha -KJ
      }

      // Check if navigation should be blocked
      const shouldBlock = question.rules?.some(rule =>
        rule.alert_message === 'You are not allowed to continue' &&
        (
          (Array.isArray(value) && question.question_type === 'multi_select' &&
           value.some(item => rule.answer_given_value.multi_select?.includes(item))) ||
          (question.question_type === 'boolean' || question.question_type === 'text' ||
           question.question_type === 'number' || question.question_type === 'select') &&
          value === rule.answer_given_value[question.question_type]
        )
      );

      setCanNavigate(!shouldBlock);
    }
  };

  const handleCloseApplication = async () => {
    try {
      const applicationData: Application[] = await axiosInstance.get(`${FIRM_APPLICATIONS_ROUTE}/?user_id=${userId}`);

      // Finds the first application where the contributorId is in the application_contributor_id array -KJ
      const matchingApplication = applicationData.find(app =>
        app.application_contributor.some(contributor => contributor.id === contributorId)
      );

      if (matchingApplication) {
        const applicationId = matchingApplication.id;
        await axiosInstance.post(CLOSE_APPLICATION_ROUTE, {
          application_id: applicationId,
          explanation: 'Response to third_party_disqualification_core_program_eligibility disqualified business from continuing',
          user_id: userId
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('No matching application found for the current contributor');
      }
    } catch(error) {
      // Error handled lol -KJ
    }
  }

  if (error) {return <h3>Error: {error.message}</h3>;}
  if (!data || isLoading) {return <h3>Loading...</h3>;}

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <h3>This questionnaire was not found.</h3>;
  }

  const sortedAndFilteredQuestions = data
    .filter(question => question.question_ordinal !== null)
    .sort((q1, q2) => (q1.question_ordinal! - q2.question_ordinal!));

  if(title === 'HUBZone Calculator Supplemental') {
    if(contributorId) {
      const principleOfficeAnswer = sortedAndFilteredQuestions[0].answer?.value;
      const shouldSkip = principleOfficeAnswer?.answer === 'not applicable' || principleOfficeAnswer === null;

      if (shouldSkip) {
        localStorage.setItem('skipHubzoneSup', 'true');
        window.location.href = `/application/${contributorId}/document-upload`;
      } else {
        localStorage.setItem('skipHubzoneSup', 'false');
      }
    }
  }

  return (
    <>
      <h2>{title}</h2>
      {sortedAndFilteredQuestions.map((question, index) => (
        <QuestionRenderer
          contributorId={contributorId}
          userId={userId}
          key={question.id}
          question={question}
          index={index}
          selectedAnswers={selectedAnswers}
          handleAnswerChange={handleAnswerChange}
          onRefetchQuestionnaires={onRefetchQuestionnaires}
          closeApplicationRef={closeApplicationRef}
        />
      ))}
      <CloseApplicationModal
        modalRef={closeApplicationRef}
        handleAction={handleCloseApplication}
      />
    </>
  );
};

export default Questions;
