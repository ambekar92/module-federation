// MultiSelectInputComponent.tsx
import { Label } from '@trussworks/react-uswds';
import Select, { MultiValue } from 'react-select';

interface MultiSelectInputComponentProps {
  label: string;
  inputId: string;
  options: { value: string; label: string }[];
  handleChange: (selectedOptions: MultiValue<{ value: string; label: string }>) => void;
  selectedOptions: MultiValue<{ value: string; label: string }>;
  isOptionDisabled?: (option: { value: string; label: string }) => boolean;
	isSubQuestion?: boolean;
}

export const MultiSelectInput = ({
  label,
  inputId,
  options,
  handleChange,
  selectedOptions,
  isOptionDisabled,
  isSubQuestion
}: MultiSelectInputComponentProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Label className='maxw-full' htmlFor={inputId}>{label}</Label>
    <Select
      data-testid="multi-select-input"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          marginTop: '0.5rem',
          borderRadius: '8px',
          minHeight: '2.45rem',
          height: '56px',
          borderColor: '#565c65',
          outline: state.isFocused ? '3px solid #0f73ff' : '',
          cursor: 'pointer'
        })
      }}
      options={options}
      isMulti
      onChange={handleChange}
      value={selectedOptions}
      isOptionDisabled={isOptionDisabled}
    />
  </div>
);
