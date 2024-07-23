'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Fieldset,
  Grid,
  GridContainer,
  Label,
  TextInput
} from '@trussworks/react-uswds'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationFormData, RegistrationFormSchema } from './schema'
import { useState } from 'react'

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationFormSchema),
    mode: 'onBlur', // Validates on blur
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async () => {
    const isValid = await trigger([], { shouldFocus: true })

    if(isValid) {
      // eslint-disable-next-line no-console
      console.log('Success')
    }
  };

  return (
    <div className="bg-base-lightest">
    	<GridContainer className="usa-section">
        <Grid row className="margin-x-neg-205 flex-justify-center">
          <Grid col={12} mobileLg={{ col: 10 }} tablet={{ col: 8 }} desktop={{ col: 6 }} className="padding-x-205 margin-bottom-4">
            <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">

              <h1 className="margin-bottom-0">Create account</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset legend="Get started with an account.">

                  <p>
                    <abbr title="required" className="usa-hint usa-hint--required">*</abbr> Indicates a required field.
                  </p>

                  <Label htmlFor="email" requiredMarker>Email address</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <TextInput
                          id="email" type="email" {...field}
                          validationStatus={errors['email'] ? 'error' : touchedFields['email'] ? 'success' : undefined}
                        />
                        {error && <div className="margin-top-1">
                          <span className="usa-input-helper-text error-message">
                            {error.message || 'Required Field'}
                          </span>
                        </div>}
                      </>
                    )}
                  />

                  <Label htmlFor="password" requiredMarker>Create password</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <TextInput
                          id="password"
                          type={showPassword ? 'text' : 'password'} {...field}
                          validationStatus={errors['password'] ? 'error' : touchedFields['password'] ? 'success' : undefined}
                        />
                        <button
                          title=""
                          type="button"
                          className="usa-show-password margin-top-1"
                          aria-controls="password-create-account password-create-account-confirm"
                          data-show-text="Show password"
                          data-hide-text="Hide password"
                          onClick={toggleShowPassword}
                        >
                    			Show password
                        </button>
                        {error && <div className="margin-top-1">
                          <span className="usa-input-helper-text error-message">
                            {error.message || 'Required Field'}
                          </span>
                        </div>}
                      </>
                    )}
                  />

                  <Label htmlFor="repassword" requiredMarker>Re-type password</Label>
                  <Controller
                    name="repassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <TextInput
                          id="repassword"
                          type="password" {...field}
                          validationStatus={errors['repassword'] ? 'error' : touchedFields['repassword'] ? 'success' : undefined}
                        />
                        {error && <div className="margin-top-1">
                          <span className="usa-input-helper-text error-message">
                            {error.message || 'Required Field'}
                          </span>
                        </div>}
                      </>
                    )}
                  />

                  <Button type="submit" className="margin-top-3">Create account</Button>
                </Fieldset>
              </form>
            </div>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
};

export default RegistrationForm;
