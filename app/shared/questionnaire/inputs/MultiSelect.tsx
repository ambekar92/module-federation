import React, { useEffect, useState } from 'react';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Label } from '@trussworks/react-uswds';
import Select, { MultiValue } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectInputComponentProps {
  question: Question;
  inputId: string;
  options: OptionType[];
  handleChange: (selectedOptions: MultiValue<OptionType>) => void;
  isOptionDisabled?: (option: OptionType) => boolean;
  isSubQuestion?: boolean;
	isGridQuestion?: boolean;
}

export const MultiSelectInput = ({
  question,
  inputId,
  options,
  handleChange,
  isOptionDisabled,
  isSubQuestion,
  isGridQuestion
}: MultiSelectInputComponentProps) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);

  useEffect(() => {
    if (question.answer?.value?.answer) {
      const initialSelectedOptions = Array.isArray(question.answer.value.answer) ?  question.answer.value.answer.map((option: string) => ({
        value: option,
        label: option
      })) : [];
      setSelectedOptions(initialSelectedOptions);
    }
  }, [question.answer]);

  const combinedOptions = [
    ...options,
    ...selectedOptions.filter(option => !options.some(opt => opt.value === option.value))
  ];

  const handleSelectChange = (newValue: MultiValue<OptionType>) => {
    setSelectedOptions(newValue);
    handleChange(newValue);
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        {question.title}
      </Label>
      <Select
        data-testid="multi-select-input"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            marginTop: '0.5rem',
            borderRadius: '0px',
            minHeight: '2.45rem',
            height: '40px',
            borderColor: '#565c65',
            outline: state.isFocused ? '3px solid #0f73ff' : '',
            cursor: 'pointer'
          })
        }}
        options={combinedOptions}
        isMulti
        onChange={handleSelectChange}
        value={isGridQuestion ? [] : selectedOptions}
        isOptionDisabled={isOptionDisabled}
      />
    </div>
  );
};
