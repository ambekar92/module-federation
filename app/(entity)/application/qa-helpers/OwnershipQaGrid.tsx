import { ANSWER_ROUTE } from '@/app/constants/routes';
import { fetcherPOST } from '@/app/services/fetcher-legacy';
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
import { Button, ButtonGroup, Grid, Icon, Label, Table } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateEligibleSbaPrograms, OwnerType, useOwnerApplicationInfo } from '../hooks/useOwnershipApplicationInfo';
import { setOwners } from '../redux/applicationSlice';
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

export const OwnershipQaGrid: React.FC<QaGridProps> = ({ question, isSubQuestion, userId, contributorId }) => {
  const { updateOwners } = useOwnerApplicationInfo();
  const dispatch = useDispatch();
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [currentRow, setCurrentRow] = useState<GridRow>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const createOwnerObject = (row: any): OwnerType => {
    const owner = {
      firstName: String(row['first_name_owner_and_management_partnership'] || row['first_name_owner_and_management_llc'] || row['first_name_owner_and_management_corporation'] || row['first_name_owner_and_management_sole_proprietorship'] || ''),
      lastName: String(row['last_name_owner_and_management_partnership'] || row['last_name_owner_and_management_llc'] || row['last_name_owner_and_management_corporation'] || row['last_name_owner_and_management_sole_proprietorship'] || ''),
      ownershipPercent: String(row['ownership_percentage_owner_and_management_partnership'] || row['ownership_percentage_owner_and_management_llc'] || row['ownership_percentage_owner_and_management_corporation'] || row['ownership_percentage_owner_and_management_sole_proprietorship'] || ''),
      emailAddress: String(row['email_owner_and_management_partnership'] || row['email_owner_and_management_llc'] || row['email_owner_and_management_corporation'] || row['email_owner_and_management_sole_proprietorship'] || ''),
      socialDisadvantages: Array.isArray(row['individual_contributor_eight_a_social_disadvantage_owner_and_management_partnership'] || row['individual_contributor_eight_a_social_disadvantage_owner_and_management_llc'] || row['individual_contributor_eight_a_social_disadvantage_owner_and_management_corporation'] || row['individual_contributor_eight_a_social_disadvantage_owner_and_management_sole_proprietorship'])
        ? (row['individual_contributor_eight_a_social_disadvantage_owner_and_management_partnership'] || row['individual_contributor_eight_a_social_disadvantage_owner_and_management_llc'] || row['individual_contributor_eight_a_social_disadvantage_owner_and_management_corporation'] || row['individual_contributor_eight_a_social_disadvantage_owner_and_management_sole_proprietorship'])
        : [],
      citizenship: String(row['citizenship_owner_and_management_partnership'] || row['citizenship_owner_and_management_llc'] || row['citizenship_owner_and_management_corporation'] || row['citizenship_owner_and_management_sole_proprietorship'] || ''),
      gender: String(row['gender_owner_and_management_parntership'] || row['gender_owner_and_management_llc'] || row['gender_owner_and_management_corporation'] || row['gender_owner_and_management_sole_proprietorship'] || ''),
      veteranStatus: String(row['veteran_status_owner_and_management_partnership'] || row['veteran_status_owner_and_management_llc'] || row['veteran_status_owner_and_management_corporation'] || row['veteran_status_owner_and_management_sole_proprietorship'] || ''),
    };

    const isEligibleOwner = calculateEligibleSbaPrograms([owner]).length > 0;
    return { ...owner, isEligibleOwner };
  };

  useEffect(() => {
    if (question.answer?.value?.answer) {
      const answers = question.answer.value.answer as any[];
      setGridRows(answers);
      const newOwners = answers.map(createOwnerObject);
      dispatch(setOwners(newOwners));
      updateOwners(newOwners);
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
      fetcherPOST(ANSWER_ROUTE, [answer]).catch((error) => {
        console.error('Error saving answer:', error);
      });
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = gridRows.filter((_, i) => i !== index);
    setGridRows(updatedRows);
    const newOwners = updatedRows.map(createOwnerObject);
    dispatch(setOwners(newOwners));
    updateOwners(newOwners);
    saveAnswer(updatedRows);
  };

  const handleEditRow = (index: number) => {
    setEditingRowIndex(index);
    setCurrentRow(gridRows[index]);
  };

  const handleAddOrUpdateRow = () => {
    if (validateAllFields()) {
      let newRows;
      if (editingRowIndex !== null) {
        newRows = gridRows.map((row, index) =>
          index === editingRowIndex ? currentRow : row
        );
      } else {
        newRows = [...gridRows, currentRow];
      }
      setGridRows(newRows);
      setCurrentRow({});
      setErrors({});
      setEditingRowIndex(null);
      const newOwners = newRows.map(createOwnerObject);
      dispatch(setOwners(newOwners));
      updateOwners(newOwners);
      saveAnswer(newRows);
    }
  };

  const validateField = (name: string, value: string | string[]) => {
    const gridQuestion = question.grid_questions?.find((q) => q.name === name);
    if (
      gridQuestion?.name === 'ownership_percentage_owner_and_management_partnership'
			|| gridQuestion?.name === 'ownership_percentage_owner_and_management_llc'
			|| gridQuestion?.name === 'ownership_percentage_owner_and_management_corporation'
			|| gridQuestion?.name === 'ownership_percentage_owner_and_management_sole_proprietorship'
    ) {
      const currentPercentage = parseFloat(value as string) || 0;
      let totalPercentage = gridRows.reduce((sum, row) => {
        const rowPercentage = parseFloat(
					row['ownership_percentage_owner_and_management_partnership'] as string ||
					row['ownership_percentage_owner_and_management_llc'] as string ||
					row['ownership_percentage_owner_and_management_corporation'] as string ||
					row['ownership_percentage_owner_and_management_sole_proprietorship'] as string ||
					'0'
        );
        return sum + rowPercentage;
      }, 0);

      if (editingRowIndex !== null) {
        const originalPercentage = parseFloat(
					gridRows[editingRowIndex]['ownership_percentage_owner_and_management_partnership'] as string ||
					gridRows[editingRowIndex]['ownership_percentage_owner_and_management_llc'] as string ||
					gridRows[editingRowIndex]['ownership_percentage_owner_and_management_corporation'] as string ||
					gridRows[editingRowIndex]['ownership_percentage_owner_and_management_sole_proprietorship'] as string ||
					'0'
        );
        totalPercentage -= originalPercentage;
      }

      totalPercentage += currentPercentage;

      if (totalPercentage > 100) {
        return 'Total ownership cannot exceed 100%';
      }
      if (currentPercentage > 100) {
        return 'Percentage cannot exceed 100%';
      }
      if (currentPercentage < 0) {
        return 'Percentage cannot be a negative number';
      }
    }
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
        {question.title}
      </Label>
      <Grid className='grid_questions' row gap='md'>
        {question.grid_questions?.map((gridQuestion) => (
          <Grid col={6} id={`grid_question--${gridQuestion.name}`} key={gridQuestion.id}>
            {renderInput(gridQuestion)}
          </Grid>
        ))}
      </Grid>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddOrUpdateRow}>
          {editingRowIndex !== null ? 'Update Row' : 'Add Row'}
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
        <Grid>
          <Table bordered scrollable className='maxw-full'>
            <thead>
              <tr>
                {question.grid_questions?.filter(gridQuestion =>
                  question.name === 'personal_information_owner_and_management_partnership' || question.name === 'personal_information_owner_and_management_corporation' || question.name === 'personal_information_owner_and_management_sole_proprietorship' || question.name === 'personal_information_owner_and_management_llc'
                    ? ['First Name', 'Last Name', 'Email', 'Percent Ownership of the Business', 'Veteran'].includes(gridQuestion.title)
                    : true
                ).map((gridQuestion) => (
                  gridQuestion?.question_type !== 'document_upload' &&
            			<th key={gridQuestion.id}>{gridQuestion.title}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gridRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {question.grid_questions?.filter(gridQuestion =>
                    question.name === 'personal_information_owner_and_management_partnership' || question.name === 'personal_information_owner_and_management_corporation' || question.name === 'personal_information_owner_and_management_sole_proprietorship' || question.name === 'personal_information_owner_and_management_llc'
                      ? ['First Name', 'Last Name', 'Email', 'Percent Ownership of the Business', 'Veteran'].includes(gridQuestion.title)
                      : true
                  ).map((gridQuestion) => (
                    gridQuestion?.question_type !== 'document_upload' &&
              <td key={gridQuestion.id}>
                {Array.isArray(row[gridQuestion.name])
                  ? (row[gridQuestion.name] as string[]).join(', ')
                  : row[gridQuestion.name] as string}
              </td>
                  ))}
                  <td>
                    <Button
                      style={{textDecoration: 'none'}}
                      className='display-flex flex-align-center margin-right-1'
                      type='button'
                      unstyled
                      onClick={() => handleEditRow(rowIndex)}
                    >
                      <Icon.Edit className='margin-right-1' />
                      <span className='mobile:display-none'>Edit</span>
                    </Button>
                    <Button
                      style={{textDecoration: 'none'}}
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
        </Grid>
      )}
    </div>
  );
};
