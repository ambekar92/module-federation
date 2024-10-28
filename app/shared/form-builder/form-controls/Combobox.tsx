import {
  ComboBox,
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
    options: any[];
    defaultValue?: any;
  } & PropsWithChildren &
    Partial<Pick<HTMLSelectElement, 'required' | 'disabled' | 'multiple'>>;

const Combobox = <T extends FieldValues>({
  children,
  name,
  label,
  hint,
  options,
  ...props
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormGroup error={!!error} className="bg-white radius-sm">
          <>
            <Label
              error={!!error}
              htmlFor={`${name}-combobox`}
              requiredMarker={props.required}
            >
              {label}
            </Label>
            <span className='text-base'>{hint}</span>
            <ErrorMessage id="input-error-message">
              {error?.message}
            </ErrorMessage>
            <ComboBox options={options}
              disabled={props.disabled}
              id={`${name}-combobox`}
              name={name}
              defaultValue={props.defaultValue}
              onChange={field.onChange}

            />
          </>
        </FormGroup>
      )}
    />
  );
};

export default Combobox;
