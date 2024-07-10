import { ANSWER_ROUTE } from '@/app/constants/routes';
import { fetcherGET, fetcherPOST } from '@/app/services/fetcher';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import QuestionRenderer from './QuestionRenderer';

interface QuestionnaireProps {
  url: string;
  title: string;
}

const Questions: React.FC<QuestionnaireProps> = ({ url, title }) => {
  const dispatch = useApplicationDispatch();
  const { data, error } = useSWR<QaQuestionsType>(url, fetcherGET);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const { userId, contributorId } = useApplicationId();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  const handleAnswerChange = (question: Question, value: any) => {
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

      // Save the answer immediately
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

      fetcherPOST(ANSWER_ROUTE, [answer])
        .catch(error => {
          console.error('Error saving answer:', error);
        });
    }
  };

  const handlePostRequest = async () => {
    try {
      if (contributorId && userId) {
        const postData = Object.values(selectedAnswers).map(answer => ({
          profile_answer_flag: answer.profile_answer_flag,
          application_contributor_id: contributorId,
          value: { answer: answer.value },
          question_id: answer.question_id,
          answer_by: userId,
          reminder_flag: answer.reminder_flag
        }));

        await fetcherPOST(ANSWER_ROUTE, postData);
      } else {
        const customError = 'Application ID or user ID not found';
        alert(customError);
        throw customError;
      }
    } catch (error: any) {
      console.error('Error in POST request:', error);
      throw error;
    }
  };

  if (error) {return <div>Error: {error.message}</div>;}
  if (!data) {return <div>Loading...</div>;}

  const sortedAndFilteredQuestions = data
    .filter(question => question.question_ordinal !== null)
    .sort((q1, q2) => (q1.question_ordinal! - q2.question_ordinal!));

  return (
    <>
      <h2>{title}</h2>
      {sortedAndFilteredQuestions.map((question, index) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          index={index}
          selectedAnswers={selectedAnswers}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
    </>
  );
};

export default Questions;
