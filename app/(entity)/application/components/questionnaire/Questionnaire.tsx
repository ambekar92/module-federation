import { QaQuestionsType, Question, qaFetcherGET } from '@/app/services/qa-fetcher';
import { Label, Select, TextInput } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { setDisplayStepNavigation, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';
import GridQuestion from './GridQuestion';

interface QuestionnaireProps {
  url: string;
  title: string;
}

const Questionnaire = ({ url, title }: QuestionnaireProps) => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setStep(3));
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
          <div className='padding-left-3' key={subInputId}>
            <Label requiredMarker={subQuestion.answer_required_flag} htmlFor={subInputId}>
              <span className='text-bold'>{subQuestion.title}</span>
            </Label>
            <TextInput type='text' id={subInputId} name={subQuestion.name} onChange={(e) => handleAnswerChange(subQuestion.name, e.target.value)} />
          </div>
        );
      case 'number':
        return (
          <div className='padding-left-3' key={subInputId}>
            <Label requiredMarker={subQuestion.answer_required_flag} htmlFor={subInputId}>
              <span className='text-bold'>{subQuestion.title}</span>
            </Label>
            <TextInput type='number' id={subInputId} name={subQuestion.name} onChange={(e) => handleAnswerChange(subQuestion.name, e.target.value)} />
          </div>
        );
      case 'boolean':
        return (
          <div className='padding-left-3' key={subInputId}>
            <Label requiredMarker={subQuestion.answer_required_flag} htmlFor={subInputId}>
              <span className='text-bold'>{subQuestion.title}</span>
            </Label>
            <div className='usa-radio display-flex gap-1'>
              <input
                className="usa-radio__input"
                id={`${subInputId}-true`}
                type="radio"
                value="true"
                name={subQuestion.name}
                onChange={() => handleAnswerChange(subQuestion.name, 'TRUE')}
              />
              <Label className="usa-radio__label" htmlFor={`${subInputId}-true`}>
									Yes
              </Label>
              <input
                className="usa-radio__input"
                id={`${subInputId}-false`}
                type="radio"
                value="false"
                name={subQuestion.name}
                onChange={() => handleAnswerChange(subQuestion.name, 'FALSE')}
              />
              <Label className="usa-radio__label margin-left-105" htmlFor={`${subInputId}-false`}>
									No
              </Label>
            </div>
          </div>
        );
      case 'select':
      case 'api.get_program_eligibility_list.multi_select':
        if (subQuestion.answer_choice && 'options' in subQuestion.answer_choice) {
          return (
            <div className='padding-left-3' key={subInputId}>
              <Label requiredMarker={subQuestion.answer_required_flag} htmlFor={subInputId}>
                <span className='text-bold'>{subQuestion.title}</span>
              </Label>
              <Select className='height-7 radius-lg' id={subInputId} name={subQuestion.name} onChange={(e) => handleAnswerChange(subQuestion.name, e.target.value)}>
                <option>- Select -</option>
                {subQuestion.answer_choice.options.map((option, idx) => (
                  <option key={idx} value={option.option}>
                    {option.option}
                  </option>
                ))}
              </Select>
            </div>
          );
        }
        return null;
      case 'multi_select':
        if (subQuestion.answer_choice && 'options' in subQuestion.answer_choice) {
          return (
            <div className='padding-left-3' key={subInputId}>
              <Label requiredMarker={subQuestion.answer_required_flag} htmlFor={subInputId}>
                <span className='text-bold'>{subQuestion.title}</span>
              </Label>
              <Select className='height-full radius-lg' id={subInputId} name={subQuestion.name} multiple onChange={(e) => handleAnswerChange(subQuestion.name, Array.from(e.target.selectedOptions, option => option.value))}>
                <option>- Select -</option>
                {subQuestion.answer_choice.options.map((option, idx) => (
                  <option key={idx} value={option.option}>
                    {option.option}
                  </option>
                ))}
              </Select>
            </div>
          );
        }
        return null;
      case 'grid':
        return (
          <GridQuestion
            key={subIndex}
            question={subQuestion}
          />
        );
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
            <Label requiredMarker={question.answer_required_flag} htmlFor={inputId}>
              <span className='text-bold'>{question.title}</span>
            </Label>
            <TextInput type='text' id={inputId} name={question.name} onChange={(e) => handleAnswerChange(question.name, e.target.value)} />
            {question.rules?.map((rule, ruleIndex) => {
              const shouldRenderSubQuestion = answer === rule.answer_given_value.text;
              if (shouldRenderSubQuestion && rule.sub_question) {
                return renderSubQuestion(rule.sub_question, index + ruleIndex);
              }
              return null;
            })}
          </div>
        );
      case 'number':
        return (
          <div key={inputId}>
            <Label requiredMarker={question.answer_required_flag} htmlFor={inputId}>
              <span className='text-bold'>{question.title}</span>
            </Label>
            <TextInput type='number' id={inputId} name={question.name} onChange={(e) => handleAnswerChange(question.name, e.target.value)} />
            {question.rules?.map((rule, ruleIndex) => {
              const shouldRenderSubQuestion = answer === rule.answer_given_value.number;
              if (shouldRenderSubQuestion && rule.sub_question) {
                return renderSubQuestion(rule.sub_question, index + ruleIndex);
              }
              return null;
            })}
          </div>
        );
      case 'boolean':
        return (
          <div key={inputId}>
            <Label requiredMarker={question.answer_required_flag} htmlFor={inputId}>
              <span className='text-bold'>{question.title}</span>
            </Label>
            <div className='usa-radio display-flex gap-1'>
              <input
                className="usa-radio__input"
                id={`${inputId}-true`}
                type="radio"
                value="true"
                name={question.name}
                onChange={() => handleAnswerChange(question.name, 'TRUE')}
              />
              <Label className="usa-radio__label" htmlFor={`${inputId}-true`}>
                Yes
              </Label>
              <input
                className="usa-radio__input"
                id={`${inputId}-false`}
                type="radio"
                value="false"
                name={question.name}
                onChange={() => handleAnswerChange(question.name, 'FALSE')}
              />
              <Label className="usa-radio__label margin-left-105" htmlFor={`${inputId}-false`}>
                No
              </Label>
            </div>
            {question.rules?.map((rule, ruleIndex) => {
              const shouldRenderSubQuestion = answer === rule.answer_given_value.boolean;
              if (shouldRenderSubQuestion && rule.sub_question) {
                return renderSubQuestion(rule.sub_question, index + ruleIndex);
              }
              return null;
            })}
          </div>
        );
      case 'document_upload':
        return null;
      case 'select':
      case 'api.get_program_eligibility_list.multi_select':
        if (question.answer_choice && 'options' in question.answer_choice) {
          return (
            <div key={inputId}>
              <Label requiredMarker={question.answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.title}</span></Label>
              <Select className='height-7 radius-lg' id={inputId} name={question.name} onChange={(e) => handleAnswerChange(question.name, e.target.value)}>
                <option>- Select -</option>
                {question.answer_choice.options.map((option, idx) => (
                  <option key={idx} value={option.option}>
                    {option.option}
                  </option>
                ))}
              </Select>
              {question.rules?.map((rule, ruleIndex) => {
                const shouldRenderSubQuestion = rule.answer_given_value.select?.includes(answer);
                if (shouldRenderSubQuestion && rule.sub_question) {
                  return renderSubQuestion(rule.sub_question, index + ruleIndex);
                }
                return null;
              })}
            </div>
          );
        }
        return null;
      case 'multi_select':
        if (question.answer_choice && 'options' in question.answer_choice) {
          return (
            <div key={inputId}>
              <Label requiredMarker={question.answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.title}</span></Label>
              <Select className='height-full radius-lg' id={inputId} name={question.name} multiple onChange={(e) => handleAnswerChange(question.name, Array.from(e.target.selectedOptions, option => option.value))}>
                <option>- Select -</option>
                {question.answer_choice.options.map((option, idx) => (
                  <option key={idx} value={option.option}>
                    {option.option}
                  </option>
                ))}
              </Select>
              {question.rules?.map((rule, ruleIndex) => {
                const shouldRenderSubQuestion = rule.answer_given_value.select?.some(val => answer.includes(val));
                if (shouldRenderSubQuestion && rule.sub_question) {
                  return renderSubQuestion(rule.sub_question, index + ruleIndex);
                }
                return null;
              })}
            </div>
          );
        }
        return null;
      case 'grid':
        return (
          <div key={inputId}>
            <Label requiredMarker={question.answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.title}</span></Label>
            <GridQuestion
              key={inputId}
              question={question}
            />
          </div>
        );
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
