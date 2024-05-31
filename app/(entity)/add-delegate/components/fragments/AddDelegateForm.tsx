import { zodResolver } from '@hookform/resolvers/zod'
import {
  Grid,
  GridContainer,
  Label,
  Button,
  ButtonGroup,
  Alert,
  Radio,
} from '@trussworks/react-uswds'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFormSelector } from '../store/hooks'
import { selectForm } from '../store/formSlice'
import DelegateFormInputs from './DelegateFormInputs'
import { DelegateFormSchema } from '../utils/schemas'
import { DelegateFormInputType } from '../utils/types'
import CustomHeader from '../../../../shared/components/forms/CustomHeader'
import Link from 'next/link'

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
        <Grid col={12}>
          <CustomHeader title="Assign a Delegate">
            <ButtonGroup className="float-right">
              <Button
                className="padding-1 display-flex flex-align-center"
                outline
                type="button"
              >
                <SaveIcon fontSize="medium" className="margin-right-05" /> Save
              </Button>
              <Button
                className="padding-1 display-flex flex-align-center"
                outline
                type="button"
              >
                <CloseIcon fontSize="medium" /> Close
              </Button>
            </ButtonGroup>
          </CustomHeader>
        </Grid>

        <Grid col={12} className="padding-right-5">
          <h2 className="text-light">
            A delegate is a person enabled by the business owner to input
            responses and documents on their behalf. However, the business owner
            is directly responsible and must complete the application’s
            attestation questions and electronically sign the application prior
            to submission. Attestation and signature cannot be fulfilled by a
            delegate.
          </h2>

          {currentStep !== steps.length - 1 && (
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
          )}
        </Grid>
      </Grid>
      {currentStep > 0 && currentStep < steps.length - 1 ? (
        <Grid row gap col={12}>
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
      ) : (
        steps[currentStep] === 'Assign Option' && (
          <>
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
          </>
        )
      )}
      <Grid row gap="lg" className="margin-top-2" col={12}>
        <ButtonGroup className="display-flex flex-justify flex-fill border-top padding-y-2">
          <Button
            className={currentStep === 0 ? 'display-none' : ''}
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {option === 'no' ? (
            <Link className="usa-button" href="/select-intended-programs">
              Next
            </Link>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 0 && option !== 'yes') ||
                currentStep === steps.length - 1 ||
                (currentStep === 1 && delegates.length === 0)
              }
            >
              Next
            </Button>
          )}
        </ButtonGroup>
      </Grid>
    </GridContainer>
  )
}

export default AddDelegateForm
