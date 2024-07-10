import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const ReadOnly = ({ question, inputId, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const currentValue = selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        <span>{question.title}</span>
      </Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <TextInput
        type='text'
        id={inputId}
        name={question.name}
        value={currentValue}
        disabled={true}
      />
    </div>
  );
};
