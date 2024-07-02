'use client'
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { fetcherGET } from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { QuestionnaireListType } from '../../components/questionnaire/utils/types';
import { setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';
import getApplicationContributorId from '@/app/shared/utility/getApplicationContributorId';
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId';
import getApplicationId from '@/app/shared/utility/getApplicationId';
import QuestionnaireTemp from './QuestionnaireTemp';

interface QuestionnairePageProps {
  index: number;
}

function QuestionnairePage({ index }: QuestionnairePageProps) {
  const dispatch = useApplicationDispatch();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(index - 1);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState('');
  const [applicationId, setApplicationId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchApplicationId = async () => {
      if (userId) {
        const entityData = await getEntityByUserId(userId);
        if (!entityData || entityData.length === 0) {
          throw new Error('Entity data not found');
        }

        const applicationData = await getApplicationId(entityData[0].id);
        if (!applicationData || applicationData.length === 0) {
          throw new Error('Application data not found');
        }

        const appId = await getApplicationContributorId(applicationData[0].id);
        // For testing
        // const appId = await getApplicationContributorId(1);
        if (appId && appId.length > 0) {
          // console.log(appId[0].id);
          setApplicationId(appId[appId.length - 1].id);
        }
      }
    };

    fetchApplicationId();
  }, [userId]);

  const { data: questionnairesData, error } = useSWR(
    applicationId ? `${QUESTIONNAIRE_LIST_ROUTE}/${applicationId}` : null,
    fetcherGET<QuestionnaireListType>
  );

  useEffect(() => {
    if (questionnairesData) {
      const lastIndex = questionnairesData.length - 1;
      const safeIndex = currentStep > lastIndex ? lastIndex : currentStep;
      setCurrentQuestionnaire(`${QUESTIONNAIRE_ROUTE}/${questionnairesData[safeIndex].url}`);
    }
  }, [questionnairesData, currentStep]);

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
          <QuestionnaireTemp
            url={currentQuestionnaire}
            title={questionnairesData[Math.min(currentStep, questionnairesData.length - 1)].section}
          />
        }
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        {currentStep === 0 ? (
          <Link className='usa-button usa-button--outline' href={'/application/questionnaires'}>
          	Previous
          </Link>
        ) : (
          <Button type='button' className='usa-button' outline onClick={handlePrevious}>
          	Previous
          </Button>
        )}
        {currentStep >= questionnairesData.length - 1 ? (
          <Link className='usa-button' href={'/application/questionnaire-hubzone-calculator'}>
          	Next
          </Link>
        ) : (
          <Button type='button' className='usa-button' onClick={handleNext}>
          	Next
          </Button>
        )}
      </ButtonGroup>
    </>
  )
}

export default QuestionnairePage
