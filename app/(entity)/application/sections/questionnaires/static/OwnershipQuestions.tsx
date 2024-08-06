'use client'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ANSWER_ROUTE, ELIGIBLE_APPLY_PROGRAMS_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import fetcher from '@/app/services/fetcher';
import { fetcherPOST, fetcherPUT } from '@/app/services/fetcher-legacy';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { calculateEligibleSbaPrograms, useOwnerApplicationInfo } from '../../../hooks/useOwnershipApplicationInfo';
import QuestionRenderer from '../../../qa-helpers/QuestionRenderer';
import { selectApplication, setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../../redux/hooks';
import { applicationSteps } from '../../../utils/constants';
import { QuestionnaireProps } from '../../../utils/types';

function OwnershipQuestions({contributorId}: QuestionnaireProps) {
  const params = useParams<{application_id: string}>();
  const dispatch = useApplicationDispatch();
  const { owners } = useApplicationSelector(selectApplication);
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const { userId } = useApplicationId();
  const url = contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/owner-and-management` : '';
  const { data, error, isLoading } = useSWR<QaQuestionsType>(url, fetcher);
  const { ownerApplicationInfo } = useOwnerApplicationInfo();
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(setStep(applicationSteps.ownership.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  }, [dispatch]);

  useEffect(() => {
    if (ownerApplicationInfo.owners && ownerApplicationInfo.owners.length > 0) {
      const programs = calculateEligibleSbaPrograms(ownerApplicationInfo.owners);
      setEligiblePrograms(programs);
    }
  }, [ownerApplicationInfo.owners]);

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

  const totalPercentage = owners.reduce((sum, owner) => sum + parseInt(owner.ownershipPercent), 0);

  const handleSubmit = async () => {
    if (Math.abs(totalPercentage - 100) < 0.01) {
      setIsSubmitting(true);
      try {
        const postData = {
          application_id: userId,
          programs: eligiblePrograms.map(program => program.id)
        };

        await fetcherPUT(`${ELIGIBLE_APPLY_PROGRAMS_ROUTE}`, postData);
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          contributorId: contributorId,
          stepLink: applicationSteps.controlAndOwnership.link
        });
      } catch (error) {
        console.error('Error submitting data:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error('Total ownership must be 100%. Current total:', totalPercentage);
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
              <h1>Ownership</h1>
              <h3 className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>
								We will now collect information for the owners of the business. We use this information to determine eligibility for our various programs, so please be as complete as possible.
              </h3>
            </div>
            <div>
      			<h2>Business Structure</h2>
              <p>Based on the information provided by SAM, {applicationData?.sam_entity.legal_business_name} is designated as a Partnership.</p>
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
                  onRefetchQuestionnaires={()=>{}}
                  userId={userId}
                />
              ))}
            </Grid>
          </>
        }
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={ buildRoute(APPLICATION_STEP_ROUTE, {
          contributorId: contributorId,
          stepLink: applicationSteps.entityOwned.link
        })}>
          Previous
        </Link>

        <Button
          type='button'
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </Button>
      </ButtonGroup>
    </>
  );
}
export default OwnershipQuestions
