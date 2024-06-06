// components/Questionnaires.tsx

import { Card, CardHeader, CardGroup, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { sections } from './utils/helpers';
import { useEffect } from 'react';
import { useApplicationDispatch } from '../../redux/hooks';
import { setStep } from '../../redux/applicationSlice';
import { applicationSteps } from '../../utils/constants';

const Questionnaires = () => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>Please answer the questions about your business or firm in each section below. When all sections are complete, review and sign the application.</h3>
      {sections.map((section, sectionIndex) => (
        <>
          <h2 key={sectionIndex}>{section.sectionName}</h2>
          <CardGroup key={sectionIndex}>
            {section.questions.map((question, questionIndex) => (
              <Card key={questionIndex} className='tablet:grid-col-4'>
                <CardHeader>
                  <div className="usa-card__body">
                    <h3 key={questionIndex}>
                      <Link className='text-primary hover:text-primary-dark' href={question.route}>
                        {question.title}
                      </Link>
                    </h3>
                    <p><b>Status:</b> Not Started</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </CardGroup>
        </>
      ))}
      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={applicationSteps.controlAndOwnership.link}>
          Previous
        </Link>
        <Link className='usa-button' href='/application/questionnaire-individual'>
					Next
        </Link>
      </ButtonGroup>
    </>
  );
};

export default Questionnaires;
