import { ANSWER_ROUTE } from '@/app/constants/routes';
import { fetcherPOST } from '@/app/services/fetcher';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid, Label, Table, Icon } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import { useApplicationId } from '../../hooks/useApplicationIdResult';
import {
  TextInput, NumberInput,
  BooleanInput, SelectInput,
  MultiSelectInput, TextareaInput,
  DateInput
} from './QaGridInputs'

type GridRow = {
  [key: string]: string | string[];
};

type ValidationErrors = {
  [key: string]: string;
};

interface QaGridProps {
  question: Question;
	isSubQuestion?: boolean;
}

export const QaGrid: React.FC<QaGridProps> = ({ question, isSubQuestion }) => {
  const { contributorId, userId } = useApplicationId();
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [currentRow, setCurrentRow] = useState<GridRow>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (question.answer?.value?.answer) {
      setGridRows(question.answer.value.answer);
    }
  }, [question.answer]);

  const validateField = (name: string, value: string | string[]) => {
    const gridQuestion = question.grid_questions?.find((q) => q.name === name);
    if (gridQuestion?.question_type !== 'document_upload' && gridQuestion?.answer_required_flag && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${gridQuestion.title} is required.`;
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

  const handleAddRow = () => {
    if (validateAllFields()) {
      setGridRows([...gridRows, currentRow]);
      setCurrentRow({});
      setErrors({});
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = gridRows.filter((_, i) => i !== index);
    setGridRows(updatedRows);
  };

  const handleSaveAnswer = () => {
    if (userId && contributorId) {
      const answer = {
        profile_answer_flag: question.profile_answer_flag,
        application_contributor_id: contributorId,
        value: { answer: gridRows },
        question_id: question.id,
        answer_by: userId,
        reminder_flag: false,
      };

      fetcherPOST(ANSWER_ROUTE, [answer]).catch((error) => {
        console.error('Error saving answer:', error);
      });
    }
  };

  const renderInput = (gridQuestion: Question) => {
    const value = currentRow[gridQuestion.name] || '';
    const errorMessage = errors[gridQuestion.name];

    switch (gridQuestion.question_type) {
      case 'text':
        return (
          <div className="usa-form-group">
            <TextInput
              question={gridQuestion}
              value={value as string}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'number':
        return (
          <div className="usa-form-group">
            <NumberInput
              question={gridQuestion}
              value={value as string}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'boolean':
        return (
          <div className="usa-form-group">
            <BooleanInput
              question={gridQuestion}
              value={value as string}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'select':
        return (
          <div className="usa-form-group">
            <SelectInput
              question={gridQuestion}
              value={value as string}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
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
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'textarea':
      case 'text_area':
        return (
          <div className="usa-form-group">
            <TextareaInput
              question={gridQuestion}
              value={value as string}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'date':
        return (
          <div className="usa-form-group">
            <DateInput
              question={gridQuestion}
              value={value as string}
              onChange={(newValue) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'document_upload':
        return null;
      default:
        return <div>Unsupported input type</div>;
    }
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label htmlFor='' className='maxw-full text-bold' requiredMarker={question.answer_required_flag}>
        {question.title}
      </Label>
      <Grid row gap='md'>
        {question.grid_questions?.map((gridQuestion) => (
          <Grid col={6} key={gridQuestion.id}>
            {renderInput(gridQuestion)}
          </Grid>
        ))}
      </Grid>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddRow}>
          Add Row
        </Button>
        <Button type='button' unstyled className='padding-x-2' onClick={() => setCurrentRow({})}>
          Cancel
        </Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <Table bordered scrollable className='maxw-full'>
          <thead>
            <tr>
              {question.grid_questions?.map((gridQuestion) => (
                gridQuestion?.question_type !== 'document_upload' && <th key={gridQuestion.id}>{gridQuestion.title}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {question.grid_questions?.map((gridQuestion) => (
                  gridQuestion?.question_type !== 'document_upload' &&
                  <td key={gridQuestion.id}>
                    {Array.isArray(row[gridQuestion.name])
                      ? (row[gridQuestion.name] as string[]).join(', ')
                      : row[gridQuestion.name] as string}
                  </td>
                ))}
                <td>
                  <Button
                    className='display-flex flex-align-center margin-top-1'
                    type='button'
                    unstyled
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    <Icon.Delete className='margin-right-1' />
                    <span className='mobile:display-none'>Delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ButtonGroup className='display-flex flex-justify-end'>
        <Button type='button' onClick={handleSaveAnswer}>
					Save Answer
        </Button>
      </ButtonGroup>
    </div>
  );
};
