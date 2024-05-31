import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from '../utils/types';

export const NumberInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>
    <TextInput
      type='number'
      id={inputId}
      name={question.name}
      onChange={(e) => handleChange(question.name, e.target.value)}
    />
  </div>
);
