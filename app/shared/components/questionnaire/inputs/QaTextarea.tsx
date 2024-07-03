import { CharacterCount, Label } from '@trussworks/react-uswds';
import { QaInputProps } from './types';

export const QaTextarea = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const currentValue = selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || '';

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        <span>{question.title}</span>
      </Label>

      <CharacterCount
        id={inputId}
        name={question.name}
        maxLength={1000}
        isTextArea
        rows={2}
        value={currentValue}
        aria-describedby={`${inputId}-info ${inputId}-hint`}
        onChange={(e: { target: { value: any; }; }) => handleChange(question, e.target.value)}
      />
    </div>
  );
};
