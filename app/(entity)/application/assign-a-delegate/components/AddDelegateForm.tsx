import { GET_DELEGATES_ROUTE, INVITATION_ROUTE } from '@/app/constants/local-routes'
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext'
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  GridContainer,
  Label,
  Link,
  Radio,
} from '@trussworks/react-uswds'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { useWorkflowRedirect } from '../../hooks/useWorkflowRedirect'
import { applicationSteps } from '../../utils/constants'
import { selectForm, setDelegates } from '../store/formSlice'
import { useFormDispatch, useFormSelector } from '../store/hooks'
import { DelegateFormSchema } from '../utils/schemas'
import { DelegateFormInputType, DelegatesResponse } from '../utils/types'
import ConfirmRemovalModal from './ConfirmRemoval'
import DelegateFormInputs from './DelegateFormInputs'

function AddDelegateForm() {
  const [option, setOption] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Add Delegate', 'Invite Modal']
  const { delegates } = useFormSelector(selectForm)
  useUpdateApplicationProgress('Delegates');
  const { data: session } = useSessionUCMS();
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext()
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));

  const isDisabled = useMemo(() => {
    if (!session || !applicationData) {return true;}
    return session.user_id !== applicationData?.application_contributor[0].user_id;
  }, [session, applicationData]);

  // Redirects user based on application state and permissions
  useWorkflowRedirect({ applicationData, applicationId, hasDelegateRole });

  const dispatch = useFormDispatch()
  const { data: delegatesData, isLoading, mutate: refetchDelegatesData } = useSWR<DelegatesResponse[]>(
    contributorId ? `${GET_DELEGATES_ROUTE}?contributor_id=${contributorId}` : null,
    { revalidateOnFocus: false }
  )

  const isDelegate =
    delegatesData &&
    delegatesData.length >= 1 &&
    delegatesData[delegatesData.length - 1].invitation_status !== 'removed'

  useEffect(() => {
    if (isDelegate) {
      setOption('yes')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delegatesData])

  const closeModal = () => {
    setShowModal(false)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (steps[currentStep] === 'Add Delegate') {
        setShowModal(true)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    steps[currentStep] === 'Add Delegate' && setShowModal(false)
    steps[currentStep] === 'Invite Sent' && setShowModal(true)
    currentStep > 0 && setCurrentStep(currentStep - 1)
  }

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<DelegateFormInputType>({
    resolver: zodResolver(DelegateFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  const [showRemovalModal, setShowRemovalModal] = useState(false)

  const handleConfirmRemoval = async () => {
    try {
      const delegateId = delegatesData && delegatesData.length > 0
        ? delegatesData[delegatesData.length - 1].id
        : delegates.length > 0
          ? delegates[0].id
          : null;

      if (delegateId) {
        await axios.delete(`${INVITATION_ROUTE}?invitation_id=${delegateId}`);
        dispatch(setDelegates([]));
        reset({
          firstName: '',
          lastName: '',
          email: '',
        });
        setOption('no');

        await refetchDelegatesData();
      }
    } catch (error) {
      // Handled error
    } finally {
      setShowRemovalModal(false);
    }
  }

  const onChange = async (selectedOption: string) => {
    if (selectedOption === 'no') {
      const hasExistingDelegate = (delegatesData && delegatesData.length > 0 && delegatesData[delegatesData.length - 1].invitation_status !== 'removed') || delegates.length > 0;

      if (hasExistingDelegate) {
        setShowRemovalModal(true)
      } else {
        setOption(selectedOption)
      }
    } else if (selectedOption === 'yes') {
      await refetchDelegatesData();
      setOption(selectedOption)
    }
  }

  const handleCancelRemoval = () => {
    setShowRemovalModal(false)
    setOption('yes')
  }

  if(isDisabled) {
    return <p>You are not authorized to view this page</p>
  }
  return (
    <GridContainer
      className="height-full display-flex flex-column padding-x-0"
      containerSize="widescreen"
    >
      <Grid row col={12}>
        <Grid col={12} className="padding-right-5">
          <h2 className="text-light">
            A delegate is a person enabled by the business owner to input
            responses and documents on their behalf. However, the business owner
            is directly responsible and must complete the application&apos;s
            attestation questions and electronically sign the application prior
            to submission. Attestation and signature cannot be fulfilled by a
            delegate.
          </h2>

          <Alert
            className="width-full"
            type="info"
            headingLevel="h3"
            heading="Note"
            slim
          >
            The delegate must use the email address you are providing below to
            access your application
          </Alert>
        </Grid>
      </Grid>

      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Grid className="flex-fill" col={12}>
            <Label className="text-bold" htmlFor="input-radio-question">
              Are You Assigning A Delegate For This Application?
            </Label>
            <Radio
              id="input-radio-yes"
              data-testid="testid-yes-radio-button"
              name="input-radio-question"
              onChange={() => onChange('yes')}
              label="Yes"
              checked={option === 'yes'}
            />
            <Radio
              id="input-radio-no"
              data-testid="testid-no-radio-button"
              name="input-radio-question"
              onChange={() => onChange('no')}
              label="No"
              checked={option === 'no'}
            />
          </Grid>
          {option === 'yes' && (
            <Grid row col={12}>
              <DelegateFormInputs
                showModal={showModal}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                closeModal={closeModal}
                control={control}
                errors={errors}
                handleSubmit={handleSubmit}
                isValid={isValid}
                touchedFields={touchedFields}
                setValue={setValue}
                getValues={getValues}
                trigger={trigger}
                reset={reset}
                userDetails={{ userId, applicationId }}
                delegatesData={isDelegate ? delegatesData : null}
                applicationData={applicationData}
              />
            </Grid>
          )}

          {option === 'no' && (
            <Grid row className="margin-top-2 flex-justify-end" col={12}>
              <hr className="width-full" />
              <ButtonGroup className="display-flex">
                {applicationId ? (
                  <Link
                    href={buildRoute(APPLICATION_STEP_ROUTE, {
                      applicationId: applicationId,
                      stepLink: applicationSteps.ownership.link,
                    })}
                    className="float-right usa-button"
                  >
                    Next
                  </Link>
                ) : (
                  <Button type="button" disabled>
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </Grid>
          )}

          <ConfirmRemovalModal
            open={showRemovalModal}
            handleConfirm={handleConfirmRemoval}
            handleCancel={handleCancelRemoval}
          />
        </>
      )}
    </GridContainer>
  )
}

export default AddDelegateForm
