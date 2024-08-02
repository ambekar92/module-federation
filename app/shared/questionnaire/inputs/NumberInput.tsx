import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';
import { useState } from 'react';

export const NumberInput = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  const initialValue = !isGridQuestion && selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  const [localValue, setLocalValue] = useState(initialValue);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleChange(question, e.target.value);
  };

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        <span>{question.title}</span>
      </Label>
      <TextInput
        type='number'
        id={question.name}
        name={question.name}
        value={localValue}
        onChange={handleLocalChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
