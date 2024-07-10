'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GridContainer,
  Grid,
  Header,
  Title,
  Link,
  Fieldset,
  TextInput,
  Label,
  Button,
} from '@trussworks/react-uswds'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SignInFormData, SignInFormSchema } from './Schema'
import { TESTER_LOGIN_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'

export default {
  title: 'Page Templates/Sign In',
  parameters: {
    options: {
      showPanel: false,
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
  Page templates
  `,
      },
    },
  },
}

const returnToTop = (
  <GridContainer className="usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </GridContainer>
)

export const SignIn = (): React.ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    trigger,
    control,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<SignInFormData> = async () => {
    const isValid = await trigger([], { shouldFocus: true })
    if (isValid) {
      // eslint-disable-next-line no-console
      console.log('Success')
    }
  }

  const handleSignIn = async () => {
    try {
      const postData = {
        username: getValues('email'),
        password: getValues('password'),
      }

      await fetcherPOST(TESTER_LOGIN_ROUTE, postData)
    } catch (error: any) {
      console.error('Network Error: ', error)
      return
    }
  }

  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <a href="/" title="Home" aria-label="Home">
              Tester Login Page
            </a>
          </Title>
        </div>
      </Header>

      <main id="main-content">
        <div className="bg-base-lightest">
          <GridContainer className="usa-section">
            <Grid row={true} className="flex-justify-center">
              <Grid col={12} tablet={{ col: 8 }} desktop={{ col: 6 }}>
                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-0">Sign in</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset legend="Access your account" legendStyle="large">
                      <Label htmlFor="email">Email address</Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextInput
                              id="email"
                              type="email"
                              {...field}
                              validationStatus={
                                errors['email']
                                  ? 'error'
                                  : touchedFields['email']
                                    ? 'success'
                                    : undefined
                              }
                              required={true}
                            />
                            {error && (
                              <div className="margin-top-1">
                                <span className="usa-input-helper-text error-message">
                                  {error.message || 'Required Field'}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      />

                      <Label htmlFor="password-sign-in">Password</Label>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextInput
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              {...field}
                              validationStatus={
                                errors['password']
                                  ? 'error'
                                  : touchedFields['password']
                                    ? 'success'
                                    : undefined
                              }
                            />

                            <button
                              title="Show password"
                              type="button"
                              className="usa-show-password"
                              aria-controls="password-sign-in"
                              onClick={(): void =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? 'Hide password' : 'Show password'}
                            </button>
                            {error && (
                              <div className="margin-top-1">
                                <span className="usa-input-helper-text error-message">
                                  {error.message || 'Required Field'}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      />

                      <Button type="button" onClick={handleSignIn}>
                        Sign in
                      </Button>

                      <p>
                        <Link href="javascript:void();">Forgot password?</Link>
                      </p>
                    </Fieldset>
                  </form>
                </div>

                <p className="text-center">
                  {'Don\'t have an account? '}
                  <Link href="javascript:void();">Create your account now</Link>
                  .
                </p>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>
  )
}
