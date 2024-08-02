import React, { useState } from 'react';
import { CharacterCount, Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaTextarea: React.FC<QaInputProps> = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }) => {
  const initialValue = !isGridQuestion && selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  const [localValue, setLocalValue] = useState(initialValue);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    handleChange(question, e.target.value);
  };

  const handleLocalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        <span>{question.title}</span>
      </Label>
      <CharacterCount
        id={question.name}
        name={question.name}
        maxLength={1000}
        isTextArea
        rows={2}
        value={typeof localValue === 'string' ? localValue : ''}
        aria-describedby={`${inputId}-info ${inputId}-hint`}
        onChange={handleLocalChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
