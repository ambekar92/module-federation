import { Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const BooleanInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>
    <div className='usa-radio display-flex gap-1'>
      <input
        className="usa-radio__input"
        id={`${inputId}-true`}
        type="radio"
        value="TRUE"
        name={question.name}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Label className="usa-radio__label" htmlFor={`${inputId}-true`}>
        Yes
      </Label>
      <input
        className="usa-radio__input"
        id={`${inputId}-false`}
        type="radio"
        value="FALSE"
        name={question.name}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Label className="usa-radio__label margin-left-105" htmlFor={`${inputId}-false`}>
        No
      </Label>
    </div>
  </div>
);
