import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import {
  Control,
  UseFormHandleSubmit,
  FieldErrors,
  SubmitHandler,
  Controller,
  UseFormStateReturn,
  UseFormSetValue,
  UseFormReset,
  UseFormTrigger,
  UseFormGetValues,
} from 'react-hook-form'
import { useFormDispatch, useFormSelector } from '../store/hooks'
import { delegateInputDetails, filterText } from '../utils/helpers'
import { DelegateFormInputType } from '../utils/types'
import {
  addOrUpdateDelegate,
  setEditingDelegate,
  updateInputKey,
  selectForm,
  editDelegate,
} from '../store/formSlice'
import DelegateTable from './DelegateTable'
import InviteModal from './InviteModal'

interface FormInputInterface {
  showModal: boolean
  handleNext: () => void
  handlePrevious: () => void
  closeModal: () => void
  control: Control<DelegateFormInputType>
  errors: FieldErrors<DelegateFormInputType>
  handleSubmit: UseFormHandleSubmit<DelegateFormInputType>
  isValid: boolean
  setValue: UseFormSetValue<DelegateFormInputType>
  reset: UseFormReset<DelegateFormInputType>
  trigger: UseFormTrigger<DelegateFormInputType>
  getValues: UseFormGetValues<DelegateFormInputType>
  touchedFields: UseFormStateReturn<DelegateFormInputType>['touchedFields']
}

const fieldKeys: (keyof DelegateFormInputType)[] = [
  'firstName',
  'lastName',
  'email',
]

const DelegateFormInputs = ({
  showModal,
  handleNext,
  handlePrevious,
  closeModal,
  control,
  errors,
  handleSubmit,
  isValid,
  setValue,
  getValues,
  trigger,
  reset,
  touchedFields,
}: FormInputInterface) => {
  const dispatch = useFormDispatch()
  const { delegates } = useFormSelector(selectForm)
  const [showForm, setShowForm] = useState(true)

  const onSubmit: SubmitHandler<DelegateFormInputType> = async (data) => {
    //Need to update with POST Kafka Message when API endpoint is established
    handleAddOrEdit()
  }

  const handleAddOrEdit = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email'], {
      shouldFocus: true,
    })
    const data = getValues()
    if (isValid) {
      // Dispatch the thunk to update delegates
      dispatch(
        addOrUpdateDelegate({
          ...data,
        }),
      )

      reset({
        firstName: '',
        lastName: '',
        email: '',
      })

      dispatch(editDelegate(0))
      delegates.length === 0 && dispatch(updateInputKey())
      setShowForm(false)
    }
  }

  const handleSend = () => {
    closeModal()
    handleNext()
  }

  const handleCancel = () => {
    closeModal()
    handlePrevious()
  }

  const handleClearOrCancel = () => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
    })
    if (delegates.length > 0) {
      dispatch(setEditingDelegate(null))
      setShowForm(false)
    }
  }

  const displayForm = () => {
    setShowForm(true)
  }

  return (
    <>
      <InviteModal
        open={showModal}
        handleSend={handleSend}
        handleCancel={handleCancel}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={showForm ? 'width-full' : 'display-none'}
      >
        <Grid row gap="lg" className="width-full" col={12}>
          {fieldKeys.map((key) => (
            <Grid
              key={key}
              mobile={{ col: 12 }}
              desktop={{
                col:
                  (key === 'firstName' && 6) ||
                  (key === 'lastName' && 6) ||
                  (key === 'email' && 12) ||
                  12,
              }}
            >
              <Label
                className="text-bold"
                htmlFor={`input-${key}`}
                requiredMarker={delegateInputDetails[key].required}
              >
                {delegateInputDetails[key].displayName}
              </Label>
              <Controller
                name={key}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id={`input-${key}`}
                    type="text"
                    maxLength={delegateInputDetails[key].maxlength}
                    className={
                      errors[key]
                        ? 'icon maxw-full width-full'
                        : 'maxw-full width-full'
                    }
                    onChange={(e) =>
                      field.onChange(
                        key === 'firstName' || key === 'lastName'
                          ? filterText(e.target.value, false)
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
                )}
              />
              <div className="usa-input-helper-text">
                <span className={errors[key] && 'error-message'}>
                  {delegateInputDetails[key].fieldHelper}
                </span>
              </div>
            </Grid>
          ))}
          <Grid className="margin-top-2" col={12}>
            <div className="default-btn float-right">
              <ButtonGroup type="default">
                <Button type="button" outline onClick={handleClearOrCancel}>
                  {delegates.length > 0 ? 'Cancel' : 'Clear'}
                </Button>
                <Button type="submit" disabled={!isValid}>
                  {delegates.length > 0 ? 'Update' : 'Add'}
                </Button>
              </ButtonGroup>
            </div>
          </Grid>
        </Grid>
      </form>
      <Grid row gap="lg" className="margin-right-2 width-full">
        <DelegateTable
          setValue={setValue}
          reset={reset}
          displayForm={displayForm}
        />
      </Grid>
    </>
  )
}

export default DelegateFormInputs
