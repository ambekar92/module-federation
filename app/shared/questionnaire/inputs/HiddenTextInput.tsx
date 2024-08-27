'use client'
import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';
import { useState } from 'react';

export const HiddenTextInput = ({ question, ordinalLabel, handleChange, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const currentValue = selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className={`maxw-full ${ordinalLabel ? 'margin-top-0' : 'text-bold'} display-flex`} requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {ordinalLabel && `${question.question_ordinal}. `}<span>{question.title}</span>
      </Label>
      <div className='display-flex flex-column' style={{maxWidth: '480px'}}>
        <TextInput
          type={showPassword ? 'text' : 'password'}
          id={question.name}
          name={question.name}
          value={currentValue}
          onChange={(e) => handleChange(question, e.target.value)}
        />
        <button
          type="button"
          className="usa-show-password flex-align-self-end margin-right-2px"
          aria-controls={question.name}
          onClick={(): void => setShowPassword(showPassword => !showPassword)}
        >
          {showPassword ? 'Hide Text' : 'Display Text'}
        </button>
      </div>
    </div>
  );
}
