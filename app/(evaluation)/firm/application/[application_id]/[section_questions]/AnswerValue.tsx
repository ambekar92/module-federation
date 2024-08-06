import { Question } from '@/app/shared/types/questionnaireTypes';
import { Label } from '@trussworks/react-uswds';

const AnswerValue = ({ question }: { question: Question }) => {
  const renderAnswerValue = () => {
    if (!question.answer?.value) {
      return 'No answer provided';
    }

    const answerValue = question.answer.value.answer;

    if (Array.isArray(answerValue)) {
      return answerValue.join(', ');
    }

    return String(answerValue);
  };

  return (
    <div>
      <Label style={{maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>
        {question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
      </span>
      <p>{renderAnswerValue()}</p>
    </div>
  );
};

export default AnswerValue;
