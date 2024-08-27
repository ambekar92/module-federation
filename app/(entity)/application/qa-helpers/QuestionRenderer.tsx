'use client'
import {
  AddressInput,
  BooleanInput,
  HiddenTextInput,
  MultiSelectInput,
  NumberInput,
  QaDateInput,
  QaGrid,
  QaTextarea,
  QaTextInput,
  ReadOnly,
  SelectInput
} from '@/app/shared/questionnaire/inputs';
import ApiGetUrlInput from '@/app/shared/questionnaire/inputs/ApiGetUrl';
import { isUrlAnswerChoice } from '@/app/shared/questionnaire/questionnaireHelpers';
import { Answer, Question, Rule } from '@/app/shared/types/questionnaireTypes';
import { Grid, ModalRef } from '@trussworks/react-uswds';
import React, { useEffect, useRef } from 'react';
import { OperatorsQaGrid } from './OperatorsQaGrid';

interface QuestionRendererProps {
  question: Question;
  index: number;
  selectedAnswers: Record<string, Answer>;
  handleAnswerChange: (q: any, selectedOpt: any) => void;
  isSubQuestion?: boolean;
  userId: number | null;
  contributorId: number | null | undefined;
  onRefetchQuestionnaires: () => void;
  closeApplicationRef?: React.RefObject<ModalRef>;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  index,
  selectedAnswers,
  handleAnswerChange,
  isSubQuestion = false,
  userId,
  contributorId,
  onRefetchQuestionnaires,
  closeApplicationRef
}) => {
  const inputId = `input-${question.question_type}-${index}`;
  const answer = selectedAnswers[question.name]?.value ?? question.answer?.value?.answer;
  const hasRefetched = useRef(false);

  useEffect(() => {
    if (question.question_type === 'api.get.questionnaire' && !hasRefetched.current) {
      onRefetchQuestionnaires();
      hasRefetched.current = true;
    }
  }, [question.question_type, onRefetchQuestionnaires]);

  if(!contributorId) {return}

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
          question.name === 'legal_management_team_control_and_operation_partnership' || question.name === 'legal_management_team_control_and_operation_llc' || question.name === 'legal_management_team_control_and_operation_corporation' || question.name === 'legal_management_team_control_and_operation_sole_proprietorship'
            ? <OperatorsQaGrid contributorId={contributorId} userId={userId} question={question} isSubQuestion={isSubQuestion} />
            : <QaGrid contributorId={contributorId} userId={userId} question={question} isSubQuestion={isSubQuestion} />
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
      case 'api.get.questionnaire':
        return null;
      case 'api.get.url':
        if (isUrlAnswerChoice(question.answer_choice)) {
          return (
            <ApiGetUrlInput
              question={question}
              inputId={inputId}
              handleChange={handleAnswerChange}
              selectedAnswers={selectedAnswers}
              isSubQuestion={isSubQuestion}
              contributorId={contributorId}
              onRefetchQuestionnaires={onRefetchQuestionnaires}
            />
          );
        } else {
          console.error('Invalid answer_choice for api.get.url question type');
          return null;
        }
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
                shouldRenderSubQuestion =
                  answer === rule.answer_given_value[question.question_type] as any ||
                  rule.answer_given_value[question.question_type] === null;
                break;
            }
          }

          if (shouldRenderSubQuestion && rule.sub_question) {
            return (
              <Grid col={12} key={`sub-${index}-${ruleIndex}`}>
                <QuestionRenderer
                  contributorId={contributorId}
                  userId={userId}
                  question={rule.sub_question}
                  index={index * 1000 + ruleIndex}
                  selectedAnswers={selectedAnswers}
                  handleAnswerChange={handleAnswerChange}
                  isSubQuestion={true}
                  onRefetchQuestionnaires={onRefetchQuestionnaires}
                  closeApplicationRef={closeApplicationRef}
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
