import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import { fetcherGET } from '@/app/services/fetcher';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { ButtonGroup, Card, CardGroup, CardHeader } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { setStep, setTotalQuestionnaires } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';
import { QuestionnaireListType } from './utils/types';

const Questionnaires = () => {
  const dispatch = useApplicationDispatch();
  const { contributorId } = useApplicationId();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  }, [dispatch]);

  const { data: questionnairesData, error } = useSWR(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
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
