import { UCPTable } from '@/app/shared/components/table/UCPTable';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import {
  BooleanInput,
  DateInput,
  MultiSelectInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  TextInput
} from '@/app/shared/questionnaire/inputs/QaGridInputs';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid, Label } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import { useOperatorApplicationInfo } from '../hooks/useOperatorApplicationInfo';
import axios from 'axios';
import { ANSWER_ROUTE } from '@/app/constants/local-routes';

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
}

export const OperatorsQaGrid: React.FC<QaGridProps> = ({ question, isSubQuestion, userId, contributorId }) => {
  const { updateOperatorApplicationInfo } = useOperatorApplicationInfo();
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [currentRow, setCurrentRow] = useState<GridRow>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const createOperatorObject = (row: any) => ({
    firstName: String(row['legal_management_team_first_name_control_and_operation_partnership'] || row['legal_management_team_first_name_control_and_operation_llc'] || row['legal_management_team_first_name_control_and_operation_corporation'] || row['legal_management_team_first_name_control_and_operation_sole_proprietorship'] || ''),
    lastName: String(row['legal_management_team_last_name_control_and_operation_partnership'] || row['legal_management_team_last_name_control_and_operation_llc'] || row['legal_management_team_last_name_control_and_operation_corporation'] || row['legal_management_team_last_name_control_and_operation_sole_proprietorship'] || ''),
    email: String(row['legal_management_team_email_control_and_operation_partnership'] || row['legal_management_team_email_control_and_operation_llc'] || row['legal_management_team_email_control_and_operation_corporation'] || row['legal_management_team_email_control_and_operation_sole_proprietorship'] || ''),
    title: String(row['legal_management_team_title_control_and_operation_partnership'] || row['legal_management_team_title_control_and_operation_llc'] || row['legal_management_team_title_control_and_operation_corporation'] || row['legal_management_team_title_control_and_operation_sole_proprietorship'] || ''),
    principalType: String(row['legal_management_team_principal_type_control_and_operation_partnership'] || row['legal_management_team_principal_type_control_and_operation_llc'] || row['legal_management_team_principal_type_control_and_operation_corporation'] || row['legal_management_team_principal_type_control_and_operation_sole_proprietorship'] || ''),
    licenseHolder: String(row['legal_mangement_team_license_holder_control_and_operation_partnership'] || row['legal_management_team_license_holder_control_and_operation_llc'] || row['legal_management_team_license_holder_control_and_operation_corporation'] || row['legal_management_team_license_holder_control_and_operation_sole_proprietorship'] || ''),
  });

  useEffect(() => {
    if (question.answer?.value?.answer) {
      setGridRows(question.answer.value.answer as any);
      const answers = question.answer.value.answer as any[];
      updateOperatorApplicationInfo({
        operators: answers.map(createOperatorObject)
      });
    }
  }, [question.answer]);

  const saveAnswer = (rows: GridRow[]) => {
    if (userId && contributorId) {
      const answer = {
        profile_answer_flag: question.profile_answer_flag,
        application_contributor_id: contributorId,
        value: { answer: rows },
        question_id: question.id,
        answer_by: userId,
        reminder_flag: false,
      };
      axios.post(ANSWER_ROUTE, [answer]).catch((error) => {
        if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
          console.error('Error saving answer:', error);
        }
      });
    }
  };

  const gridQuestions = question.grid_questions?.filter(q => q.question_type !== 'document_upload') || [];

  const getFieldValue = (row: GridRow, fieldName: string): string | string[] => {
    const fullFieldName = Object.keys(row).find(key => key.includes(fieldName));
    return fullFieldName ? row[fullFieldName] : '';
  };

  const generateId = (row: GridRow) => {
    let _id = `owner_${String(getFieldValue(row, 'first_name'))}_${String(getFieldValue(row, 'last_name'))}_${Date.now()}`;
    _id = _id.toLowerCase();
    return _id;
  };

  const handleAddOrUpdateRow = () => {
    if (validateAllFields()) {
      let newRows;
      if (editingRowIndex !== null) {
        newRows = gridRows.map((row, index) =>
          index === editingRowIndex ? { ...currentRow, id: generateId(currentRow) } : row
        );
      } else {
        newRows = [...gridRows, { ...currentRow, id: generateId(currentRow) }];
      }
      setGridRows(newRows);
      setCurrentRow({});
      setErrors({});
      setEditingRowIndex(null);
      updateOperatorApplicationInfo({
        operators: newRows.map(createOperatorObject)
      });
      saveAnswer(newRows);
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = gridRows.filter((_, i) => i !== index);
    setGridRows(updatedRows);
    updateOperatorApplicationInfo({
      operators: updatedRows.map(createOperatorObject)
    });
    saveAnswer(updatedRows);
  };

  const handleEditRow = (index: number) => {
    setEditingRowIndex(index);
    setCurrentRow(gridRows[index]);
  };

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
    <div className={`bg-base-lightest padding-y-2 padding-x-3 ${isSubQuestion ? 'padding-left-3' : ''}`}>
      <Label htmlFor='' className='maxw-full text-bold margin-top-0' requiredMarker={question.answer_required_flag}>
        {question.title}<TooltipIcon text='Partners, members, and Controlling Individuals - Secondary users invoiced with the applying firm that may have ownership or control in business. These individuals can manage the entire application process outside of QO (Qualifying Owner) specific tasks.' />
      </Label>
      <Grid className='grid_questions control-questions' row gap='md'>
        {question.grid_questions?.map((gridQuestion) => (
          <Grid mobile={{ col: 12 }}
            tablet={{col:
              gridQuestion.name === 'legal_management_team_first_name_control_and_operation_partnership'
              || gridQuestion.name === 'legal_management_team_last_name_control_and_operation_partnership'
                ? 6 : 12}} id={`grid_question--${gridQuestion.name}`} key={gridQuestion.id}>
            {renderInput(gridQuestion)}
          </Grid>
        ))}
      </Grid>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddOrUpdateRow}>
          {editingRowIndex !== null ? 'Save' : 'Save'}
        </Button>
        <Button
          type='button'
          unstyled
          className='padding-x-2'
          onClick={() => {
            setCurrentRow({});
            setEditingRowIndex(null);
            setErrors({});
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <UCPTable
          gridQuestions={gridQuestions}
          gridRows={gridRows}
          handleEditRow={handleEditRow}
          handleDeleteRow={handleDeleteRow}
        />
      )}
    </div>
  );
};
