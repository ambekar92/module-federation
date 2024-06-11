import { DateRangePicker, Label } from '@trussworks/react-uswds';
import { QaInputProps } from '../utils/types';

export const QaDateInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
      <span>{question.title}</span>
    </Label>
    <DateRangePicker
      id={inputId}
      endDateHint="mm/dd/yyyy"
      onChange={() => handleChange}
      endDateLabel='Event end date'
      endDatePickerProps={{
        disabled: false,
        id: 'event-date-end',
        name: question.name + '-end'
      }}
      startDateHint="mm/dd/yyyy"
      aria-describedby={`${question.name}-info ${question.name}-hint`}
      startDateLabel='Event start date'
      startDatePickerProps={{
        disabled: false,
        id: 'event-date-start',
        name: question.name + '-start'
      }}
    />
  </div>
);
