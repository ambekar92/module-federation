import { QaQuestionsType, Question, qaFetcherGET } from '@/app/services/qa-fetcher';
import { BooleanInput, MultiSelectInput, NumberInput, QaTextInput, QaTextarea, SelectInput } from '@/app/shared/components/questionnaire/inputs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { setDisplayStepNavigation, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';
import GridQuestion from './GridQuestion';
import { Grid } from '@trussworks/react-uswds';

interface QuestionnaireProps {
  url: string;
  title: string;
}

const Questionnaire = ({ url, title }: QuestionnaireProps) => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  const { data, error } = useSWR<QaQuestionsType>(url, qaFetcherGET);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: any }>({});

  const handleAnswerChange = (questionName: string, value: any) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionName]: value
    }));
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
            handleChange={handleAnswerChange}
          />
        );
      case 'textarea':
        return (
          <QaTextarea
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={handleAnswerChange}
          />
        );
      case 'number':
        return (
          <NumberInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={handleAnswerChange}
          />
        );
      case 'boolean':
        return (
          <BooleanInput
            key={subInputId}
            isSubQuestion={true}
            question={subQuestion}
            inputId={subInputId}
            handleChange={handleAnswerChange}
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
            handleChange={handleAnswerChange}
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
            handleChange={(selectedOptions) => handleAnswerChange(subQuestion.name, selectedOptions)}
            selectedOptions={selectedAnswers[subQuestion.name] || []}
          />
        );
      case 'grid':
        return (
          <GridQuestion
            key={subIndex}
            question={subQuestion}
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
    const answer = selectedAnswers[question.name];

    switch (question.question_type) {
      case 'text':
        return (
          <div key={inputId}>
            <QaTextInput
              question={question}
              inputId={inputId}
              handleChange={handleAnswerChange}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule, ruleIndex) => {
                const shouldRenderSubQuestion = answer === rule.answer_given_value.text;
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
        return (
          <div key={inputId}>
            <QaTextarea
              question={question}
              inputId={inputId}
              handleChange={handleAnswerChange}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule, ruleIndex) => {
                const shouldRenderSubQuestion = answer === rule.answer_given_value.text;
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
              handleChange={handleAnswerChange}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule, ruleIndex) => {
                const shouldRenderSubQuestion = answer === rule.answer_given_value.number;
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
              handleChange={handleAnswerChange}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule, ruleIndex) => {
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
              handleChange={handleAnswerChange}
            />
            <Grid row gap='md'>
              {question.rules?.map((rule, ruleIndex) => {
                const shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
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
					    handleChange={(selectedOptions) => handleAnswerChange(question.name, selectedOptions)}
					    selectedOptions={selectedAnswers[question.name] || []}
					  />
					  <Grid row gap='md'>
					    {question.rules?.map((rule, ruleIndex) => {
					      const shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
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
            <GridQuestion
              key={inputId}
              question={question}
            />
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
    </>
  );
};

export default Questionnaire;
