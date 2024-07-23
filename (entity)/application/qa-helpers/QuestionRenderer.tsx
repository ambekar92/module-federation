import React from 'react';
import { Question, Rule, Answer } from '@/app/shared/types/questionnaireTypes';
import { Grid } from '@trussworks/react-uswds';
import {
  QaTextInput,
  ReadOnly,
  QaTextarea,
  NumberInput,
  BooleanInput,
  SelectInput,
  MultiSelectInput,
  QaGrid,
  QaDateInput,
  HiddenTextInput,
  AddressInput
} from '@/app/shared/questionnaire/inputs';

interface QuestionRendererProps {
  question: Question;
  index: number;
  selectedAnswers: Record<string, Answer>;
  // eslint-disable-next-line no-unused-vars
  handleAnswerChange: (question: Question, value: any) => void;
  isSubQuestion?: boolean;
	userId: number | null;
	contributorId: number;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  index,
  selectedAnswers,
  handleAnswerChange,
  isSubQuestion = false,
  userId, contributorId
}) => {
  const inputId = `input-${question.question_type}-${index}`;
  const answer = selectedAnswers[question.name]?.value ?? question.answer?.value?.answer;

  const renderInput = () => {
    switch (question.question_type) {
      case 'text':
        return (
          <QaTextInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'read_only':
        return (
          <ReadOnly
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'textarea':
      case 'text_area':
        return (
          <QaTextarea
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'number':
        return (
          <NumberInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'boolean':
        return (
          <BooleanInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'select':
      case 'api.get_program_eligibility_list.multi_select':
        return (
          <SelectInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'multi_select':
        return (
          question.answer_choice && 'options' in question.answer_choice &&
          <MultiSelectInput
            question={question}
            inputId={inputId}
            options={question.answer_choice.options.map(option => ({ value: option.option, label: option.option }))}
            handleChange={(selectedOptions) => handleAnswerChange(question, selectedOptions)}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'grid':
        return (
          <QaGrid contributorId={contributorId} userId={userId} question={question} isSubQuestion={isSubQuestion} />
        );
      case 'date':
        return (
          <QaDateInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'text_with_asterisks':
        return (
          <HiddenTextInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'address':
        return (
          <AddressInput
            question={question}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={isSubQuestion}
          />
        );
      case 'document_upload':
        return null;
      default:
        return <div>Unsupported input type ({question.question_type})</div>;
    }
  };

  const renderSubQuestions = () => {
    return (
      <Grid row gap='md'>
        {question.rules?.map((rule: Rule, ruleIndex: number) => {
          let shouldRenderSubQuestion = false;

          if (Array.isArray(answer) && question.question_type === 'multi_select') {
            shouldRenderSubQuestion = answer.some(item => rule.answer_given_value.multi_select?.includes(item));
          } else {
            switch (question.question_type) {
              case 'boolean':
              case 'text':
              case 'number':
              case 'select':
                shouldRenderSubQuestion = answer === rule.answer_given_value[question.question_type] as any;
                break;
            }
          }

          if (shouldRenderSubQuestion && rule.sub_question) {
            return (
              <Grid col={rule.sub_question.question_type !== 'grid' ? 6 : undefined} key={`sub-${index}-${ruleIndex}`}>
                <QuestionRenderer
                  contributorId={contributorId} userId={userId}
                  question={rule.sub_question}
                  index={index * 1000 + ruleIndex}  // Ensure unique index
                  selectedAnswers={selectedAnswers}
                  handleAnswerChange={handleAnswerChange}
                  isSubQuestion={true}
                />
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
    );
  };

  return (
    <div>
      {renderInput()}
      {renderSubQuestions()}
    </div>
  );
};

export default QuestionRenderer;
