'use client'
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import { APPLICATION_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { fetcherGET, fetcherPUT } from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { QuestionnaireListType } from '../../components/questionnaire/utils/types';
import { setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';
import { QuestionnaireProps } from '../../utils/types';
import Questions from '../../qa-helpers/Questions';

interface QuestionnairePageProps extends QuestionnaireProps {
  index: number;
}

function QuestionnairePage({ index, contributorId, applicationId }: QuestionnairePageProps) {
  const dispatch = useApplicationDispatch();
  const [currentStep, setCurrentStep] = useState(index - 1);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState('');

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: questionnairesData, error } = useSWR(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
    fetcherGET<QuestionnaireListType>
  );

  useEffect(() => {
    const updateProgress = async () => {
      try {
        if (applicationId && questionnairesData) {
          const postData = {
            application_id: applicationId,
            progress: questionnairesData[Math.min(currentStep, questionnairesData.length - 1)].title
          };
          // For testing
          // const response = await fetcherPUT(APPLICATION_ROUTE, postData);
          // console.log(response);

          await fetcherPUT(APPLICATION_ROUTE, postData);
        } else {
          const customError = 'Application ID or user ID not found';
          throw customError;
        }
      } catch (error) {
        console.log('API error occurred');
      }
    };
    if (questionnairesData) {
      const lastIndex = questionnairesData.length - 1;
      const safeIndex = currentStep > lastIndex ? lastIndex : currentStep;
      setCurrentQuestionnaire(`${QUESTIONNAIRE_ROUTE}/${questionnairesData[safeIndex].url}`);
      updateProgress();
    }
  }, [questionnairesData, currentStep, applicationId]);

  if(error) {
    return <div>Error: {error.message}</div>;
  }

  if(!questionnairesData) {
    return <h1>Loading...</h1>
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questionnairesData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <QAWrapper
        fill
        mainContent={
          <Questions
            url={currentQuestionnaire}
            title={questionnairesData[Math.min(currentStep, questionnairesData.length - 1)].title}
          />
        }
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        {currentStep === 0 ? (
          <Link className='usa-button usa-button--outline' aria-disabled={!contributorId} href={`/application/questionnaire/${contributorId}/list`}>
          	Previous
          </Link>
        ) : (
          <Button type='button' className='usa-button' aria-disabled={!contributorId} outline onClick={handlePrevious}>
          	Previous
          </Button>
        )}
        {currentStep >= questionnairesData.length - 1 ? (
          <Link className='usa-button'
            aria-disabled={!contributorId}
            href={`/application/questionnaire/${contributorId}/hubzone-calculator`}>
          	Next
          </Link>
        ) : (
          <Button type='button' className='usa-button' aria-disabled={!contributorId} onClick={handleNext}>
          	Next
          </Button>
        )}
      </ButtonGroup>
    </>
  )
}

export default QuestionnairePage
