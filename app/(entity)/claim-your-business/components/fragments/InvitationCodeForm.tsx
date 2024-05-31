import React, { useState } from 'react'
import {
  ButtonGroup,
  Button,
  Label,
  SummaryBox,
  SummaryBoxContent,
  TextInput,
} from '@trussworks/react-uswds'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { InvitationCodeFormSchema } from '../utils/schemas'
import { InvitationCodeInputType } from '../utils/types'
import CustomHeader from '../../../../shared/components/forms/CustomHeader'

interface invitationCodeFormProps {
  submitForm: () => void
}

function InvitationCodeForm({ submitForm }: invitationCodeFormProps) {
  const session = useSession()
  const [showAlert, setShowAlert] = useState(false)

  //mock value for testing error alert prompt
  const validInvitationCode = '123456789012'

  const {
    control,
    getValues,
    reset,
    formState: { errors, touchedFields },
  } = useForm<InvitationCodeInputType>({
    resolver: zodResolver(InvitationCodeFormSchema),
    mode: 'onBlur',
    defaultValues: {
      invitationCode: '',
    },
  })

  const filterText = (text: string, onlyNumbers: boolean = false): string => {
    if (onlyNumbers) {
      // Filter out everything but digits
      return text.replace(/\D/g, '')
    }
    // Filter out non-alphanumeric characters (as per the original function)
    return text.replace(/[^a-zA-Z0-9]/g, '')
  }

  const onSubmit = () => {
    if (validInvitationCode === getValues('invitationCode')) {
      reset({
        invitationCode: '',
      })
      submitForm()
      return
    }
    setShowAlert(true)
  }

  const onClear = () => {
    reset({
      invitationCode: '',
    })
    setShowAlert(false)
  }

  return (
    <section>
      <CustomHeader
        title={`Welcome ${session.data?.user?.name}`}
      ></CustomHeader>
      <p>
        Please enter the 12-digit numeric invitation code that has been sent to
        you.
      </p>
      {showAlert ? (
        <div className="usa-alert usa-alert--error maxw-full width-full">
          <div
            className="usa-alert__body width-full"
            style={{ maxWidth: '100%' }}
          >
            <h4 className="usa-alert__heading">Error status</h4>
            <p className="usa-alert__text">
              This code does not match the user&apos;s account. Please check to
              see that you have entered the correct code.
            </p>
          </div>
        </div>
      ) : null}
      <SummaryBox className="bg:lightBlue">
        <SummaryBoxContent>
          <form>
            <Label
              className="text-bold"
              htmlFor="invitationCode"
              requiredMarker={true}
            >
              Invitation Code
            </Label>
            <Controller
              name="invitationCode"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="invitationCode"
                  type="text"
                  maxLength={12}
                  className={errors['invitationCode'] ? 'icon width-full' : ''}
                  onChange={(e) =>
                    field.onChange(filterText(e.target.value, true))
                  }
                  validationStatus={
                    errors['invitationCode']
                      ? 'error'
                      : touchedFields['invitationCode']
                        ? 'success'
                        : undefined
                  }
                  value={field.value!}
                />
              )}
            />
            <div className={'usa-input-helper-text'}>
              <span className={errors['invitationCode'] && 'text-secondary'}>
                Invitation Code must contain only numeric digits and be 12
                digits length.
              </span>
            </div>
            <ButtonGroup
              className="display-flex flex-justify flex-fill padding-y-2"
              type="default"
            >
              <Button type="button" onClick={onClear}>
                Clear
              </Button>
              <Button
                type="button"
                disabled={
                  errors['invitationCode'] || !touchedFields['invitationCode']
                    ? true
                    : false
                }
                onClick={onSubmit}
              >
                Submit
              </Button>
            </ButtonGroup>
          </form>
        </SummaryBoxContent>
      </SummaryBox>
    </section>
  )
}

export default InvitationCodeForm
