import {
    CharacterCount,
    ErrorMessage,
    FormGroup,
    Label,
    Textarea,
  } from '@trussworks/react-uswds';
  import { ReactNode } from 'react';
  import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
  
  type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string | ReactNode | ReactNode[];
    charLimit?: number;
    hint?: string;
  } & Partial<Pick<HTMLTextAreaElement, 'required' | 'disabled'>>;
  
  const TextArea = <T extends FieldValues>({
    name,
    label,
    charLimit,
    hint,
    ...rest
  }: Props<T>) => {
    const { control } = useFormContext<T>();
  
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormGroup error={!!error}>
            <Label
              style={{maxWidth: 'fit-content'}}
              htmlFor="input-error"
              error={!!error}
              className="padding-bottom-1"
              requiredMarker={rest.required}
            >
              {label}
            </Label>
            <span className='text-base'>{hint}</span>
            <ErrorMessage id="input-error-message">{error?.message}</ErrorMessage>
            {!!!charLimit && (
              <Textarea
                disabled={rest.disabled}
                value={field.value}
                onChange={field.onChange}
                id={name}
                name={name}
                style={{maxWidth: '50rem'}}
                error={!!error}
              />
            )}
            {!!charLimit && (
              <CharacterCount
                disabled={rest.disabled}
                error={!!error}
                id="with-hint-textarea"
                name={name}
                value={field.value}
                onChange={field.onChange}
                maxLength={charLimit}
                isTextArea
                style={{maxWidth: '50rem'}}
                rows={2}
                aria-describedby="with-hint-textarea-info with-hint-textarea-hint"
              />
            )}
          </FormGroup>
        )}
      />
    );
  };
  
  export default TextArea;