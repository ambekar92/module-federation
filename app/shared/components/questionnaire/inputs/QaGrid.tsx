
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid, Label, Select as UsSelect, TextInput, Table, Icon, CharacterCount, DateRangePicker } from '@trussworks/react-uswds';
import { useState } from 'react';
import Select from 'react-select';

type GridRow = {
  [key: string]: string | string[];
};

type ValidationErrors = {
  [key: string]: string;
};

const QaGrid = ({ question }: { question: Question }) => {
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentRow, setCurrentRow] = useState<GridRow>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string | string[]) => {
    const gridQuestion = question.grid_questions?.find(q => q.name === name);
    if (gridQuestion?.answer_required_flag && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${gridQuestion.title} is required.`;
    }
    return '';
  };

  const validateAllFields = () => {
    const newErrors: ValidationErrors = {};
    question.grid_questions?.forEach(gridQuestion => {
      const error = validateField(gridQuestion.name, currentRow[gridQuestion.name]);
      if (error) {
        newErrors[gridQuestion.name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrUpdateRow = () => {
    if (validateAllFields()) {
      if (editingIndex !== null) {
        setGridRows(prevRows => {
          const updatedRows = [...prevRows];
          updatedRows[editingIndex] = { ...currentRow };
          return updatedRows;
        });
        setEditingIndex(null);
      } else {
        setGridRows(prevRows => [...prevRows, { ...currentRow }]);
      }
      setCurrentRow({});
      setErrors({});
    }
  };

  const handleEditRow = (index: number) => {
    setCurrentRow(gridRows[index]);
    setEditingIndex(index);
    setErrors({});
  };

  const handleDeleteRow = (index: number) => {
    setGridRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  const handleInputChange = (questionName: string, value: string | string[]) => {
    setCurrentRow(prevRow => ({
      ...prevRow,
      [questionName]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [questionName]: validateField(questionName, value)
    }));
  };

  const handleBlur = (questionName: string, value: string | string[]) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [questionName]: validateField(questionName, value)
    }));
  };

  const renderInput = (gridQuestion: Question) => {
    const inputId = `input-${gridQuestion.id}`;
    const errorMessage = errors[gridQuestion.name];

    const commonProps = {
      id: inputId,
      name: gridQuestion.name,
      value: currentRow[gridQuestion.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(gridQuestion.name, e.target.value),
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => handleBlur(gridQuestion.name, e.target.value),
      className: errorMessage ? 'border-secondary' : ''
    };

    switch (gridQuestion.question_type) {
      case 'text':
      case 'number':
        return (
          <div className='usa-form-group'>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={inputId}>
              {gridQuestion.title}
            </Label>
            <TextInput
              {...commonProps}
              type={gridQuestion.question_type}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'boolean':
        return (
          <div className='usa-form-group'>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={inputId}>
              {gridQuestion.title}
            </Label>
            <div className="usa-radio display-flex gap-1">
              <input className="usa-radio__input" id={`${inputId}-true`} type="radio" value="Yes" name={gridQuestion.name} checked={currentRow[gridQuestion.name] === 'Yes'} onChange={() => handleInputChange(gridQuestion.name, 'Yes')} />
              <Label className="usa-radio__label" htmlFor={`${inputId}-true`}>Yes</Label>
              <input className="usa-radio__input" id={`${inputId}-false`} type="radio" value="No" name={gridQuestion.name} checked={currentRow[gridQuestion.name] === 'No'} onChange={() => handleInputChange(gridQuestion.name, 'No')} />
              <Label className="usa-radio__label margin-left-105" htmlFor={`${inputId}-false`}>No</Label>
            </div>
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'select':
        return (
          <div>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={inputId}>
              {gridQuestion.title}
            </Label>
            <UsSelect
              value={currentRow[gridQuestion.name] || ''}
              onBlur={(e) => handleBlur(gridQuestion.name, e.target.value)}
              onChange={(e) => handleInputChange(gridQuestion.name, e.target.value)}
              id={inputId}
              name={gridQuestion.name}
              className={`height-7 radius-lg ${errorMessage ? 'border-secondary' : ''}`}
            >
              <option value="">- Select -</option>
              {gridQuestion.answer_choice && 'options' in gridQuestion.answer_choice && gridQuestion.answer_choice.options.map((option, idx) => (
                <option key={idx} value={option.option}>
                  {option.option}
                </option>
              ))}
            </UsSelect>
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'multi_select':
        return (
          <div>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={inputId}>
              {gridQuestion.title}
            </Label>
            <Select
              id={inputId}
              classNamePrefix="react-select"
              isMulti
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  marginTop: '0.5rem',
                  borderRadius: '8px',
                  minHeight: '2.45rem',
                  height: '56px',
                  borderColor: errorMessage ? '#b50909' : '#565c65',
                  cursor: 'pointer'
                })
              }}
              options={gridQuestion.answer_choice && 'options' in gridQuestion.answer_choice ? gridQuestion.answer_choice.options.map(option => ({ value: option.option, label: option.option })) : []}
              value={currentRow[gridQuestion.name] ? currentRow[gridQuestion.name].map((value: any) => ({ value, label: value })) : []}
              onChange={(selectedOptions) => handleInputChange(gridQuestion.name, selectedOptions ? selectedOptions.map(option => option.value) : [])}
              onBlur={() => handleBlur(gridQuestion.name, currentRow[gridQuestion.name] || [])}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'textarea':
        return (
          <div>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={inputId}>
              <span>{gridQuestion.title}</span>
            </Label>
            <CharacterCount
              id={inputId}
              name={gridQuestion.name}
              onBlur={() => handleBlur(gridQuestion.name, currentRow[gridQuestion.name])}
              maxLength={1000}
              isTextArea
              rows={2}
              aria-describedby={`${inputId}-info ${inputId}-hint`}
            />
            {errorMessage && <div className='margin-top-1'><span className="text-secondary-dark">{errorMessage}</span></div>}
          </div>
        );
      case 'date':
        return (
          <div>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={inputId}>
              <span>{gridQuestion.title}</span>
            </Label>
            <DateRangePicker
              id={inputId}
              endDateHint="mm/dd/yyyy"
              onChange={(dates) => {
                handleInputChange(gridQuestion.name + '-start', dates.startDate);
                handleInputChange(gridQuestion.name + '-end', dates.endDate);
              }}
              onBlur={() => {
                handleBlur(gridQuestion.name + '-start', currentRow[gridQuestion.name + '-start'] || '');
                handleBlur(gridQuestion.name + '-end', currentRow[gridQuestion.name + '-end'] || '');
              }}
              endDateLabel='Event end date'
              endDatePickerProps={{
                disabled: false,
                id: 'event-date-end',
                name: gridQuestion.name + '-end',
                value: currentRow[gridQuestion.name + '-end'] || ''
              }}
              startDateHint="mm/dd/yyyy"
              aria-describedby={`${gridQuestion.name}-info ${gridQuestion.name}-hint`}
              startDateLabel='Event start date'
              startDatePickerProps={{
                disabled: false,
                id: 'event-date-start',
                name: gridQuestion.name + '-start',
                value: currentRow[gridQuestion.name + '-start'] || ''
              }}
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
    <>
      <Label htmlFor='' className='maxw-full text-bold' requiredMarker={question.answer_required_flag}>{question.title}</Label>
      <Grid row gap='md'>
        {question.grid_questions?.map(gridQuestion => (
          <Grid col={6} key={gridQuestion.id}>
            {renderInput(gridQuestion)}
          </Grid>
        ))}
      </Grid>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddOrUpdateRow}>{editingIndex !== null ? 'Update' : 'Add'}</Button>
        <Button type='button' unstyled className='padding-x-2' onClick={() => {setCurrentRow({}); setErrors({});}}>Cancel</Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <Table bordered fullWidth>
          <thead>
            <tr>
              {question.grid_questions?.map(gridQuestion => (
                <th key={gridQuestion.id}>{gridQuestion.title}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, index) => (
              <tr key={index}>
                {question.grid_questions?.map(gridQuestion => (
                  <td key={gridQuestion.id}>
                    {Array.isArray(row[gridQuestion.name])
                      ? (row[gridQuestion.name] as string[]).join(', ')
                      : row[gridQuestion.name] as string}
                  </td>
                ))}
                <td>
                  <Button className='display-flex flex-align-center' type="button" unstyled onClick={() => handleEditRow(index)}>
                    <Icon.Edit className='margin-right-1' /><span className='mobile:display-none'>Edit</span>
                  </Button>
                  <Button className='display-flex flex-align-center margin-top-1' type="button" unstyled onClick={() => handleDeleteRow(index)}>
                    <Icon.Delete className='margin-right-1' /><span className='mobile:display-none'>Delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default QaGrid;
