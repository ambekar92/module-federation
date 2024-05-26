import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  Label,
  Radio
} from '@trussworks/react-uswds'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomHeader from '../../../../shared/components/forms/CustomHeader'
import DelegateFormInputs from './DelegateFormInputs'
import { selectForm } from './store/formSlice'
import { useFormSelector } from './store/hooks'
import { DelegateFormSchema } from './utils/schemas'
import { DelegateFormInputType } from './utils/types'

function AddDelegateForm() {
  const { delegates } = useFormSelector(selectForm)
  const [option, setOption] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [delegateStep, setDelegateStep] = useState(0)
  const steps = ['Assign Option', 'Add Delegate', 'Invite Modal']

  const closeModal = () => {
    setShowModal(false)
  }

  const handleNext = () => {
    if (delegateStep < steps.length - 1) {
      if(steps[delegateStep] === 'Add Delegate') {
        setShowModal(true)
      } else {
        setDelegateStep(delegateStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    steps[delegateStep] === 'Add Delegate' && setOption('')
    steps[delegateStep] === 'Invite Sent' && setShowModal(true)
    delegateStep > 0 && setDelegateStep(delegateStep - 1)
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
    <>
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

          {delegateStep !== steps.length - 1 && (
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
      {delegateStep > 0 && delegateStep < steps.length - 1 ? (
        <Grid row className='flex-fill' col={12}>
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
        steps[delegateStep] === 'Assign Option' && (
          <>
            <Grid className='flex-fill' col={12}>
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
      <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
        {delegateStep === 0 ? (
          <Link className='usa-button usa-button--outline' href='/application/control-and-operations'>
						Previous
          </Link>
        ): (
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={delegateStep === 0}
            outline
          >
    				Previous
          </Button>
        )}
        {option === 'no' ? (
          <Link className='usa-button usa-button--outline' href='/select-intended-programs'>
				      Next
          </Link>
        ):(
          <Button
            type="button"
            onClick={handleNext}
            disabled={
              (delegateStep === 0 && option !== 'yes') ||
								delegateStep === steps.length - 1 ||
								(delegateStep === 1 && delegates.length === 0)
            }
          >
      				Next
          </Button>
        )}
      </ButtonGroup>
    </>
  )
}

export default AddDelegateForm
