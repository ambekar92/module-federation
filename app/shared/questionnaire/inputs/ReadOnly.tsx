import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const ReadOnly = ({ question, ordinalLabel, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const currentValue = selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className={`maxw-full ${ordinalLabel ? 'margin-top-0' : 'text-bold'} display-flex`} requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {ordinalLabel && `${question.question_ordinal}. `}<span className={`${ordinalLabel && 'padding-left-1'}`}>{question.title}</span>
      </Label>
      <TextInput
        type='text'
        id={question.name}
        className={`${ordinalLabel && 'margin-left-3'}`}
        name={question.name}
        value={currentValue}
        disabled={true}
      />
    </div>
  );
};
