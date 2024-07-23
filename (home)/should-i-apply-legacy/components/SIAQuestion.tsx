'use client'
import { Alert, Grid, Label } from '@trussworks/react-uswds'
import React from 'react'
import { Control, Controller, useWatch } from 'react-hook-form'
import { z } from 'zod'
import Styles from './ShoudIApplyForm.module.scss'
import { ShouldIApplySchema } from './utils/schema'

type Inputs = z.infer<typeof ShouldIApplySchema>

export interface Question {
  name: keyof Inputs;
  question: string;
  yesId: string;
  noId: string;
  options: string[];
  noAlert?: string;
  questionSection: 'readiness' | 'eligibility';
  listItems: string[];
}

interface QuestionProps {
  question: Question;
  control: Control<Inputs>;
}

const SIAQuestion: React.FC<QuestionProps> = ({ question, control }) => {
  const fieldValue = useWatch({
    control,
    name: question.name, // Watch the specific field based on question.name
  });

  const isEligibility = question.questionSection === 'eligibility';
  const alertType = isEligibility ? 'error' : 'warning';

  return (
    <div key={question.name} className='line-height-base margin-bottom-4'>
      <p className='margin-bottom-105' dangerouslySetInnerHTML={{ __html: question.question }}></p>
      {question.listItems.length > 0 && (
        <div>
          <ol className='padding-left-3 margin-top-1'>
            {question.listItems.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
            ))}
          </ol>
        </div>
      )}
      <Grid row gap={4}>
        {question.options.map((option, index) => (
          <Controller
            key={`${question.name}-${option}-${index}`}
            name={question.name}
            control={control}
            render={({ field }) => (
              <div className={'usa-radio'}>
                <input
                  {...field}
                  className="usa-radio__input"
                  id={`${question.name}-${option.toLowerCase()}`}
                  type="radio"
                  value={option}
                  checked={field.value === option}
                  onChange={() => field.onChange(option)}
                />
                <Label htmlFor={`${question.name}-${option.toLowerCase()}`} className={'usa-radio__label'}>{option}</Label>
              </div>
            )}
          />
        ))}
      </Grid>

      {fieldValue === 'No' && question.noAlert && (
        <Alert className={`${Styles.alert} ${Styles.alert_question}`} type={alertType} headingLevel='h3' noIcon>
          <div dangerouslySetInnerHTML={{ __html: question.noAlert }}></div>
        </Alert>
      )}
    </div>
  );

};

export default SIAQuestion
