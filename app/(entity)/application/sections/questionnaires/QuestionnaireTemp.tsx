import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes';
import { AddressInput, BooleanInput, HiddenTextInput, MultiSelectInput, NumberInput, QaDateInput, QaTextInput, QaTextarea, SelectInput } from '@/app/shared/components/questionnaire/inputs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { setDisplayStepNavigation, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';
import QaGrid from '@/app/shared/components/questionnaire/inputs/QaGrid';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import { fetcherGET, fetcherPOST } from '@/app/services/fetcher';
import { ANSWER_ROUTE } from '@/app/constants/routes';
import getApplicationContributorId from '@/app/shared/utility/getApplicationContributorId';
import getApplicationId from '@/app/shared/utility/getApplicationId';
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId';
import { useSession } from 'next-auth/react';
import { Rule } from '@/app/shared/types/questionnaireTypes';

interface QuestionnaireProps {
  url: string;
  title: string;
}

const QuestionnaireTemp = ({ url, title }: QuestionnaireProps) => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  const { data, error } = useSWR(url, fetcherGET<QaQuestionsType>);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const [savedState, setSavedState] = useState(false);
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);

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

  const handleAnswerChange = (question: Question, value: any) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [question.name]: {
        id: question.id,
        profile_answer_flag: question.profile_answer_flag,
        reminder_flag: false,
        application_contributor_id: 0,
        value: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value,
        question_id: question.id,
        answer_by: 0,
      }
    }));
    setSavedState(false);
  };

  const handlePostRequest = async () => {
    try {
      if(applicationId && userId) {
        const postData = Object.values(selectedAnswers).map(answer => ({
          profile_answer_flag: answer.profile_answer_flag,
          application_contributor_id: applicationId,
          value: { answer: answer.value },
          question_id: answer.question_id,
          answer_by: userId,
          reminder_flag: answer.reminder_flag
        }));

        await fetcherPOST(ANSWER_ROUTE, postData);
        setSavedState(true);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const sortedAndFilteredQuestions = data
    .filter(question => question.question_ordinal !== null)
    .sort((q1, q2) => (q1.question_ordinal! - q2.question_ordinal!));

  const renderSubQuestion = (subQuestion: Question, subIndex: number) => {
    const subInputId = `input-${subQuestion.question_type}-${subIndex}`;

    switch (subQuestion.question_type) {
      case 'text':
        return (
          <QaTextInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'textarea':
      case 'text_area':
        return (
          <QaTextarea
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'number':
        return (
          <NumberInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'boolean':
        return (
          <BooleanInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'select':
      case 'api.get_program_eligibility_list.multi_select':
        return (
          <SelectInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'multi_select':
        return (
          subQuestion.answer_choice && 'options' in subQuestion.answer_choice &&
          <MultiSelectInput
            key={subInputId}
            isSubQuestion={true}
            label={subQuestion.title}
            inputId={subInputId}
            options={subQuestion.answer_choice.options.map(option => ({ value: option.option, label: option.option }))}
            handleChange={(selectedOptions) => handleAnswerChange(subQuestion, selectedOptions)}
            selectedOptions={
              (() => {
                const answerValue = selectedAnswers[subQuestion.name]?.value;
                if (Array.isArray(answerValue)) {
                  return answerValue.map(option => ({ value: String(option), label: String(option) }));
                }
                return [];
              })()
            }
          />
        );
      case 'grid':
        return (
          <QaGrid
            key={subIndex}
            question={subQuestion}
          />
        );
      case 'date':
        return (
          <QaDateInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'text_with_asterisks':
        return (
          <HiddenTextInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'address':
        return (
          <AddressInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={(value) => handleAnswerChange(subQuestion, value)}
          />
        );
      case 'document_upload':
        return null;
      default:
        return <div className='padding-left-3' key={subInputId}>Unsupported input type ({subQuestion.question_type})</div>;
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    const inputId = `input-${question.question_type}-${index}`;
    const answer = selectedAnswers[question.name]?.value;

    switch (question.question_type) {
      case 'text':
        return (
          <div key={inputId}>
            <QaTextInput
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'textarea':
      case 'text_area':
        return (
          <div key={inputId}>
            <QaTextarea
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'number':
        return (
          <div key={inputId}>
            <NumberInput
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'boolean':
        return (
          <div key={inputId}>
            <BooleanInput
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                const shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }
                return null;
              })}
            </Grid>
          </div>
        );
      case 'select':
      case 'api.get_program_eligibility_list.multi_select':
        return (
          <div key={inputId}>
            <SelectInput
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'multi_select':
        return (
          question.answer_choice && 'options' in question.answer_choice &&
					<div key={inputId}>
					  <MultiSelectInput
					    label={question.title}
					    inputId={inputId}
					    options={question.answer_choice.options.map(option => ({ value: option.option, label: option.option }))}
					    handleChange={(selectedOptions) => handleAnswerChange(question, selectedOptions)}
					    selectedOptions={
					      (() => {
					        const answerValue = selectedAnswers[question.name]?.value;
					        if (Array.isArray(answerValue)) {
					          return answerValue.map(option => ({ value: String(option), label: String(option) }));
					        }
					        return [];
					      })()
					    }
					  />
					  <Grid row gap='md'>
					    {question.rules?.map((rule: Rule, ruleIndex: number) => {
					      let shouldRenderSubQuestion = false;

					      if (question.question_type === 'boolean' && typeof answer === 'string') {
					        shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
					      } else if (question.question_type === 'text' && typeof answer === 'string') {
					        shouldRenderSubQuestion = answer === rule.answer_given_value.text;
					      } else if (question.question_type === 'number' && typeof answer === 'number') {
					        shouldRenderSubQuestion = answer === rule.answer_given_value.number;
					      } else if (question.question_type === 'select' && typeof answer === 'string') {
					        shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
					      } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
					        shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
					      }

					      if (shouldRenderSubQuestion && rule.sub_question) {
					        if (rule.sub_question.question_type === 'grid') {
					          return (
					            <div key={`sub-${index + ruleIndex}`}>
					              {renderSubQuestion(rule.sub_question, index + ruleIndex)}
					            </div>
					          );
					        } else {
					          return (
					            <Grid col={6} key={`sub-${index + ruleIndex}`}>
					              {renderSubQuestion(rule.sub_question, index + ruleIndex)}
					            </Grid>
					          );
					        }
					      }

					      return null;
					    })}
					  </Grid>
					</div>
        );
      case 'grid':
        return (
          <div key={inputId}>
            <QaGrid
              key={inputId}
              question={question}
            />
          </div>
        );
      case 'date':
        return (
          <div key={inputId}>
            <QaDateInput
              key={inputId}
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'text_with_asterisks':
        return (
          <div key={inputId}>
            <HiddenTextInput
              key={inputId}
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'address':
        return (
          <div key={inputId}>
            <AddressInput
              key={inputId}
              question={question}
              inputId={inputId}
              handleChange={(value) => handleAnswerChange(question, value)}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule: Rule, ruleIndex: number) => {
                let shouldRenderSubQuestion = false;

                if (question.question_type === 'boolean' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
                } else if (question.question_type === 'text' && typeof answer === 'string') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.text;
                } else if (question.question_type === 'number' && typeof answer === 'number') {
                  shouldRenderSubQuestion = answer === rule.answer_given_value.number;
                } else if (question.question_type === 'select' && typeof answer === 'string') {
                  shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                } else if (question.question_type === 'multi_select' && Array.isArray(answer)) {
                  shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
                }

                if (shouldRenderSubQuestion && rule.sub_question) {
                  if (rule.sub_question.question_type === 'grid') {
                    return (
                      <div key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </div>
                    );
                  } else {
                    return (
                      <Grid col={6} key={`sub-${index + ruleIndex}`}>
                        {renderSubQuestion(rule.sub_question, index + ruleIndex)}
                      </Grid>
                    );
                  }
                }

                return null;
              })}
            </Grid>
          </div>
        );
      case 'document_upload':
        return null;
      default:
        return <div key={inputId}>Unsupported input type ({question.question_type})</div>;
    }
  };

  return (
    <>
      <h2>{title}</h2>
      {sortedAndFilteredQuestions.map((question, index) => {
        return renderQuestion(question, index);
      })}
      <ButtonGroup className='flex flex-justify-end margin-right-05'>
        <Button disabled={savedState} onClick={handlePostRequest} type='button'>
					Save
        </Button>
      </ButtonGroup>
    </>
  );
};

export default QuestionnaireTemp;
