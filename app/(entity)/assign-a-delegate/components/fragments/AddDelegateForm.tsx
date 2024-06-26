import { zodResolver } from '@hookform/resolvers/zod'
import {
  Grid,
  GridContainer,
  Label,
  Button,
  ButtonGroup,
  Alert,
  Radio,
  Link,
} from '@trussworks/react-uswds'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFormSelector } from '../store/hooks'
import { selectForm } from '../store/formSlice'
import DelegateFormInputs from './DelegateFormInputs'
import { DelegateFormSchema } from '../utils/schemas'
import { DelegateFormInputType } from '../utils/types'

function AddDelegateForm() {
  const { delegates } = useFormSelector(selectForm)
  const [option, setOption] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Assign Option', 'Add Delegate', 'Invite Modal']

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
    steps[currentStep] === 'Add Delegate' && setOption('')
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

  const onChange = (selectedOption: string) => {
    setOption(selectedOption)
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
            {/* The delegate must use the email address you are providing below to
            access your application */}
          </Alert>
        </Grid>
      </Grid>
      <Grid className="flex-fill" col={12}>
        <Label className="text-bold" htmlFor="input-radio-question">
          Are You Assigning A Delegate For This Application?
        </Label>
        <Radio
          id="input-radio-yes"
          name="input-radio-question"
          onChange={() => onChange('yes')}
          label="Yes"
        />
        <Radio
          id="input-radio-no"
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
          />
        </Grid>
      )
      }

      {option === 'no' && (
        <Grid row className="margin-top-2 flex-justify-end" col={12}>
          <hr className="width-full" />
          <ButtonGroup className="display-flex">
            <Link
              href={'/application/ownership'}
              className="float-right usa-button"
            >
              Next
            </Link>
          </ButtonGroup>
        </Grid>
      )}
    </GridContainer>
  )
}

export default AddDelegateForm
