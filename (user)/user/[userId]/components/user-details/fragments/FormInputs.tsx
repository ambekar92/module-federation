import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  Select,
  TextInput,
} from '@trussworks/react-uswds'
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormStateReturn
} from 'react-hook-form'
import { KAFKA_ROUTE } from '../../../../../../constants/routes'
import { filterText, userInputDetails } from '../utils/helpers'
import { FormData, UserFormInputs } from '../utils/types'
import { roleOptions, stateOptions, statusOptions } from './FormOptions'

interface FormInputInterface {
  // eslint-disable-next-line no-unused-vars
  setUserData: (data: FormData) => void
  handleCloseEdit: () => void
  control: Control<UserFormInputs>
  errors: FieldErrors<UserFormInputs>
  handleSubmit: UseFormHandleSubmit<UserFormInputs>
  isValid: boolean
  touchedFields: UseFormStateReturn<UserFormInputs>['touchedFields']
}

const fieldKeys: (keyof UserFormInputs)[] = [
  'title',
  'role',
  'phone',
  'status',
  'address',
  'address2',
  'city',
  'state',
  'zip',
]

const FormInputs = ({
  setUserData,
  handleCloseEdit,
  control,
  errors,
  handleSubmit,
  isValid,
  touchedFields
}: FormInputInterface) => {
  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      //send POST to Kafka
      const response = await fetch(KAFKA_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: JSON.stringify(data) }),
      })
      console.log('Kafka POST response: ', response)
      const formData: FormData = data

      setUserData({ ...formData })
      handleCloseEdit()
    } catch (error) {
      console.error('Kafka POST Error: ', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="width-full">
      <Grid row gap="lg" className="width-full">
        {fieldKeys.map((key) => (
          <Grid
            key={key}
            mobile={{ col: 12 }}
            desktop={{
              col:
                (key === 'city' && 4) ||
                (key === 'state' && 4) ||
                (key === 'zip' && 4) ||
                6,
            }}
          >
            <Label
              className="text-bold"
              htmlFor={`input-${key}`}
              requiredMarker={userInputDetails[key].required}
            >
              {userInputDetails[key].displayName}
            </Label>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <>
                  {userInputDetails[key].inputType === 'text' ? (
                    <TextInput
                      {...field}
                      id={`input-${key}`}
                      type="text"
                      maxLength={userInputDetails[key].maxlength}
                      className={
                        errors[key]
                          ? 'icon maxw-full width-full'
                          : 'maxw-full width-full'
                      }
                      onChange={(e) =>
                        field.onChange(
                          key === 'zip' || key === 'phone'
                            ? filterText(e.target.value, true)
                            : e,
                        )
                      }
                      validationStatus={
                        errors[key]
                          ? 'error'
                          : touchedFields[key]
                            ? 'success'
                            : undefined
                      }
                      value={field.value!}
                    />
                  ) : (
                    <Select
                      {...field}
                      id={`select-${key}`}
                      className={
                        errors[key]
                          ? 'icon maxw-full width-full height-7'
                          : 'maxw-full width-full height-7'
                      }
                      validationStatus={
                        errors[key]
                          ? 'error'
                          : touchedFields[key]
                            ? 'success'
                            : undefined
                      }
                    >
                      {key === 'role'
                        ? roleOptions
                        : key === 'state'
                          ? stateOptions
                          : statusOptions}
                    </Select>
                  )}
                </>
              )}
            />
            <div className="usa-input-helper-text">
              <span className={errors[key] && 'error-message'}>
                {userInputDetails[key].fieldHelper}
              </span>
            </div>
          </Grid>
        ))}
        <Grid className="margin-top-2" col={12}>
          <div className="default-btn float-right">
            <ButtonGroup type="default">
              <Button type="button" outline onClick={() => handleCloseEdit()}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid}>
                Save
              </Button>
            </ButtonGroup>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default FormInputs
