'use client'
import { ANSWER_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import fetcher from '@/app/services/fetcher';
import { fetcherPOST } from '@/app/services/fetcher-legacy';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import { ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import QuestionRenderer from '../../../qa-helpers/QuestionRenderer';
import { setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch } from '../../../redux/hooks';
import { applicationSteps } from '../../../utils/constants';
import { QuestionnaireProps } from '../../../utils/types';

function ControlAndOpsQuestions({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const { userId } = useApplicationId();
  const url = contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/control-and-operation` : '';
  const { data, error, isLoading } = useSWR<QaQuestionsType>(url, fetcher);
  useEffect(() => {
    dispatch(setStep(applicationSteps.controlAndOwnership.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (error) {return <div>Error: {error.message}</div>;}
  if (!data || isLoading) {return <div>Loading...</div>;}

  const sortedAndFilteredQuestions = data
    .filter(question => question.question_ordinal !== null)
    .sort((q1, q2) => (q1.question_ordinal! - q2.question_ordinal!));

  return (
    <>
      <QAWrapper
        fill
        mainContent={
          <>
            <div>
              <h1>Control & Operations</h1>
              <h3 className="light" style={{ fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5' }}>
          			Please enter the following information about any individual who is on the management team of the company, but is not an owner.
              </h3>
            </div>
            <div>
              <h2>Management Structure</h2>
              <p>Based on the information provided, [Business Name] is designated as a Partnership.</p>
              <p>If this designation is incorrect, please discontinue this application and update your information on <a href="/application">SAM.gov</a></p>
            </div>

            <hr className="margin-y-3 width-full" />
            <Grid row>
              {sortedAndFilteredQuestions.map((question, index) => (
                <QuestionRenderer
                  key={question.id}
                  question={question}
                  index={index}
                  selectedAnswers={selectedAnswers}
                  handleAnswerChange={handleAnswerChange}
                  contributorId={contributorId}
                  userId={userId}
                />
              ))}
            </Grid>
          </>
        }
      />

      <hr className="margin-y-3 margin-bottom-0 width-full border-base-lightest" />

      <ButtonGroup className="display-flex flex-justify padding-y-2 margin-right-2px">
        <Link className="usa-button usa-button--outline" aria-disabled={!contributorId}
          href={
            buildRoute(APPLICATION_STEP_ROUTE, {
              contributorId: contributorId,
              stepLink: applicationSteps.ownership.link
            })
          }
        >
          Previous
        </Link>
        <Link className="usa-button" aria-disabled={!contributorId}
          href={
            buildRoute(APPLICATION_STEP_ROUTE, {
              contributorId: contributorId,
              stepLink: applicationSteps.eligiblePrograms.link
            })
          }
        >
          Next
        </Link>
      </ButtonGroup>
    </>
  );
}
export default ControlAndOpsQuestions
