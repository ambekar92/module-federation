import React from 'react';
import { CharacterCount, Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaTextarea: React.FC<QaInputProps> = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }) => {
  const currentValue = !isGridQuestion && selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        <span>{question.title}</span>
      </Label>
      <CharacterCount
        id={inputId}
        name={question.name}
        maxLength={1000}
        isTextArea
        rows={2}
        value={typeof currentValue === 'string' ? currentValue : ''}
        aria-describedby={`${inputId}-info ${inputId}-hint`}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(question, e.target.value)}
      />
    </div>
  );
};
