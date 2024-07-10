import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid, Label, Select as UsSelect, TextInput as UsTextInput, Table, Icon, CharacterCount, DatePicker } from '@trussworks/react-uswds';
import Select from 'react-select';

export const TextInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  return (
    <div className='usa-form-group'>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <UsTextInput
        type='text'
        id={question.name}
        name={question.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export const NumberInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  return (
    <div className='usa-form-group'>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <UsTextInput
        type="number"
        id={question.name}
        name={question.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const BooleanInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  return (
    <div className='usa-form-group'>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <div className="usa-radio display-flex gap-1">
        <input className="usa-radio__input" id={`${question.name}-true`} type="radio" value="Yes" name={question.name} checked={value === 'Yes'} onChange={() => onChange('Yes')} />
        <Label className="usa-radio__label" htmlFor={`${question.name}-true`}>Yes</Label>
        <input className="usa-radio__input" id={`${question.name}-false`} type="radio" value="No" name={question.name} checked={value === 'No'} onChange={() => onChange('No')} />
        <Label className="usa-radio__label margin-left-105" htmlFor={`${question.name}-false`}>No</Label>
      </div>
    </div>
  );
};

export const SelectInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  return (
    <div>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <UsSelect
        id={question.name}
        name={question.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='height-7 radius-lg'
      >
        <option value="">- Select -</option>
        {question.answer_choice && 'options' in question.answer_choice && question.answer_choice.options.map((option, idx) => (
          <option key={idx} value={option.option}>
            {option.option}
          </option>
        ))}
      </UsSelect>
    </div>
  );
};

export const MultiSelectInput: React.FC<{ question: Question; value: string[]; onChange: (value: string[]) => void }> = ({ question, value, onChange }) => {
  const options = question.answer_choice && 'options' in question.answer_choice
    ? question.answer_choice.options.map(option => ({ value: option.option, label: option.option }))
    : [];

  const selectedOptions = value ? value.map(v => options.find(option => option.value === v)).filter(Boolean) : [];

  return (
    <div>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <span className='text-base'>{question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}</span>
      <Select
        id={question.name}
        classNamePrefix="react-select"
        isMulti
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            marginTop: '0.5rem',
            borderRadius: '8px',
            minHeight: '2.45rem',
            height: '56px',
            borderColor: '#565c65',
            cursor: 'pointer'
          })
        }}
        options={options}
        value={selectedOptions}
        onChange={(selectedOptions) => onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
      />
    </div>
  );
};

export const TextareaInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  return (
    <div>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        <span>{question.title}</span>
      </Label>
      <CharacterCount
        id={question.name}
        name={question.name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        maxLength={1000}
        isTextArea
        rows={2}
        aria-describedby={`${question.name}-info ${question.name}-hint`}
      />
    </div>
  );
};

export const DateInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        <span>{question.title}</span>
      </Label>
      <DatePicker
        aria-describedby={`${question.name}-info ${question.name}-hint`}
        aria-labelledby={`${question.name}-info ${question.name}-label`}
        id={question.name}
        name={question.name}
        maxDate={today}
        defaultValue={value}
        onChange={(val?: string) => onChange(val ?? '')}
      />
    </div>
  );
};
