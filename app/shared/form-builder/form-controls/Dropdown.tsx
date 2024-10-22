import {
  ErrorMessage,
  FormGroup,
  Label,
  Select,
} from '@trussworks/react-uswds';
import { PropsWithChildren } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

  type Props<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    hint?: string;
  } & PropsWithChildren &
    Partial<Pick<HTMLSelectElement, 'required' | 'disabled' | 'multiple'>>;

const Dropdown = <T extends FieldValues>({
  children,
  name,
  label,
  hint,
  ...props
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormGroup error={!!error}>
          <>
            <Label
              error={!!error}
              htmlFor={`${name}-select`}
              requiredMarker={props.required}
            >
              {label}
            </Label>
            <span className='text-base'>{hint}</span>
            <ErrorMessage id="input-error-message">
              {error?.message}
            </ErrorMessage>
            <Select
              disabled={props.disabled}
              id={`${name}-select`}
              name={name}
              // value={field.value}
              onChange={field.onChange}
              multiple={props.multiple}
            >
              {children}
            </Select>
          </>
        </FormGroup>
      )}
    />
  );
};

export default Dropdown;
