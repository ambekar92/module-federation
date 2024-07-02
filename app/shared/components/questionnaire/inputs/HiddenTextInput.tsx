'use client'
import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';
import { useState } from 'react';

export const HiddenTextInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        <span>{question.title}</span>
      </Label>
      <div className='display-flex flex-column' style={{maxWidth: '480px'}}>
        <TextInput
          type={showPassword ? 'text' : 'password'}
          id={inputId}
          name={question.name}
          onChange={(e) => handleChange(question.name, e.target.value)}
        />
        <button type="button" className="usa-show-password flex-align-self-end margin-right-2px" aria-controls="newPassword confirmPassword" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
          {showPassword ? 'Hide Text' : 'Display Text'}
        </button>
      </div>
    </div>
  );
}
