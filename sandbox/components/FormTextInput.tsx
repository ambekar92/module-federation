import { filterText, formatPhoneNumber, formatSSN } from '@/app/shared/utility/helpers'
import { Label, TextInput } from '@trussworks/react-uswds'

/**
 * If additional text input states are added may be a lot more viable as of 6/19 we only have error state
 * Another option may be to add custom css to the inputs globally
 *  -KJ
 */

interface IFormTextInput {
  className?: string
  key?: string | number
  label?: string
  helperText?: string
  errorMessage?: string
  validationStatus?: string | any
  required?: boolean
  maxLength?: number | any
  field?: any
  placeholder?: string
  format?: string
  name?: string
  type?: string
}

const FormTextInput = ({
  className = '',
  key = '',
  label = '',
  helperText = '',
  errorMessage = '',
  validationStatus = undefined,
  required = false,
  maxLength = undefined,
  field = undefined,
  placeholder = '',
  format = 'none',
  name = '',
  type = 'text',
}: IFormTextInput) => {
  const formatInput = (format: string, value: string) => {
    switch (format) {
      case 'ssn':
        return formatSSN(value)
      case 'phone':
        return formatPhoneNumber(value)
      case 'number':
        return filterText(value, true)
      case 'text':
        return filterText(value)
      case 'none':
      default:
        return value
    }
  }

  return (
    <>
      {label && (
        <Label htmlFor={`Formtextinput-${key}`} requiredMarker={required}>
          {label}
        </Label>
      )}
      <TextInput
        {...field}
        id={`textinput-${key}`}
        name={name}
        type={type}
        maxLength={maxLength}
        className={
          className + validationStatus === 'error' ? 'icon width-full' : ''
        }
        onChange={(e) => {
          if (field) {
            format === 'none'
              ? field.onChange
              : field.onChange(formatInput(format, e.target.value))
          } else {
            e.target.value = formatInput(format, e.target.value)
          }
        }}
        validationStatus={validationStatus}
        value={field?.value ?? ''}
        placeholder={placeholder}
      />
      {helperText && (
        <div className={'usa-input-helper-text margin-top-1'}>
          <span
            className={
              validationStatus &&
              validationStatus === 'error' &&
              'text-secondary'
            }
          >
            {errorMessage && validationStatus === 'error'
              ? errorMessage
              : helperText}
          </span>
        </div>
      )}
    </>
  )
}

export default FormTextInput
