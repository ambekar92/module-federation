import { ANSWER_ROUTE } from '@/app/constants/routes';
import { axiosInstance } from '@/app/services/axiosInstance';
import fetcher from '@/app/services/fetcher';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import React, { useEffect, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import QuestionRenderer from './QuestionRenderer';

interface QuestionnaireProps {
  url: string;
  title: string;
  contributorId: number;
	onRefetchQuestionnaires: () => void;
}

const Questions: React.FC<QuestionnaireProps> = ({ url, title, contributorId, onRefetchQuestionnaires }) => {
  const dispatch = useApplicationDispatch();
  const { data, error, isLoading } = useFetchOnce<QaQuestionsType>(url, fetcher);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const { userId } = useApplicationId();

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
    }
  };

  if (error) {return <h3>Error: {error.message}</h3>;}
  if (!data || isLoading) {return <h3>Loading...</h3>;}

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <h3>This questionnaire was not found.</h3>;
  }

  const sortedAndFilteredQuestions = data
    .filter(question => question.question_ordinal !== null)
    .sort((q1, q2) => (q1.question_ordinal! - q2.question_ordinal!));

  if(title === 'Hubzone Calculator Supplemental') {
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
          contributorId={contributorId} userId={userId}
          key={question.id}
          question={question}
          index={index}
          selectedAnswers={selectedAnswers}
          handleAnswerChange={handleAnswerChange}
          onRefetchQuestionnaires={onRefetchQuestionnaires}
        />
      ))}
    </>
  );
};

export default Questions;
