import { tooltipCmbInvite } from '@/app/constants/tooltips'
import { useSessionUCMS } from '@/app/lib/auth'

import Tooltip from '@/app/shared/components/tooltip/Tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  SummaryBox,
  SummaryBoxContent,
  TextInput,
} from '@trussworks/react-uswds'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomHeader from '../../../../shared/components/forms/CustomHeader'
import { InvitationCodeFormSchema } from '../../utils/schemas'
import { InvitationCodeInputType } from '../../utils/types'
import axios from 'axios'
import { ACCEPT_INVITATION_ROUTE } from '@/app/constants/local-routes'
import { useRouter } from 'next/navigation'
import { CONTRIBUTOR_DASHBOARD_PAGE, DASHBOARD, DELEGATE_DASHBOARD_PAGE } from '@/app/constants/url'

interface invitationCodeFormProps {
	onEnterCodeCancel: () => void
	cancelText?: string
}

function InvitationCodeForm({ onEnterCodeCancel, cancelText = 'Back' }: invitationCodeFormProps) {
  const session = useSessionUCMS()
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  const {
    control,
    getValues,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<InvitationCodeInputType>({
    resolver: zodResolver(InvitationCodeFormSchema),
    mode: 'onBlur',
    defaultValues: {
      invitationCode: '',
    },
  })

  const invitationCode = watch('invitationCode');
  const filterText = (text: string, onlyNumbers: boolean = false): string => {
    if (onlyNumbers) {
      // Filter out everything but digits
      return text.replace(/\D/g, '')
    }
    // Filter out non-alphanumeric characters (as per the original function)
    return text.replace(/[^a-zA-Z0-9]/g, '')
  }

  const onSubmit = async () => {
    const response = await axios.post(ACCEPT_INVITATION_ROUTE,
      {
        invitation_code: getValues('invitationCode'),
        user_id: session.data?.user?.id,
      });
    if (response.status === 200 && response.data.detail !== 'No invitation record found.' && response.data.invitation_code !== 'This field may not be blank.') {
      reset({
        invitationCode: '',
      })
      if(response.data.application_role) {
        switch(response.data.application_role) {
          case 'delegate':
            router.push(DELEGATE_DASHBOARD_PAGE)
            break;
          case 'spouse':
          case 'contributor':
          case 'qualifying-owner':
            router.push(CONTRIBUTOR_DASHBOARD_PAGE)
            break;
          default:
            router.push(DASHBOARD)
            break;
        }
      }
      if(response.data.detail && response.data.detail !== 'No invitation record found.' || response.data.detail !== 'invitation code already used.') {
        setShowAlert(true)
      }
    } else {
      setShowAlert(true)
    }
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
      <h3>
        Please enter the invitation code that has been sent to
        you.
      </h3>
      {showAlert ? (
        <div className="usa-alert usa-alert--error maxw-full width-full">
          <div className="usa-alert__body maxw-full width-full">
            <h4 className="usa-alert__heading">Error</h4>
            <p className="usa-alert__text">
              This code does not match the user&apos;s account or is already used. Please check to
              see that you have entered the correct code.
            </p>
          </div>
        </div>
      ) : null}
      <SummaryBox className="bg:lightBlue">
        <SummaryBoxContent>
          <form>
            <Grid row>
              <Label
                className="text-bold margin-top-0"
                htmlFor="invitationCode"
                requiredMarker={true}
              >
              	Invitation Code
              </Label>
              <Tooltip text={tooltipCmbInvite}/>
            </Grid>
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
                    field.onChange(filterText(e.target.value, false))
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
              <span className={errors['invitationCode'] && 'text-secondary-dark'}>
                Invitation Code must contain only alphanumeric digits.
              </span>
            </div>
            <ButtonGroup
              className="display-flex flex-justify flex-fill padding-y-2"
              type="default"
            >
              {invitationCode === '' ? (
                <Button type="button" onClick={onEnterCodeCancel}>
                	{cancelText}
                </Button>
              ): (
                <Button type="button" onClick={onClear}>
                Clear
                </Button>
              )}
              <Button
                type="button"
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
