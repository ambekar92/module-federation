import {
  ErrorMessage,
  FormGroup,
  Label,
} from '@trussworks/react-uswds';
import { PropsWithChildren } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
  
  type Props<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    hint?: string;
    itemId?: any;
    size?: 'sm' | 'lg';
  } & PropsWithChildren &
    Partial<Pick<HTMLSelectElement, 'required' | 'disabled' | 'multiple'>>;
  
 /**
 * `RichText` is a generic component for rendering rich text editors.
 * @template T The type of the form values.
 * @param {React.ReactNode} props.children Children components to be rendered.
 * @param {string} props.name The name of the field.
 * @param {string} props.label The label for the field.
 * @param {string} [props.hint] An optional hint for the field.
 * @param {string | number} props.itemId A unique identifier for the editor instance, required to create a new instance of the editor.
 * @param {'sm' | 'lg'} [props.size] The size of the editor - sm size will show bubble format menu, lg size will show static format menu on the top of the rich text.
 */
  const RichText = <T extends FieldValues>({
    children,
    name,
    label,
    hint,
    itemId,
    size,
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
                style={{maxWidth: 'fit-content'}}
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
              <Editor value={field.value} onChange={field.onChange} style={{minHeight: '10rem'}}  />
            </>
          </FormGroup>
        )}
      />
    );
  };
  
  export default RichText;