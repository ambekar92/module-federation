import { ANSWER_ROUTE } from '@/app/constants/local-routes';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid, Label } from '@trussworks/react-uswds';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UCPTable } from '../../components/table/UCPTable';
import {
  BooleanInput,
  DateInput,
  EmailInput,
  MultiSelectInput,
  NumberInput,
  PhoneInput,
  SelectInput,
  TextareaInput,
  TextInput
} from './QaGridInputs';

type GridRow = {
  [key: string]: string | string[];
};

type ValidationErrors = {
  [key: string]: string;
};

interface QaGridProps {
  question: Question;
	isSubQuestion?: boolean;
	userId: number | null;
	contributorId: number;
	refetchQuestions?: () => void;
}

export const QaGrid: React.FC<QaGridProps> = ({ question, isSubQuestion, userId, contributorId, refetchQuestions }) => {
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [currentRow, setCurrentRow] = useState<GridRow>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [dateKey, setDateKey] = useState(0);

  useEffect(() => {
    if (question.answer?.value?.answer) {
      setGridRows(question.answer.value.answer as any);
    }
  }, [question.answer]);

  const validateField = (name: string, value: string | string[]) => {
    const gridQuestion = question.grid_questions?.find((q) => q.name === name);
    if (gridQuestion?.question_type !== 'document_upload' && gridQuestion?.answer_required_flag && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${gridQuestion.title} is required.`;
    }
    if (name.includes('email') && typeof value === 'string') {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!re.test(String(value).toLowerCase())) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  };

  const validateAllFields = () => {
    const newErrors: ValidationErrors = {};
    question.grid_questions?.forEach((gridQuestion) => {
      const error = validateField(gridQuestion.name, currentRow[gridQuestion.name]);
      if (error) {
        newErrors[gridQuestion.name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAnswer = async (rows: GridRow[]) => {
    if (userId && contributorId) {
      const answer = {
        profile_answer_flag: question.profile_answer_flag,
        application_contributor_id: contributorId,
        value: { answer: rows },
        question_id: question.id,
        answer_by: userId,
        reminder_flag: false,
      };
      try {
        await axios.post(ANSWER_ROUTE, [answer])
        if (refetchQuestions && question.name === 'social_disadvantage_affecting_experiences_individual_contributor_eight_a_social_disadvantage') {
          refetchQuestions();
        }
      } catch(error) {
        // Error caught haha -KJ
      };
    }
  };

  const handleAddRow = () => {
    if (validateAllFields()) {
      const newRows = [...gridRows, currentRow];
      setGridRows(newRows);
      setCurrentRow({});
      setErrors({});
      saveAnswer(newRows);
      setDateKey(prevKey => prevKey + 1);

      question.grid_questions?.forEach((gridQuestion) => {
        if (gridQuestion.question_type === 'textarea' || gridQuestion.question_type === 'text_area') {
          const textareaElement = document.getElementById(gridQuestion.name) as HTMLTextAreaElement;
          if (textareaElement) {
            textareaElement.value = '';
          }
        }
      });
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = gridRows.filter((_, i) => i !== index);
    setGridRows(updatedRows);
    saveAnswer(updatedRows);
  };

  const renderInput = (gridQuestion: Question) => {
    const value = currentRow[gridQuestion.name] || '';
    const errorMessage = errors[gridQuestion.name];

    const commonProps = {
      question: gridQuestion,
      value: value as string,
      onChange: (newValue: string) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))
    };

    const renderErrorMessage = () => (
      errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>
    );

    if (gridQuestion.name.includes('email')) {
      return (
        <div className="usa-form-group">
          <EmailInput {...commonProps} />
          {renderErrorMessage()}
        </div>
      );
    } else if (gridQuestion.name.includes('phone_number')) {
      return (
        <div className="usa-form-group">
          <PhoneInput {...commonProps} />
          {renderErrorMessage()}
        </div>
      );
    }

    switch (gridQuestion.question_type) {
      case 'text':
        return (
          <div className="usa-form-group">
            <TextInput {...commonProps} />
            {renderErrorMessage()}
          </div>
        );
      case 'number':
        return (
          <div className="usa-form-group">
            <NumberInput {...commonProps} />
            {renderErrorMessage()}
          </div>
        );
      case 'boolean':
        return (
          <div className="usa-form-group">
            <BooleanInput {...commonProps} />
            {renderErrorMessage()}
          </div>
        );
      case 'select':
        return (
          <div className="usa-form-group">
            <SelectInput {...commonProps} />
            {renderErrorMessage()}
          </div>
        );
      case 'multi_select':
        return (
          <div className="usa-form-group">
            <MultiSelectInput
              question={gridQuestion}
              value={value as string[]}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {renderErrorMessage()}
          </div>
        );
      case 'textarea':
      case 'text_area':
        return (
          <div className="usa-form-group">
            <TextareaInput
              question={gridQuestion}
              value={typeof currentRow[gridQuestion.name] === 'string' ? currentRow[gridQuestion.name] as string : ''}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {renderErrorMessage()}
          </div>
        );
      case 'date':
        return (
          <div className="usa-form-group">
            <DateInput
              {...commonProps}
              key={`${gridQuestion.name}-${dateKey}`}
            />
            {renderErrorMessage()}
          </div>
        );
      case 'document_upload':
        return null;
      default:
        return <div>Unsupported input type</div>;
    }
  };

  const gridQuestions = question.grid_questions?.filter(q => q.question_type !== 'document_upload') || [];

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label htmlFor='' className='maxw-full text-bold' requiredMarker={question.answer_required_flag}>
        {question.title}
      </Label>
      <Grid row gap='md'>
        {question.grid_questions?.map((gridQuestion) => (
          <Grid col={12} key={gridQuestion.id}>
            {renderInput(gridQuestion)}
          </Grid>
        ))}
      </Grid>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddRow}>
          {question.name === 'social_disadvantage_affecting_experiences_individual_contributor_eight_a_social_disadvantage' ? 'Add Example' : 'Save'}
        </Button>
        <Button type='button' unstyled className='padding-x-2' onClick={() => setCurrentRow({})}>
          Cancel
        </Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <UCPTable
          gridQuestions={gridQuestions}
          gridRows={gridRows}
          handleDeleteRow={handleDeleteRow}
        />
      )}
    </div>
  );
};
