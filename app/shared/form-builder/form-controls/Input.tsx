import { ErrorMessage, FormGroup, Label, TextInput } from '@trussworks/react-uswds';
import React from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
} & Partial<Pick<HTMLInputElement, 'disabled'| 'required' | 'type'>>

const Input = <T extends FieldValues>({name, label, hint, ...props}: InputProps<T>) => {
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
          <TextInput value={field.value} onChange={field.onChange} id={name} name={name} type={props.type as any} disabled={props.disabled}/>
        </FormGroup>
      )}
    />
  )
}

export default Input
