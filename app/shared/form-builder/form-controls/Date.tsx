import { DatePicker, ErrorMessage, FormGroup, Label } from '@trussworks/react-uswds';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type DateProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
} & Partial<Pick<HTMLInputElement, 'disabled'| 'required'>>

const Date = <T extends FieldValues>({name, label, hint, ...props}: DateProps<T>) => {
  const {control} = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <FormGroup error={!!error} className="bg-white radius-sm padding-4">
          <Label error={!!error} htmlFor={name} requiredMarker={props.required}>{label}</Label>
          <span className='text-base'>{hint}</span>
          <ErrorMessage>{error?.message}</ErrorMessage>
          <DatePicker
            aria-describedby="appointment-date-hint"
            aria-labelledby="appointment-date-label"
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            disabled={props.disabled}
          />
        </FormGroup>
      )}
    />
  )
}

export default Date
