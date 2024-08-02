import { Label, Select } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const SelectInput = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  const currentValue = !isGridQuestion && selectedAnswers[question.name]?.value || question.answer?.value?.answer || '';

  return (
    question.answer_choice && 'options' in question.answer_choice &&
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <Select
        id={question.name}
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
