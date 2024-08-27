import React from 'react';
import { DatePicker, Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaDateInput = ({ question, ordinalLabel, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  const dateFromApi = selectedAnswers[question.name]?.value ?? question.answer?.value?.answer;

  // converts 'MM/DD/YYYY' to 'YYYY-MM-DD'
  const formatDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const currentValue = dateFromApi ? formatDate(dateFromApi) : '';

  const handleDateChange = (val?: string) => {
    handleChange(question, val ?? '');
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className={`maxw-full ${ordinalLabel ? 'margin-top-0' : 'text-bold'} display-flex`} requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {ordinalLabel && `${question.question_ordinal}. `}<span>{question.title}</span>
      </Label>
      <DatePicker
        aria-describedby={`${question.name}-info ${question.name}-hint`}
        aria-labelledby={`${question.name}-info ${question.name}-label`}
        id={question.name}
        name={question.name}
        maxDate={today}
        defaultValue={isGridQuestion ? '' : currentValue}
        onChange={handleDateChange}
      />
    </div>
  );
};
