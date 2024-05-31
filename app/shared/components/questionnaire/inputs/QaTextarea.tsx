import { CharacterCount, Label } from '@trussworks/react-uswds';
import { QaInputProps } from '../utils/types';

export const QaTextarea = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-tablet' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>

    <CharacterCount
      id={inputId}
      name={question.name}
      maxLength={1000}
      isTextArea
      rows={2}
      aria-describedby={`${inputId}-info ${inputId}-hint`}
      onChange={(e: { target: { value: any; }; }) => handleChange(question.name, e.target.value)}
    />
  </div>
);
