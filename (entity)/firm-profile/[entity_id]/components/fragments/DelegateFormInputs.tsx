import { DELEGATES_ROUTE, INVITATION_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { fetcherGET, fetcherPOST, fetcherPUT } from '@/app/services/fetcher'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import {
  Button,
  ButtonGroup,
  Grid,
  GridContainer,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import { useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormStateReturn,
  UseFormTrigger,
} from 'react-hook-form'
import useSWR from 'swr'
import {
  addOrUpdateDelegate,
  editDelegate,
  selectForm,
  setDelegates,
  setEditingDelegate,
  updateInputKey,
} from '../store/formSlice'
import { useFormDispatch, useFormSelector } from '../store/hooks'
import { delegateInputDetails } from '../utils/helpers'
import {
  DelegateFormInputType,
  DelegatesResponse,
  FormDelegateType,
} from '../utils/types'
import Styles from './DelegateForm.module.scss'
import DelegateTable from './DelegateTable'

interface FormInputInterface {
  control: Control<DelegateFormInputType>
  errors: FieldErrors<DelegateFormInputType>
  handleSubmit: UseFormHandleSubmit<DelegateFormInputType>
  isValid: boolean
  setValue: UseFormSetValue<DelegateFormInputType>
  reset: UseFormReset<DelegateFormInputType>
  trigger: UseFormTrigger<DelegateFormInputType>
  getValues: UseFormGetValues<DelegateFormInputType>
  touchedFields: UseFormStateReturn<DelegateFormInputType>['touchedFields']
  userDetails: {
    userId: number | null
    applicationId: number | null
    contributorId: number | null
  }
}

const fieldKeys: (keyof DelegateFormInputType)[] = [
  'firstName',
  'lastName',
  'email',
]

const DelegateFormInputs = ({
  control,
  errors,
  handleSubmit,
  isValid,
  setValue,
  getValues,
  trigger,
  reset,
  touchedFields,
  userDetails,
}: FormInputInterface) => {
  const { userId, applicationId, contributorId } = userDetails
  const dispatch = useFormDispatch()
  const { delegates, editingDelegate } = useFormSelector(selectForm)
  const [showForm, setShowForm] = useState(true)
  const { data: session } = useSessionUCMS()
  const [emailValidate, setEmailValidate] = useState(false)

  const { data: delegatesData, error } = useSWR(
    contributorId ? `${DELEGATES_ROUTE}/${contributorId}` : null,
    fetcherGET<DelegatesResponse[]>,
    { revalidateOnFocus: false },
  )

  useEffect(() => {
    if (delegatesData) {
      setShowForm(false);
      dispatch(setDelegates([{
        id: delegatesData[0].id,
        firstName: delegatesData[0].first_name,
        lastName: delegatesData[0].last_name,
        email: delegatesData[0].email,
      }]));
    }
  }, [delegatesData]);

  if (error) {
    return <></>
  }

  const onSubmit: SubmitHandler<DelegateFormInputType> = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email'], {
      shouldFocus: true,
    })
    const data = getValues()
    if (isValid) {
      if (!userId) {
        alert('You must be signed in to continue.')
        return
      }
      if (data?.email === session?.user?.email) {
        setEmailValidate(true)
        return
      } else {
        setEmailValidate(false)
      }

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

      try {
        const entityData = await getEntityByUserId(userId)
        if (!entityData || entityData.length === 0) {
          throw new Error('Entity data not found')
        }

        if (editingDelegate) {
          const postData = {
            id: userId,
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
          }
          await fetcherPUT(INVITATION_ROUTE, postData)
          // const response = await fetcherPUT(INVITATION_ROUTE, postData);
          // console.log(response)
        } else {
          const postData = {
            application_id: applicationId ? applicationId : 1,
            email: data.email,
            entity_id: entityData[entityData.length - 1].id,
            application_role_id: 5,
            first_name: data.firstName,
            last_name: data.lastName,
          }
          await fetcherPOST(INVITATION_ROUTE, postData)
          // const response = await fetcherPOST(INVITATION_ROUTE, postData);
          // console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClearOrCancel = () => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
    })
    if (delegates.length === 0) {
      dispatch(setEditingDelegate(null))
    } else {
      setShowForm(false)
    }
  }

  const handleEditDelegate = (index: number) => {
    const delegate = delegates[index]
    if (!delegate) {
      return
    }

    Object.entries(delegate).forEach(([key, value]) => {
      if (key !== 'id') {
        setValue(
          key as keyof FormDelegateType,
          typeof value !== 'string' ? '' : value,
        )
      }
    })
    dispatch(editDelegate(index))
    setShowForm(true)
  }

  return (
    <>
      <Grid row className="width-full maxw-full margin-top-2" col={12}>
        <hr className="width-full" />
        <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
          <Label
            className="text-bold font-sans-lg"
            htmlFor="input-radio-question"
          >
            Delegate
          </Label>
        </Grid>
        {!showForm && (
          <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
            <Button
              type="submit"
              outline
              className="margin-top-2 float-right"
              onClick={() => handleEditDelegate(0)}
            >
              Edit
            </Button>
          </Grid>
        )}
      </Grid>

      <GridContainer
        containerSize="widescreen"
        className={
          'width-full maxw-full padding-y-2 margin-top-2 bg-base-lightest'
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={showForm ? 'width-full' : 'display-none'}
        >
          <Grid row className="width-full maxw-full" col={12}>
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
                className={`${key === 'lastName' && 'padding-left-2'} ${Styles.lastName}`}
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
                      onChange={(e) => field.onChange(e)}
                      validationStatus={
                        errors[key] || (emailValidate && key === 'email')
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
                  <span
                    className={
                      (errors[key] && 'text-secondary-dark ') ||
                      (emailValidate &&
                        key === 'email' &&
                        'text-secondary-dark ')
												+ ''
                    }
                  >
                    {emailValidate && key === 'email'
                      ? 'Email ID should not be same as login user email ID.'
                      : delegateInputDetails[key].fieldHelper}
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

                  <div className="margin-left-2">
                    <Button
                      type="button"
                      unstyled
                      onClick={handleClearOrCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </form>

        {!showForm && (
          <Grid row className="margin-right-2 width-full maxw-full">
            <DelegateTable delegatesData={delegatesData} />
          </Grid>
        )}
      </GridContainer>
    </>
  )
}

export default DelegateFormInputs
