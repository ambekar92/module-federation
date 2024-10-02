import React, { useEffect, useRef } from 'react';
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
import { Grid, Label, ModalRef } from '@trussworks/react-uswds';

interface FirmQuestionRendererProps {
  question: Question;
  index: number;
  selectedAnswers: Record<string, Answer>;
  handleAnswerChange: (question: Question, value: any) => void;
  isSubQuestion?: boolean;
  userId: number | null;
  contributorId: number | null | undefined;
	userName: string | null | undefined;
  onRefetchQuestionnaires: () => void;
  closeApplicationRef?: React.RefObject<ModalRef>;
  reviewerQuestion?: Question;
  isReviewer?: boolean;
}

const FirmQuestionRenderer: React.FC<FirmQuestionRendererProps> = ({
  question,
  index,
  selectedAnswers,
  handleAnswerChange,
  isSubQuestion = false,
  userId,
  contributorId,
  userName,
  onRefetchQuestionnaires,
  closeApplicationRef,
  reviewerQuestion,
  isReviewer = false
}) => {
  const inputId = `input-${question.question_type}-${index}`;
  const questionName = isReviewer ? `reviewer-${question.name}` : question.name;
  const answer = selectedAnswers[questionName]?.value ?? question.answer?.value?.answer;
  const hasRefetched = useRef(false);

  useEffect(() => {
    if (question.question_type === 'api.get.questionnaire' && !hasRefetched.current) {
      onRefetchQuestionnaires();
      hasRefetched.current = true;
    }
  }, [question.question_type, onRefetchQuestionnaires]);

  if(!contributorId) {return null;}

  const renderInput = () => {
    const modifiedQuestion = isReviewer ? { ...question, name: questionName } : question;

    switch (modifiedQuestion.question_type) {
      case 'text':
        return (
          <QaTextInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'read_only':
        return (
          <ReadOnly
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'textarea':
      case 'text_area':
        return (
          <QaTextarea
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'number':
        return (
          <NumberInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'boolean':
        return (
          <BooleanInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'select':
      case 'api.get_program_eligibility_list.multi_select':
        return (
          <SelectInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'multi_select':
        return (
          modifiedQuestion.answer_choice && 'options' in modifiedQuestion.answer_choice &&
          <MultiSelectInput
            question={modifiedQuestion}
            inputId={inputId}
            options={modifiedQuestion.answer_choice.options.map(option => ({ value: option.option, label: option.option }))}
            handleChange={(selectedOptions) => handleAnswerChange(modifiedQuestion, selectedOptions)}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'grid':
        return (
          <QaGrid contributorId={contributorId} userId={userId} question={modifiedQuestion} isSubQuestion={false} />
        );
      case 'date':
        return (
          <QaDateInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'text_with_asterisks':
        return (
          <HiddenTextInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'address':
        return (
          <AddressInput
            question={modifiedQuestion}
            inputId={inputId}
            handleChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            isSubQuestion={false}
            ordinalLabel={!isSubQuestion}
          />
        );
      case 'api.get.questionnaire':
        return null;
      case 'api.get.url':
        if (isUrlAnswerChoice(question.answer_choice)) {
          return (
            <ApiGetUrlInput
              question={modifiedQuestion}
              inputId={inputId}
              handleChange={handleAnswerChange}
              selectedAnswers={selectedAnswers}
              isSubQuestion={false}
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

  const renderReviewerQuestion = () => {
    if (!reviewerQuestion) {return null;}

    const internalCommentsRule = reviewerQuestion.rules?.find(rule =>
      rule.sub_question?.name.includes('internal_comments')
    );

    if (!internalCommentsRule || !internalCommentsRule.sub_question) {return null;}

    if (
      (reviewerQuestion.rules[0].answer_given_value as any)[reviewerQuestion.question_type] === null &&
			(internalCommentsRule.sub_question.answer?.value === null ||
			 internalCommentsRule.sub_question.answer?.value?.answer === null ||
			 internalCommentsRule.sub_question.answer?.value?.answer === ''
			)
    ) {
      return null;
    }

    const currentValue = selectedAnswers[internalCommentsRule.sub_question.name]?.value !== undefined
      ? selectedAnswers[internalCommentsRule.sub_question.name].value
      : internalCommentsRule.sub_question.answer?.value?.answer || '';

    return (
      <Grid col={12} className='margin-top-4'>
        <div className='display-flex align-items-center margin-bottom-1' style={{ width: '100%' }}>
          <span style={{fontSize: '12px'}} className="text-base-dark flex-shrink-0 margin-right-1">Review 1 Comments</span>
          <div style={{
            flexGrow: 1,
            height: '1px',
            backgroundColor: '#A9AEB1',
            marginTop: '6.9px'
          }}></div>
        </div>
        <div style={{borderColor: '#DFE1E2'}} className={'padding-y-105 padding-x-3 border'}>
          <Label className={'maxw-full margin-0 text-base-dark'} requiredMarker={question.answer_required_flag} htmlFor={question.name}>
            {userName}
          </Label>
          <p className='margin-bottom-0'>
            {`${currentValue}`}
          </p>
        </div>
      </Grid>
    );
  };

  const renderSubQuestions = () => {
    return (
      <Grid row gap='md'>
        {renderReviewerQuestion()}
        {question.rules?.map((rule: Rule, ruleIndex: number) => {
          let shouldRenderSubQuestion = false;

          if (rule.answer_given_value['boolean'] === null) {
            shouldRenderSubQuestion = true;
          } else if (Array.isArray(answer) && question.question_type === 'multi_select') {
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
              <Grid col={12} className='margin-top-1' key={`sub-${index}-${ruleIndex}`}>
                <FirmQuestionRenderer
                  contributorId={contributorId}
                  userId={userId}
                  userName={userName}
                  question={rule.sub_question}
                  index={index * 5000 + ruleIndex}
                  selectedAnswers={selectedAnswers}
                  handleAnswerChange={handleAnswerChange}
                  isSubQuestion={true}
                  onRefetchQuestionnaires={onRefetchQuestionnaires}
                  closeApplicationRef={closeApplicationRef}
                  reviewerQuestion={isReviewer ? rule.sub_question : undefined}
                  isReviewer={isReviewer}
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
    <div className='bg-white padding-x-2 padding-y-105 margin-bottom-2 radius-md'>
      {renderInput()}
      {renderSubQuestions()}
    </div>
  );
};

export default FirmQuestionRenderer;
