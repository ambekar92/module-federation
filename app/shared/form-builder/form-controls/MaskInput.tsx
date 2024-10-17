import { ErrorMessage, FormGroup, Label, TextInputMask } from '@trussworks/react-uswds';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
    maskType: 'number' | 'search' | 'text' | 'email' | 'password' | 'tel' | 'url';
} & Partial<Pick<HTMLInputElement, 'disabled'| 'required' | 'type'>>
// made it work with tel, need to refactor to include other types of masks, like ssn, zip code, etc
const MaskInput = <T extends FieldValues>({name, label, hint, ...props}: InputProps<T>) => {
  const {control} = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <FormGroup error={!!error}>
          <Label error={!!error} htmlFor={name} requiredMarker={props.required}>{label}</Label>
          <span className='text-base'>{hint}</span>
          <ErrorMessage>{error?.message}</ErrorMessage>
          <TextInputMask type={props.maskType} mask='___-___-____' style={{borderRadius: 0, minWidth: '100%'}}
            value={field.value} onChange={field.onChange}

            id={name} name={name} disabled={props.disabled}/>
        </FormGroup>
      )}
    />
  )
}

export default MaskInput
