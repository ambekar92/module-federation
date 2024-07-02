// components/Questionnaires.tsx

import { Card, CardHeader, CardGroup, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useApplicationDispatch } from '../../redux/hooks';
import { setStep, setTotalQuestionnaires } from '../../redux/applicationSlice';
import { applicationSteps } from '../../utils/constants';
import { useSession } from 'next-auth/react';
import { fetcherGET } from '@/app/services/fetcher';
import { QuestionnaireListType } from './utils/types';
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import useSWR from 'swr';
import getApplicationContributorId from '@/app/shared/utility/getApplicationContributorId';
import getApplicationId from '@/app/shared/utility/getApplicationId';
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId';

const Questionnaires = () => {
  const dispatch = useApplicationDispatch();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  }, [dispatch]);

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

  const updateTotalQuestionnaires = useCallback(() => {
    if (questionnairesData) {
      dispatch(setTotalQuestionnaires(questionnairesData.length));
    }
  }, [questionnairesData, dispatch]);

  useEffect(() => {
    updateTotalQuestionnaires();
  }, [updateTotalQuestionnaires]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questionnairesData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h3>Please answer the questions about your business or firm in each section below. When all sections are complete, review and sign the application.</h3>

      <>
        <CardGroup>
          {questionnairesData.map((questionnaire, questionIndex) => (
            <Card key={questionIndex} className='tablet:grid-col-4'>
              <CardHeader>
                <div className="usa-card__body">
                  <h3 key={questionIndex}>
                    <Link className='text-primary hover:text-primary-dark' href={`/application/questionnaire?index=${questionIndex + 1}`}>
                      {questionnaire.title}
                    </Link>
                  </h3>
                  <p><b>Status:</b> {questionnaire.status}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
          <Card className='tablet:grid-col-4'>
            <CardHeader>
              <div className="usa-card__body">
                <h3>
                  <Link className='text-primary hover:text-primary-dark' href={'/application/questionnaire-hubzone-calculator'}>
                      HUBZone Calculator
                  </Link>
                </h3>
                <p><b>Status:</b> Not Started</p>
              </div>
            </CardHeader>
          </Card>
        </CardGroup>
      </>
      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={applicationSteps.controlAndOwnership.link}>
          Previous
        </Link>
        <Link className='usa-button' href='/application/questionnaire'>
          Next
        </Link>
      </ButtonGroup>
    </>
  );
};

export default Questionnaires;
