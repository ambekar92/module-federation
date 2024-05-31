import { Label } from '@trussworks/react-uswds';
import { QaInputProps } from '../utils/types';

export const BooleanInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>
    <div className='usa-radio display-flex gap-1'>
      <input
        className="usa-radio__input"
        id={`${inputId}-true`}
        type="radio"
        value="true"
        name={question.name}
        onChange={() => handleChange(question.name, 'TRUE')}
      />
      <Label className="usa-radio__label" htmlFor={`${inputId}-true`}>
        Yes
      </Label>
      <input
        className="usa-radio__input"
        id={`${inputId}-false`}
        type="radio"
        value="false"
        name={question.name}
        onChange={() => handleChange(question.name, 'FALSE')}
      />
      <Label className="usa-radio__label margin-left-105" htmlFor={`${inputId}-false`}>
        No
      </Label>
    </div>
  </div>
);
