/* eslint-disable no-unused-vars */
import { Question } from '@/app/shared/types/questionnaireTypes';
import { CharacterCount, DatePicker, Label, Select as UsSelect, TextInput as UsTextInput } from '@trussworks/react-uswds';
import Select from 'react-select';
import TooltipIcon from '../../components/tooltip/Tooltip';
import { useEffect } from 'react';

export const TextInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  return (
    <div className='usa-form-group'>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <UsTextInput
        type='text'
        id={question.name}
        name={question.name}
        value={value}
        className={`${question.name.includes('owner_and_management') && 'maxw-full'}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const EmailInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className='usa-form-group'>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <UsTextInput
        type='email'
        id={question.name}
        name={question.name}
        value={value}
        className={`${question.name.includes('owner_and_management') && 'maxw-full'}`}
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
          e.target.setCustomValidity(validateEmail(newValue) ? '' : 'Please enter a valid email address.');
        }}
        onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
          e.target.setCustomValidity('Please enter a valid email address.');
        }}
      />
    </div>
  );
};

export const PhoneInput: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
  };

  return (
    <div className='usa-form-group'>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
        {question.title}
      </Label>
      <UsTextInput
        type='tel'
        id={question.name}
        name={question.name}
        value={value}
        onChange={(e) => {
          const formatted = formatPhoneNumber(e.target.value);
          onChange(formatted);
        }}
        pattern="\(\d{3}\)-\d{3}-\d{4}"
        className={`${question.name.includes('owner_and_management') && 'maxw-full'}`}
        maxLength={14}
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
      <UsTextInput
        type="number"
        id={question.name}
        name={question.name}
        value={value}
        className={`${question.name.includes('owner_and_management') && 'maxw-full'}`}
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
      <div style={{backgroundColor: 'transparent'}} className="usa-radio display-flex gap-1">
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
      <UsSelect
        id={question.name}
        name={question.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${question.name.includes('owner_and_management') && 'maxw-full'}`}
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
      <div className='display-flex'>
        <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
          {question.title}
        </Label>
        {question.title === '8(a) Social Disadvantage' && <TooltipIcon text="Social Disadvantage - Refers to a number of factors that can impact an individual's ability to compete or advance in society." />}
      </div>
      <Select
        id={question.name}
        classNamePrefix="react-select"
        isMulti
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            marginTop: '0.5rem',
            borderRadius: '0px',
            minHeight: '2.45rem',
            height: '40px',
            borderColor: '#565c65',
            cursor: 'pointer'
          })
        }}
        options={options}
        value={selectedOptions}
        onChange={(selectedOptions) => onChange(selectedOptions ? selectedOptions.map(option => (option as any).value) : [])}
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
interface DateInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ question, value, onChange }) => {
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
