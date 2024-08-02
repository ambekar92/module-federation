import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const ReadOnly = ({ question, inputId, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const currentValue = selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        <span>{question.title}</span>
      </Label>
      <TextInput
        type='text'
        id={question.name}
        name={question.name}
        value={currentValue}
        disabled={true}
      />
    </div>
  );
};
