import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaTextInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>
    <TextInput
      type='text'
      id={inputId}
      name={question.name}
      onChange={(e) => handleChange(question.name, e.target.value)}
    />
  </div>
);
