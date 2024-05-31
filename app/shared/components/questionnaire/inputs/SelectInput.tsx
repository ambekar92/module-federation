import { Label, Select } from '@trussworks/react-uswds';
import { QaInputProps } from '../utils/types';

export const SelectInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  question.answer_choice && 'options' in question.answer_choice &&
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>
    <Select
      className='height-7 radius-lg'
      id={inputId}
      name={question.name}
      onChange={(e) => handleChange(question.name, e.target.value)}
    >
      <option>- Select -</option>
      {question.answer_choice.options.map((option, idx) => (
        <option key={idx} value={option.option}>
          {option.option}
        </option>
      ))}
    </Select>
  </div>
);
