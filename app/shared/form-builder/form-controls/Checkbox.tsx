import { Checkbox, ErrorMessage, FormGroup, Label, TextInput } from '@trussworks/react-uswds';
import React from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
} & Partial<Pick<HTMLInputElement, 'disabled'| 'required'>>

const Input = <T extends FieldValues>({name, label, hint, ...props}: InputProps<T>) => {
  const {control} = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <FormGroup error={!!error}>
          <span className='text-base'>{hint}</span>
          <ErrorMessage>{error?.message}</ErrorMessage>
          <Checkbox label={label} style={{borderRadius: 0}} 
          checked={field.value}
          value={field.value} onChange={field.onChange} id={name} name={name} disabled={props.disabled}/>
        </FormGroup>
      )}
    />
  )
}

export default Input
