import { INVITATION_ROUTE } from '@/app/constants/routes'
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { fetcherPOST } from '@/app/services/fetcher-legacy'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import {
  Button,
  ButtonGroup,
  Grid,
  GridContainer,
  Label,
  TextInput
} from '@trussworks/react-uswds'
import Link from 'next/link'
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
import { DelegateFormInputType, DelegatesResponse } from '../utils/types'
import Styles from './DelegateForm.module.scss'
import DelegateTable from './DelegateTable'
import InviteModal from './InviteModal'
import { SEND_INVITATION_DELEGATE } from '@/app/constants/questionnaires'

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
  touchedFields: UseFormStateReturn<DelegateFormInputType>['touchedFields'],
	userDetails: {
		userId: number | null ,
		applicationId: number | null,
		contributorId: number | null
	}
	delegatesData: DelegatesResponse[] | null
}

const fieldKeys: (keyof DelegateFormInputType)[] = [
  'firstName',
  'lastName',
  'email',
]

const DelegateFormInputs = ({
  showModal, handleNext,
  handlePrevious, closeModal,
  control, errors, handleSubmit,
  isValid, setValue, getValues,
  trigger, reset, touchedFields,
  userDetails, delegatesData
}: FormInputInterface) => {
  const { userId, applicationId, contributorId } = userDetails
  const dispatch = useFormDispatch();
  const { delegates } = useFormSelector(selectForm);
  const [showForm, setShowForm] = useState(true);
  const [inviteSent, setInviteSent] = useState(false);
  const { data: session } = useSessionUCMS();
  const [emailValidate, setEmailValidate] = useState(false);
  const [inviteId, setInviteId] = useState<number>();

  useEffect(() => {
    if (delegatesData) {
      if (delegatesData.every(delegate => delegate.invitation_status === 'removed')) {
        dispatch(setDelegates([]));
        setShowForm(true);
        reset({
          firstName: '',
          lastName: '',
          email: '',
        });
      } else {
        setShowForm(false);
        dispatch(setDelegates([{
          id: delegatesData[delegatesData.length - 1].id,
          firstName: delegatesData[delegatesData.length - 1].first_name,
          lastName: delegatesData[delegatesData.length - 1].last_name,
          email: delegatesData[delegatesData.length - 1].email,
          status: delegatesData[delegatesData.length - 1].invitation_status
        }]));
      }
    } else {
      setShowForm(true);
      reset({
        firstName: '',
        lastName: '',
        email: '',
      });
    }
  }, [delegatesData, dispatch, reset]);

  const onSubmit: SubmitHandler<DelegateFormInputType> = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email'], {
      shouldFocus: true,
    })
    const data = getValues()
    if (isValid) {
      if (!userId) {
        alert('You must be signed in to continue.');
        return;
      }
      if(!validateEmail(data.email, session?.user?.email)){
        setEmailValidate(true);
        return;
      } else{
        setEmailValidate(false);
      }

      dispatch(
        addOrUpdateDelegate({
          ...data,
          status: ''
        }),
      )

      reset({
        firstName: '',
        lastName: '',
        email: '',
      })

      dispatch(editDelegate(0))
      delegates.length === 0 && dispatch(updateInputKey())
      setShowForm(false);

      try {
        const entityData = await getEntityByUserId(userId);
        if (!entityData || entityData.length === 0) {
          throw new Error('Entity data not found');
        }

        const postData = {
          application_id: applicationId,
          email: data.email,
          entity_id: entityData[entityData.length - 1].id,
          application_role_id: 5,
          first_name: data.firstName,
          last_name: data.lastName
        };
        // await fetcherPOST(INVITATION_ROUTE, postData);
        const response: DelegatesResponse = await fetcherPOST(INVITATION_ROUTE, postData);
        if(response.id) {
          setInviteId(response.id)
        } else {
          setInviteId(userId);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSend = async () => {
    handleNext();
    try {
      if(!inviteId) {
        console.log('No changes to invitation found');
        closeModal();
        setInviteSent(true);
        return
      }

      const postData = {
        invitation_id: inviteId
      };

      await fetcherPOST(SEND_INVITATION_DELEGATE, postData);
      closeModal();
      setInviteSent(true);
    } catch (error) {
      closeModal();
      // console.log('Error in POST request:', error);
      alert('An error has occurred.');
    }
  };

  const validateEmail = (email: string, userEmail: string | undefined | null) => {
    return email !== userEmail;
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
    if (delegates.length === 0) {
      dispatch(setEditingDelegate(null));
      setInviteSent(false)
    } else {
      setShowForm(false);
    }
  }

  const handleEditDelegate = (index: number) => {
    const delegate = delegates[index]
    if(!delegate) {return;}

    Object.entries(delegate).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'status') {
        setValue(
					key as keyof DelegateFormInputType,
					typeof value !== 'string' ? '' : value,
        )
      }
    })
    dispatch(editDelegate(index))
    setShowForm(true)
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
            Delegate
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
                        errors[key] || (key === 'email' && emailValidate)
                          ? 'icon maxw-full width-full'
                          : 'maxw-full width-full'
                      }
                      onChange={(e) => field.onChange(e)}
                      onBlur={(e) => {
                        field.onBlur();
                        if (key === 'email') {
                          const isValid = validateEmail(e.target.value, session?.user?.email);
                          setEmailValidate(!isValid);
                          if (!isValid) {
                            setValue('email', e.target.value, { shouldValidate: true });
                          }
                        }
                      }}
                      validationStatus={
                        errors[key] || (key === 'email' && emailValidate)
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
                  <span className={(errors[key] && 'text-secondary-dark' || (emailValidate && (key === 'email')) && 'text-secondary-dark') + ''}>
                    {
                      (emailValidate && (key === 'email'))
                        ? 'Email ID should not be same as login user email ID.'
                        : delegateInputDetails[key].fieldHelper
                    }
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
            <DelegateTable />
          </Grid>
        }

      </GridContainer>

      <Grid row gap="sm" className="margin-y-2 flex-justify-end" col={12}>
        <hr className="width-full" />
        <ButtonGroup className="display-flex">
          {inviteSent
            ? (
              <>
                {contributorId
                  ? (
                    <Link
                      href={buildRoute(APPLICATION_STEP_ROUTE, {
                        contributorId: contributorId,
                        stepLink: '/ownership'
                      })}
                      className="float-right usa-button"
                    >
											Next
                    </Link>
                  ): (
                    <Button type='button' disabled>
											Next
                    </Button>
                  )
                }
              </>
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
