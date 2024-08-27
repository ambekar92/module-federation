import { Label, Select } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const SelectInput = ({ question, ordinalLabel, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  const currentValue = !isGridQuestion && selectedAnswers[question.name]?.value || question.answer?.value?.answer || '';

  return (
    question.answer_choice && 'options' in question.answer_choice &&
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className={`maxw-full ${ordinalLabel ? 'margin-top-0' : 'text-bold'} display-flex`} requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {ordinalLabel && `${question.question_ordinal}. `}<span className={`${ordinalLabel && 'padding-left-1'}`}>{question.title}</span>
      </Label>
      <Select
        id={question.name}
        name={question.name}
        value={currentValue}
        className={`${ordinalLabel && 'margin-left-3'}`}
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
