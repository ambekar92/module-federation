import { Checkbox, ErrorMessage, FormGroup } from '@trussworks/react-uswds';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
} & Partial<Pick<HTMLInputElement, 'disabled'| 'required'>>

const CheckboxInput = <T extends FieldValues>({name, label, hint, ...props}: InputProps<T>) => {
  const {control} = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <FormGroup error={!!error}>
          <span className='text-base'>{hint}</span>
          <ErrorMessage>{error?.message}</ErrorMessage>
          <Checkbox
            checked={field.value}
            id={name}
            label={label}
            name={name}
            disabled={props.disabled}
            required={props.required}
            onChange={field.onChange}
          />
        </FormGroup>
      )}
    />
  )
}

export default CheckboxInput
