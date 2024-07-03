import React from 'react';
import { Label } from '@trussworks/react-uswds';
import { MainQuestionObject } from '@/app/shared/form-builder/questionnaire-types/question';

const AnswerValue = ({question}: {question: MainQuestionObject}) => {
  return (
    <div>
      <Label style={{maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={question.name}>{question.title}</Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <p>
        {question?.answer?.value ?? 'No answer provided'}
      </p>
    </div>
  )
}

export default AnswerValue