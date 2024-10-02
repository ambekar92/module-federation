import { useSessionUCMS } from '@/app/lib/auth';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import { Application } from '@/app/services/types/application-service/Application'
import { ModalRef } from '@trussworks/react-uswds';
import React, { useEffect, useRef, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import CloseApplicationModal from './CloseApplicationModal';
import QuestionRenderer from './QuestionRenderer';
import useSWR from 'swr';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ANSWER_ROUTE, CLOSE_APPLICATION_ROUTE, GET_APPLICATIONS_ROUTE, PROGRAM_APPLICATION } from '@/app/constants/local-routes';
interface QuestionnaireProps {
  url: string;
  title: string;
  contributorId: number | null | undefined;
  onRefetchQuestionnaires: () => void;
  setCanNavigate: (shouldBlock: boolean) => void;
}

const Questions: React.FC<QuestionnaireProps> = ({ url, title, contributorId, onRefetchQuestionnaires, setCanNavigate }) => {
  const dispatch = useApplicationDispatch();
  const { data, error, isLoading, mutate } = useSWR<QaQuestionsType>(url);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const session = useSessionUCMS();
  const userId = session?.data?.user.id;
  const closeApplicationRef = useRef<ModalRef>(null);
  const { application_id } = useParams();
  const is8aSocialDisadvantage = url.includes('individual-contributor-eight-a-social-disadvantage');
  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  useEffect(() => {
    if (data && is8aSocialDisadvantage) {
      const firstQuestion = data[0];
      const answerCount = Array.isArray(firstQuestion.answer?.value?.answer)
        ? firstQuestion.answer.value.answer.length
        : 0;
      setCanNavigate(answerCount >= 2);
    }
  }, [data, title, setCanNavigate, mutate, is8aSocialDisadvantage]);

  const handleAnswerChange = async (question: Question, value: any) => {
    if (userId && contributorId) {
      const newAnswer = {
        id: question.id,
        profile_answer_flag: question.profile_answer_flag,
        reminder_flag: false,
        application_contributor_id: contributorId,
        value: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value,
        question_id: question.id,
        answer_by: userId,
      };

      // Check if the new answer is different from the existing one
      const existingAnswer = selectedAnswers[question.name];
      const isAnswerChanged = JSON.stringify(existingAnswer?.value) !== JSON.stringify(newAnswer.value);

      if (isAnswerChanged) {
        setSelectedAnswers(prevState => ({
          ...prevState,
          [question.name]: newAnswer
        }));

        // Only post the answer if it has changed
        const answerToPost = {
          profile_answer_flag: question.profile_answer_flag,
          application_contributor_id: contributorId,
          value: { answer: newAnswer.value },
          question_id: question.id,
          answer_by: userId,
          reminder_flag: false
        };

        try {
          await axios.post(ANSWER_ROUTE, [answerToPost]);
        } catch (error) {
          // Error caught haha -KJ
        }
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
      const applicationData: Application[] = await axios.get(`${GET_APPLICATIONS_ROUTE}?user_id=${userId}`);

      // Finds the first application where the contributorId is in the application_contributor_id array -KJ
      const matchingApplication = applicationData.find(app =>
        app.application_contributor.some(contributor => contributor.id === contributorId)
      );

      if (matchingApplication) {
        const applicationId = matchingApplication.id;
        await axios.post(CLOSE_APPLICATION_ROUTE, {
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
  if (!data || isLoading) {return <Spinner center />}

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
        const handleSkip = async () => {
          try {
            const currentUTCTime = new Date().toISOString();
            const putPayload = {
              application_id: application_id,
              program_id: 2, // Hubzone
              deleted_at: currentUTCTime
            }
            await axios.put(PROGRAM_APPLICATION, putPayload)
          } catch(error) {
            console.log('Error removing hubzone: ', error);
          }
        }

        handleSkip();
        localStorage.setItem('skipHubzoneSup', 'true');
        window.location.href = `/application/${application_id}/document-upload`;
      } else {
        localStorage.setItem('skipHubzoneSup', 'false');
      }
    }
  }

  return (
    <>
      <h2>{title}<TooltipIcon text='You must complete each questionnaire associated with the selected certification requests. If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.' /></h2>
      {is8aSocialDisadvantage && (
        <h3 className="margin-y-0">
          <b><i>Describe at least two experiences which have affected your advancement in business or education or career</i></b>
        </h3>
      )}
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
          refetchQuestions={mutate}
          closeApplicationRef={closeApplicationRef}
        />
      ))}
      <CloseApplicationModal
        modalRef={closeApplicationRef}
        handleAction={handleCloseApplication}
      />

      <p className='float-right text-size-2xs'>OMB Control Number 3245-0374</p>
    </>
  );
};

export default Questions;
