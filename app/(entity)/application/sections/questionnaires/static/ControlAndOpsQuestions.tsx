'use client'
import { ANSWER_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import { ButtonGroup, Grid } from '@trussworks/react-uswds';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useWorkflowRedirect } from '../../../hooks/useWorkflowRedirect';
import QuestionRenderer from '../../../qa-helpers/QuestionRenderer';
import { setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch } from '../../../redux/hooks';
import { applicationSteps } from '../../../utils/constants';
import { useRedirectIfNoOwners } from '../../../hooks/useRedirectNoOwners';

function ControlAndOpsQuestions() {
  const dispatch = useApplicationDispatch();
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const url = contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/control-and-operation` : null;
  const { data, error, isLoading } = useSWR<QaQuestionsType>(url);
  const { data: ownerData } = useSWR<Question[]>(applicationData ? `${QUESTIONNAIRE_ROUTE}/${applicationData?.application_contributor[0].id}/owner-and-management` : null);
  const applicationRole = applicationData?.application_contributor.filter(contributor => contributor.id === contributorId)
  useRedirectIfNoOwners({ ownerData, applicationId, applicationRole });
  useUpdateApplicationProgress('Control and Operations');

  const { data: session } = useSessionUCMS();
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));

  // Redirects user based on application state and permissions
  useWorkflowRedirect({ applicationData, applicationId, hasDelegateRole });

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

      axios.post(ANSWER_ROUTE, [answer])
        .catch(error => {
          if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
            console.error('Error saving answer:', error);
          }
        });
    }
  };

  if (error) {return <div>Error: {error.message}</div>;}
  if (!data || isLoading || !ownerData) {return <Spinner center />}

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
              <h3 className="light margin-bottom-0" style={{ fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5' }}>
          			Please enter the following information about any individual who is on the management team of the company, but is not an owner.
              </h3>
              <h3 className="light margin-top-05" style={{ fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5' }}>
								If this does not apply to your business, please click &quot;Next&quot; to continue.
              </h3>
            </div>
            <div>
              <h2>Management Structure</h2>
              <p>Based on the information provided, {applicationData?.sam_entity.legal_business_name} is designated as a {applicationData?.entity.structure}.</p>
              <p>If this designation is incorrect, please discontinue this application and update your information on <a href="http://sam.gov/">SAM.gov</a></p>
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
                  onRefetchQuestionnaires={()=>{}}
                  userId={userId}
                />
              ))}
            </Grid>
          </>
        }
      />

      <hr className="margin-y-3 margin-bottom-0 width-full border-base-lightest" />

      <ButtonGroup className="display-flex flex-justify padding-y-2 margin-right-2px">
        <Link className="usa-button usa-button--outline" aria-disabled={!applicationId}
          href={
            buildRoute(APPLICATION_STEP_ROUTE, {
              applicationId: applicationId,
              stepLink: applicationSteps.ownership.link
            })
          }
        >
          Previous
        </Link>
        <Link className="usa-button" aria-disabled={!applicationId}
          href={
            buildRoute(APPLICATION_STEP_ROUTE, {
              applicationId: applicationId,
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
