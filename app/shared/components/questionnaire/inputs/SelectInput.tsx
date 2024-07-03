import { Label, Select } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const SelectInput = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const currentValue = selectedAnswers[question.name]?.value || question.answer?.value?.answer || '';

  return (
    question.answer_choice && 'options' in question.answer_choice &&
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        {question.title}
      </Label>
      <Select
        className='height-7 radius-lg'
        id={inputId}
        name={question.name}
        value={currentValue}
        onChange={(e) => handleChange(question, e.target.value)}
      >
        <option value="">- Select -</option>
        {question.answer_choice.options.map((option, idx) => (
          <option key={idx} value={option.option}>
            {option.option}
          </option>
        ))}
      </Select>
    </div>
  );
};
