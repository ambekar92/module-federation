import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Grid, Icon, Label, Select, Table } from '@trussworks/react-uswds';
import { ANSWER_ROUTE } from '@/app/constants/routes';
import { axiosInstance } from '@/app/services/axiosInstance';
import {
  BooleanInput,
  DateInput,
  MultiSelectInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  TextInput,
  EmailInput,
  PhoneInput
} from '@/app/shared/questionnaire/inputs/QaGridInputs';
import { Question, QaQuestionsType } from '@/app/shared/types/questionnaireTypes';
import { calculateEligibleSbaPrograms, OwnerType, useOwnerApplicationInfo } from '../hooks/useOwnershipApplicationInfo';
import { setOwners } from '../redux/applicationSlice';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';

export type GridRow = {
  [key: string]: string | string[];
};

type ValidationErrors = {
  [key: string]: string;
};

interface QaGridProps {
  questions: QaQuestionsType;
  userId: number | null;
  contributorId: number | null;
	setTotalOwnershipPercentage: React.Dispatch<React.SetStateAction<number>>;
}

export const OwnershipQaGrid: React.FC<QaGridProps> = ({ questions, userId, contributorId, setTotalOwnershipPercentage }) => {
  const { updateOwners } = useOwnerApplicationInfo();
  const dispatch = useDispatch();
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [currentRow, setCurrentRow] = useState<GridRow>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [ownerType, setOwnerType] = useState<string>('-Select-');

  const [individualQuestion, setIndividualQuestion] = useState<Question | undefined>(undefined);
  const [organizationQuestion, setOrganizationQuestion] = useState<Question | undefined>(undefined);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setIndividualQuestion(questions.find(q => q.name.includes('personal_information_owner_and_management')));
      setOrganizationQuestion(questions.find(q => q.name.includes('organization_information_owner_and_management')));
    }
  }, [questions]);

  const handleOwnerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOwnerType(value);
    setCurrentRow({ owner_type: value });
    setErrors({});
  };

  const renderOwnerTypeSelect = () => {
    return (
      <div className="usa-form-group">
        <div className='display-flex'>
          <Label htmlFor="owner-type">Owner Type</Label>
          <TooltipIcon text='If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.' />
        </div>
        <Select
          id="owner-type"
          name="owner-type"
          className="usa-select maxw-full"
          value={ownerType}
          onChange={handleOwnerTypeChange}
        >
          <option value="-Select-">-Select-</option>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
        </Select>
      </div>
    );
  };

  const validateField = (name: string, value: string | string[]) => {
    const currentQuestion = ownerType === 'Individual' ? individualQuestion : organizationQuestion;
    const gridQuestion = currentQuestion?.grid_questions?.find((q) => q.name === name);

    if (name.includes('email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string)) {
        return 'Please enter a valid email address';
      }
    }

    if (name.includes('phone_number')) {
      const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
      if (!phoneRegex.test(value as string)) {
        return 'Please enter a valid phone number in the format (xxx)-xxx-xxxx';
      }
    }

    if (name.includes('ownership_percentage')) {
      const currentPercentage = parseFloat(value as string) || 0;

      let totalPercentage = gridRows.reduce((sum, row) => {
        const rowPercentage = parseFloat(getFieldValue(row, 'ownership_percentage') as string || '0');
        return sum + rowPercentage;
      }, 0);

      if (editingRowIndex !== null) {
        const originalPercentage = parseFloat(getFieldValue(gridRows[editingRowIndex], 'ownership_percentage') as string || '0');
        totalPercentage -= originalPercentage;
      }

      totalPercentage += currentPercentage;

      if (totalPercentage > 100) {
        return 'Total ownership across all owners cannot exceed 100%';
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

  const renderInput = (gridQuestion: Question) => {
    const value = currentRow[gridQuestion.name] || '';
    const errorMessage = errors[gridQuestion.name];

    let InputComponent;
    const inputProps: any = {
      question: gridQuestion,
      value: value,
      onChange: (newValue: string | string[]) => setCurrentRow(prev => ({ ...prev, [gridQuestion.name]: newValue }))
    };

    switch (gridQuestion.question_type) {
      case 'text':
        if (gridQuestion.name.includes('email')) {
          InputComponent = EmailInput;
        } else if (gridQuestion.name.includes('phone_number')) {
          InputComponent = PhoneInput;
        } else {
          InputComponent = TextInput;
        }
        break;
      case 'number':
        InputComponent = NumberInput;
        break;
      case 'boolean':
        InputComponent = BooleanInput;
        break;
      case 'select':
        InputComponent = SelectInput;
        break;
      case 'multi_select':
        InputComponent = MultiSelectInput;
        inputProps.value = Array.isArray(value) ? value : value ? [value] : [];
        break;
      case 'textarea':
      case 'text_area':
        InputComponent = TextareaInput;
        break;
      case 'date':
        InputComponent = DateInput;
        break;
      default:
        return <div>Unsupported input type</div>;
    }

    return (
      <div className="usa-form-group">
        <InputComponent {...inputProps} />
        {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
      </div>
    );
  };

  const renderQuestionnaireInputs = () => {
    if (ownerType === '-Select-') {
      return null;
    }

    const currentQuestion = ownerType === 'Individual' ? individualQuestion : organizationQuestion;

    if (!currentQuestion || !currentQuestion.grid_questions) {
      return null;
    }

    return (
      <Grid className='grid_questions' row gap='md'>
        {currentQuestion.grid_questions.map((gridQuestion) => (
          <Grid col={6} id={`grid_question--${gridQuestion.name}`} key={gridQuestion.id}>
            {renderInput(gridQuestion)}
          </Grid>
        ))}
      </Grid>
    );
  };

  const getFieldValue = (row: GridRow, fieldName: string): string | string[] => {
    const fullFieldName = Object.keys(row).find(key => key.startsWith(fieldName));
    return fullFieldName ? row[fullFieldName] : '';
  };

  const createOwnerObject = (row: GridRow): OwnerType | null => {
    if (row.owner_type === 'Individual') {
      const owner: OwnerType = {
        ownerType: 'Individual',
        firstName: String(getFieldValue(row, 'first_name')),
        lastName: String(getFieldValue(row, 'last_name')),
        ownershipPercent: String(getFieldValue(row, 'ownership_percentage')),
        emailAddress: String(getFieldValue(row, 'email')),
        socialDisadvantages: Array.isArray(getFieldValue(row, 'individual_contributor_eight_a_social_disadvantage'))
          ? getFieldValue(row, 'individual_contributor_eight_a_social_disadvantage') as string[]
          : [],
        citizenship: String(getFieldValue(row, 'citizenship')),
        gender: String(getFieldValue(row, 'gender')),
        veteranStatus: String(getFieldValue(row, 'veteran_status')),
      };
      const isEligibleOwner = calculateEligibleSbaPrograms([owner]).length > 0;
      return { ...owner, isEligibleOwner };
    } else if (row.owner_type === 'Organization') {
      return {
        ownerType: 'Organization',
        organizationName: String(getFieldValue(row, 'organization_name')),
        ownershipPercent: String(getFieldValue(row, 'organization_ownership_percentage')),
        emailAddress: String(getFieldValue(row, 'organization_email')),
        isEligibleOwner: false,
      };
    }
    return null;
  };

  useEffect(() => {
    const individualAnswers = individualQuestion?.answer?.value?.answer as unknown as GridRow[] || [];
    const organizationAnswers = organizationQuestion?.answer?.value?.answer as unknown as GridRow[] || [];
    const answers = [...individualAnswers, ...organizationAnswers];

    setGridRows(answers);
    const newOwners = answers
      .map(createOwnerObject)
      .filter((owner): owner is OwnerType => owner !== null);
    dispatch(setOwners(newOwners));
    updateOwners(newOwners);

    // Calculate total ownership percentage
    const totalPercentage = answers.reduce((sum, row) => {
      const percentage = parseFloat(
        row.owner_type === 'Individual'
          ? getFieldValue(row, 'ownership_percentage') as string
          : getFieldValue(row, 'organization_ownership_percentage') as string
      ) || 0;
      return sum + percentage;
    }, 0);
    setTotalOwnershipPercentage(totalPercentage);
  }, [individualQuestion, organizationQuestion, setTotalOwnershipPercentage]);

  const saveAnswer = (rows: GridRow[]) => {
    if (userId && contributorId) {
      const individualAnswers = rows
        .filter(row => row.owner_type === 'Individual')
        .map(row => ({
          ...row,
          id: row.id
        }));

      const organizationAnswers = rows
        .filter(row => row.owner_type === 'Organization')
        .map(row => ({
          ...row,
          id: row.id
        }));

      if (individualQuestion) {
        const individualAnswer = {
          profile_answer_flag: individualQuestion.profile_answer_flag,
          application_contributor_id: contributorId,
          value: { answer: individualAnswers },
          question_id: individualQuestion.id,
          answer_by: userId,
          reminder_flag: false,
        };
        axiosInstance.post(ANSWER_ROUTE, [individualAnswer]).catch((error) => {
          console.error('Error saving individual answer:', error);
        });
      }

      if (organizationQuestion) {
        const organizationAnswer = {
          profile_answer_flag: organizationQuestion.profile_answer_flag,
          application_contributor_id: contributorId,
          value: { answer: organizationAnswers },
          question_id: organizationQuestion.id,
          answer_by: userId,
          reminder_flag: false,
        };
        axiosInstance.post(ANSWER_ROUTE, [organizationAnswer]).catch((error) => {
          console.error('Error saving organization answer:', error);
        });
      }
    }
  };

  const validateAllFields = () => {
    const newErrors: ValidationErrors = {};
    const currentQuestion = ownerType === 'Individual' ? individualQuestion : organizationQuestion;
    currentQuestion?.grid_questions?.forEach((gridQuestion) => {
      const error = validateField(gridQuestion.name, currentRow[gridQuestion.name]);
      if (error) {
        newErrors[gridQuestion.name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateTotalPercentage = useCallback(() => {
    const totalPercentage = gridRows.reduce((sum, row) => {
      const percentage = parseFloat(
        row.owner_type === 'Individual'
          ? getFieldValue(row, 'ownership_percentage') as string
          : getFieldValue(row, 'organization_ownership_percentage') as string
      ) || 0;
      return sum + percentage;
    }, 0);
    setTotalOwnershipPercentage(totalPercentage);
  }, [gridRows, setTotalOwnershipPercentage]);

  useEffect(() => {
    updateTotalPercentage();
  }, [gridRows, updateTotalPercentage]);

  const handleAddOrUpdateRow = () => {
    if (ownerType === '-Select-') {
      setErrors({ owner_type: 'Please select an owner type' });
      return;
    }
    if (validateAllFields()) {
      const generateId = (row: GridRow) => {
        let _id = `owner_${row.owner_type === 'Individual'
          ? `${String(getFieldValue(row, 'first_name'))}_${String(getFieldValue(row, 'last_name'))}`
          : String(getFieldValue(row, 'organization_name'))}_${Date.now()}`;
        _id = _id.toLowerCase();
        return _id;
      };

      let newRows;
      if (editingRowIndex !== null) {
        newRows = gridRows.map((row, index) =>
          index === editingRowIndex
            ? { ...row, ...currentRow, owner_type: ownerType, id: generateId({ ...row, ...currentRow, owner_type: ownerType }) }
            : row
        );
      } else {
        const newRow = { ...currentRow, owner_type: ownerType, id: generateId({ ...currentRow, owner_type: ownerType }) };
        newRows = [...gridRows, newRow];
      }
      setGridRows(newRows);
      setCurrentRow({});
      setErrors({});
      setEditingRowIndex(null);
      setOwnerType('-Select-');
      saveAnswer(newRows);

      // Update owners in Redux store
      const newOwners = newRows
        .map(createOwnerObject)
        .filter((owner): owner is OwnerType => owner !== null);
      dispatch(setOwners(newOwners));
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = gridRows.filter((_, i) => i !== index);
    setGridRows(updatedRows);
    saveAnswer(updatedRows);
  };

  const handleEditRow = (index: number) => {
    const rowToEdit = gridRows[index];
    setEditingRowIndex(index);
    setCurrentRow(rowToEdit);
    setOwnerType(rowToEdit.owner_type as string);
  };

  const renderTable = (rows: GridRow[], isOrganization: boolean) => {
    if (rows.length === 0) {return null;}

    const relevantFields = isOrganization
      ? ['organization_name', 'organization_email', 'organization_ownership_percentage']
      : ['first_name', 'last_name', 'email', 'ownership_percentage'];

    const headers = isOrganization
      ? ['Organization Name', 'Organization Email', 'Ownership Percentage']
      : ['First Name', 'Last Name', 'Email', 'Ownership Percentage'];

    return (
      <>
        <h3>{isOrganization ? 'Organization Owners' : 'Individual Owners'}</h3>
        <Table bordered scrollable className='maxw-full'>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr id={`${row.owner_type === 'Individual'
                ? `${String(getFieldValue(row, 'first_name'))}_${String(getFieldValue(row, 'last_name'))}`
                : String(getFieldValue(row, 'organization_name'))}_${Date.now()}`} key={rowIndex}>
                {relevantFields.map((field) => {
                  const value = getFieldValue(row, field);
                  return <td key={field}>{Array.isArray(value) ? value.join(', ') : value}</td>;
                })}
                <td>
                  <Button
                    style={{textDecoration: 'none'}}
                    className='display-flex flex-align-center margin-right-1'
                    type='button'
                    unstyled
                    onClick={() => handleEditRow(gridRows.indexOf(row))}
                  >
                    <Icon.Edit className='margin-right-1' />
                    <span className='mobile:display-none'>Edit</span>
                  </Button>
                  <Button
                    style={{textDecoration: 'none'}}
                    className='display-flex flex-align-center margin-top-1'
                    type='button'
                    unstyled
                    onClick={() => handleDeleteRow(gridRows.indexOf(row))}
                  >
                    <Icon.Delete className='margin-right-1' />
                    <span className='mobile:display-none'>Delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

  return (
    <div className="bg-base-lightest padding-y-2 padding-x-3">
      <Label htmlFor='' className='maxw-full text-bold margin-top-0'>
        Owner Information
      </Label>

      {renderOwnerTypeSelect()}
      {errors.owner_type && <div className="usa-error-message">{errors.owner_type}</div>}
      {renderQuestionnaireInputs()}

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
            setOwnerType('-Select-');
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <Grid>
          {renderTable(gridRows.filter(row => row.owner_type === 'Organization'), true)}
          {renderTable(gridRows.filter(row => row.owner_type === 'Individual'), false)}
        </Grid>
      )}
    </div>
  );
};
