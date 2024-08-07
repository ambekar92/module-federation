'use client'
import { TESTER_LOGIN_ROUTE } from '@/app/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Fieldset,
  Grid,
  GridContainer,
  Header,
  Label,
  Link,
  TextInput,
  Title,
} from '@trussworks/react-uswds'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LoginResponse } from '../types'
import { SignInFormData, SignInFormSchema } from './Schema'
import { fetcherPOST } from '@/app/services/fetcher-legacy'
import {
  CLAIM_YOUR_BUSINESS, SELECT_INTENDED_PROGRAMS, DASHBOARD, ADMIN_DASHBOARD,
  USER_DASHBOARD_PAGE
} from '@/app/constants/url'
import { Role } from '@/app/shared/types/role'

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
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter()
  const {
    trigger,
    control,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    mode: 'onBlur',
  });
  const handleSignIn = async () => {
    try {
      const postData = {
        username: getValues('email'),
        password: getValues('password'),
      }

      const response = await fetcherPOST<LoginResponse>(TESTER_LOGIN_ROUTE, postData);
      Cookies.set('email_password_auth_token', JSON.stringify(response.user))
      Cookies.set('accesstoken', response.user.access)
      const firstPermissionSlug = response.user.permissions?.at(0)?.slug;
      const lastPermissionSlug = response.user.permissions?.at(-1)?.slug;
      if (typeof firstPermissionSlug === 'string' && typeof lastPermissionSlug === 'string') {

        switch (firstPermissionSlug) {
          case Role.INTERNAL:
            switch (lastPermissionSlug) {
              case Role.ADMIN:
                router.push(ADMIN_DASHBOARD);
                break;
              default:
                router.push(USER_DASHBOARD_PAGE);
            }
            break;
          case Role.EXTERNAL:
            switch (lastPermissionSlug) {
              case Role.EXTERNAL:
                // Todo
                // Need to validate application progress for router.push
                router.push(CLAIM_YOUR_BUSINESS);
                break;
              case Role.PRIMARY_QUALIFYING_OWNER:
                // Todo
                // Need to validate application progress for router.push
                router.push(CLAIM_YOUR_BUSINESS);
                break;
              case Role.CONTRIBUTOR:
                router.push(DASHBOARD);
                break;
              default:
                router.push('/');
            }
            break;
          default:
            router.push('/');
        }
      } else {
        router.push(USER_DASHBOARD_PAGE);
      }
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
                  <form onSubmit={handleSubmit(handleSignIn)}>
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

                      <Button className='margin-top-3' type="submit">
                        Sign in
                      </Button>

                      <p>
                        <Link href="#">Forgot password?</Link>
                      </p>
                    </Fieldset>
                  </form>
                </div>

                <p className="text-center">
                  {'Don\'t have an account? '}
                  <Link href="#">Create your account now</Link>
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
