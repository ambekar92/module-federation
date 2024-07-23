import { Label, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaTextInput = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers, isGridQuestion }: QaInputProps) => {
  const currentValue = !isGridQuestion && selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        <span>{question.title}</span>
      </Label>
      <TextInput
        type='text'
        id={inputId}
        name={question.name}
        value={currentValue}
        onChange={(e) => handleChange(question, e.target.value)}
      />
    </div>
  );
};
