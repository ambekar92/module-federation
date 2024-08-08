import { Question } from '@/app/shared/types/questionnaireTypes';
import { Label } from '@trussworks/react-uswds';

const AnswerValue = ({ question }: { question: Question }) => {
  const renderAnswerValue = (q: Question): string | null => {
    if (q.question_type === 'api.get.questionnaire') {
      return null;
    }
    if (!q.answer?.value) {
      return 'No answer provided';
    }
    const answerValue = q.answer.value.answer;
    if (Array.isArray(answerValue)) {
      return answerValue.join(', ');
    }
    return String(answerValue);
  };

  const renderSubQuestions = (q: Question): JSX.Element | null => {
    if (!q.rules) {return null;}

    const subQuestions = q.rules
      .filter(rule => rule.sub_question)
      .map(rule => rule.sub_question as Question);

    if (subQuestions.length === 0) {return null;}

    return (
      <div style={{ marginLeft: '20px' }}>
        {subQuestions.map((subQ, index) => {
          if (subQ.question_type === 'api.get.questionnaire') {
            return null;
          }
          return (
            <div key={index}>
              <Label style={{maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={subQ.name}>
                {subQ.title}
              </Label>
              <span className='text-base'>
                {subQ.description?.toLowerCase() !== subQ.title?.toLowerCase() ? subQ.description : ''}
              </span>
              <p>{renderAnswerValue(subQ)}</p>
              {renderSubQuestions(subQ)}
            </div>
          );
        })}
      </div>
    );
  };

  if (question.question_type === 'api.get.questionnaire') {
    return null;
  }

  return (
    <div>
      <Label style={{maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>
        {question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
      </span>
      <p>{renderAnswerValue(question)}</p>
      {renderSubQuestions(question)}
    </div>
  );
};

export default AnswerValue;
