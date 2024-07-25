import {
  ErrorMessage,
  FormGroup,
  Label
} from '@trussworks/react-uswds';
import { PropsWithChildren } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import TipTap from './Tiptap';
  
  type Props<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    hint?: string;
  } & PropsWithChildren &
    Partial<Pick<HTMLSelectElement, 'required' | 'disabled' | 'multiple'>>;
  
  const RichText = <T extends FieldValues>({
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
              <TipTap onChange={field.onChange} value={field.value} />
            </>
          </FormGroup>
        )}
      />
    );
  };
  
  export default RichText;