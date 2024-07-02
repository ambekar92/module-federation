import { Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const ReadOnly = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span><span className='text-normal'>{question.answer?.value}</span>
    </Label>
  </div>
);
