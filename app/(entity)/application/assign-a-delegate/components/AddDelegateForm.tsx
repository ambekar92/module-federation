import { DELEGATES_ROUTE, INVITATION_ROUTE } from '@/app/constants/routes'
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext'
import useFetchOnce from '@/app/shared/hooks/useFetchOnce'
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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { applicationSteps } from '../../utils/constants'
import { setDelegates } from '../store/formSlice'
import { useFormDispatch } from '../store/hooks'
import { DelegateFormSchema } from '../utils/schemas'
import { DelegateFormInputType, DelegatesResponse } from '../utils/types'
import DelegateFormInputs from './DelegateFormInputs'

type DeleteDelegateType = {
  invitation_id: number
}

function AddDelegateForm() {
  const [option, setOption] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Add Delegate', 'Invite Modal']
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext()
  const dispatch = useFormDispatch()

  const { data: delegatesData, isLoading } = useFetchOnce<DelegatesResponse[]>(
    contributorId ? `${DELEGATES_ROUTE}/${contributorId}` : null,
    fetcher,
    { revalidateOnFocus: false },
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

  const onChange = async (selectedOption: string) => {
    if (selectedOption === 'no') {
      dispatch(setDelegates([]))
      reset({
        firstName: '',
        lastName: '',
        email: '',
      })
      if (delegatesData) {
        try {
          await axiosInstance.delete(
            `${INVITATION_ROUTE}?invitation_id=${delegatesData[delegatesData?.length - 1].id}`,
          )
        } catch (error) {
          // Error handled lol -KJ
        }
      }
    } else if (selectedOption === 'yes') {
      dispatch(setDelegates([]))
    }
    setOption(selectedOption)
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <GridContainer
      className="height-full display-flex flex-column"
      containerSize="widescreen"
    >
      <Grid row col={12}>
        <Grid col={12} className="padding-right-5">
          <h2 className="text-light">
            A delegate is a person enabled by the business owner to input
            responses and documents on their behalf. However, the business owner
            is directly responsible and must complete the application’s
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
          defaultChecked={isDelegate ? true : false}
        />
        <Radio
          id="input-radio-no"
          data-testid="testid-no-radio-button"
          name="input-radio-question"
          onChange={() => onChange('no')}
          label="No"
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
    </GridContainer>
  )
}

export default AddDelegateForm
