import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  TextInput,
  GridContainer
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
import { DelegateFormInputType, FormDelegateType } from '../utils/types'
import {
  addOrUpdateDelegate,
  setEditingDelegate,
  updateInputKey,
  selectForm,
  editDelegate,
} from '../store/formSlice'
import DelegateTable from './DelegateTable'
import InviteModal from './InviteModal'
import { INVITATION_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import getApplicationId from '@/app/shared/utility/getApplicationId'

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
  const [inviteSent, setInviteSent] = useState(false)
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id);
    }
  }, [session, status]);

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

  const handleSend = async () => {
    handleNext();

    if (!userId) {
      alert('You must be signed in to continue.');
      return;
    }

    try {
      const entityData = await getEntityByUserId(userId);
      if (!entityData || entityData.length === 0) {
        throw new Error('Entity data not found');
      }

      const applicationData = await getApplicationId(entityData[0].id);
      if (!applicationData || applicationData.length === 0) {
        throw new Error('Application data not found');
      }

      const postData = {
        application_id: applicationData[0].id,
        email: delegates[0].email,
        entity_id: entityData[0].id,
        application_role_id: 5,
        first_name: delegates[0].firstName,
        last_name: delegates[0].lastName
      };

      await fetcherPOST(INVITATION_ROUTE, postData);

      // Uncomment below to see response
      // const response = await fetcherPOST(INVITATION_ROUTE, postData);
      // console.log('POST Response:', response);

      closeModal();
      setInviteSent(true);

    } catch (error) {
      console.error('Error in POST request:', error);
      alert('An error has occurred.');
    }
  };

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

  const handleEditDelegate = (index: number) => {
    const delegate = delegates[index]
    Object.entries(delegate).forEach(([key, value]) => {
      if (key !== 'id') {
        setValue(
          key as keyof FormDelegateType,
          typeof value !== 'string' ? '' : value,
        )
      }
    })
    dispatch(editDelegate(index))
    displayForm()
  }

  return (
    <>
      <InviteModal
        open={showModal}
        handleSend={handleSend}
        handleCancel={handleCancel}
      />

      <Grid row className="width-full margin-top-2" col={12}>
        <hr className="width-full" />
        <Grid
          mobile={{ col: 12 }}
          desktop={{ col: 6 }}
        >
          <Label className="text-bold font-sans-lg" htmlFor="input-radio-question">
            Delegates
          </Label>
        </Grid>
        <Grid
          mobile={{ col: 12 }}
          desktop={{ col: 6 }}
        >
          <Button type="submit" outline className='margin-top-2 float-right' onClick={() => handleEditDelegate(0)}>
            Edit
          </Button>
        </Grid>

      </Grid>

      <GridContainer containerSize="widescreen" className={'width-full padding-y-2 margin-top-2 bg-base-lightest'}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={showForm ? 'width-full' : 'display-none'}
        >
          <Grid row className="width-full" col={12}>
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
                className={key === 'lastName' ? 'padding-left-2' : ''}
              >
                <Label
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
                <div className="usa-input-helper-text margin-top-1">
                  <span className={errors[key] && 'text-secondary-dark'}>
                    {delegateInputDetails[key].fieldHelper}
                  </span>
                </div>
              </Grid>
            ))}
            <Grid className="margin-top-2" col={12}>
              <div className="default-btn">
                <ButtonGroup type="default">
                  <Button type="submit" disabled={!isValid}>
                    {delegates.length > 0 ? 'Update' : 'Add'}
                  </Button>

                  <div className='margin-left-2'>
                    <Button type="button" unstyled onClick={handleClearOrCancel}>
                    Cancel
                    </Button>
                  </div>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </form>

        {!showForm &&
          <Grid row className="margin-right-2 width-full">
            <DelegateTable
              setValue={setValue}
              reset={reset}
              displayForm={displayForm}
            />
          </Grid>
        }

      </GridContainer>

      <Grid row gap="sm" className="margin-y-2 flex-justify-end" col={12}>
        <hr className="width-full" />
        <ButtonGroup className="display-flex">
          {inviteSent
            ? (
              <Link
                href={'/application/ownership'}
                className="usa-button"
              >
								Next
              </Link>
            )
            : (
              <Button
                type="button"
                onClick={() => handleNext()}
                className="display-flex"
                disabled={delegates.length > 0 ? false : true}
              >
            		Continue
              </Button>
            )}

        </ButtonGroup>
      </Grid>
    </>
  )
}

export default DelegateFormInputs
