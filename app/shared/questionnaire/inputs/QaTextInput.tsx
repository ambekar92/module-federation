import React, { useState } from 'react';
import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaTextInput = ({ question, ordinalLabel, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  const initialValue = !isGridQuestion && selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  const [localValue, setLocalValue] = useState(initialValue);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleChange(question, e.target.value);
  };

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
  };

  const formatSSN = (input: string) => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return input;
  };

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value;

    if (question.name.includes('phone_number')) {
      formattedValue = formatPhoneNumber(e.target.value);
    } else if (question.name.includes('ssn')) {
      formattedValue = formatSSN(e.target.value);
    }

    setLocalValue(formattedValue);
  };

  const getInputType = () => {
    if (question.name.includes('email')) {
      return 'email';
    } else if (question.name.includes('phone_number')) {
      return 'tel';
    } else if (question.name.includes('ssn')) {
      return 'text';
    } else {
      return 'text';
    }
  };

  const getInputProps = () => {
    const commonProps = {
      id: question.name,
      name: question.name,
      value: localValue,
      className: `${ordinalLabel && 'margin-left-3'}`,
      onChange: handleLocalChange,
      onBlur: handleBlur,
    };

    if (question.name.includes('phone_number')) {
      return {
        ...commonProps,
        pattern: '\\(\\d{3}\\)-\\d{3}-\\d{4}',
        maxLength: 14,
      };
    } else if (question.name.includes('ssn')) {
      return {
        ...commonProps,
        pattern: '\\d{3}-\\d{2}-\\d{4}',
        maxLength: 11,
      };
    } else {
      return commonProps;
    }
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label
        className={`maxw-full ${ordinalLabel ? 'margin-top-0' : 'text-bold'} display-flex`}
        requiredMarker={question.answer_required_flag}
        htmlFor={question.name}
      >
        {ordinalLabel && `${question.question_ordinal}. `}
        <span className={`${ordinalLabel && 'padding-left-1'}`}>{question.title}</span>
      </Label>
      <TextInput
        type={getInputType()}
        {...getInputProps()}
      />
    </div>
  );
};
