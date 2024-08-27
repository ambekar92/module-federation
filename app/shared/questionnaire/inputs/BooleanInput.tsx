import React from 'react';
import { Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const BooleanInput = ({ question, ordinalLabel, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  // Adjusting handling for null values explicitly
  const currentValue = !isGridQuestion ? selectedAnswers[question.name]?.value ?? question.answer?.value?.answer : null;

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(question, e.target.value);
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className={`maxw-full ${ordinalLabel ? 'margin-top-0' : 'text-bold'} display-flex`} requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {ordinalLabel && `${question.question_ordinal}. `}<span className={`${ordinalLabel && 'padding-left-1'}`}>{question.title}</span>
      </Label>
      <div style={{backgroundColor: 'transparent'}} className={`usa-radio display-flex gap-1 ${ordinalLabel && 'margin-left-3'}`}>
        <input
          className="usa-radio__input"
          id={`${question.name}-true`}
          type="radio"
          value="TRUE"
          name={question.name}
          checked={currentValue === 'TRUE'}
          onChange={handleRadioChange}
        />
        <Label className="usa-radio__label" htmlFor={`${question.name}-true`}>
          Yes
        </Label>
        <input
          className="usa-radio__input"
          id={`${question.name}-false`}
          type="radio"
          value="FALSE"
          name={question.name}
          checked={currentValue === 'FALSE'}
          onChange={handleRadioChange}
        />
        <Label className="usa-radio__label margin-left-105" htmlFor={`${question.name}-false`}>
          No
        </Label>
      </div>
    </div>
  );
};
