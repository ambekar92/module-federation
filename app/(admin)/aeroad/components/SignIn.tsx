'use client'
import { APPLICATION_ROUTE, ENTITIES_ROUTE, TESTER_LOGIN_ROUTE } from '@/app/constants/routes'
import {
  CLAIM_YOUR_BUSINESS
} from '@/app/constants/url'
import { fetcherPOST } from '@/app/services/fetcher-legacy'
import { Application } from '@/app/services/types/application-service/Application'
import { Entity } from '@/app/shared/types/responses'
import { Role } from '@/app/shared/types/role'
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
import { encrypt } from '@/app/shared/utility/encryption';
import { postLoginRedirectUrl } from '@/app/shared/utility/postLoginRedirectUrl'
import Head from 'next/head'
import { axiosInstance } from '@/app/services/axiosInstance'

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

export const SignIn = (): React.ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter()

  const {
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
      Cookies.set('email_password_auth_token', encrypt(JSON.stringify(response.user)))
      Cookies.set('accesstoken', encrypt(response.user.access))
      const firstPermissionSlug = response.user.permissions?.at(0)?.slug as unknown as Role;
      const lastPermissionSlug = response.user.permissions?.at(-1)?.slug as unknown as Role;

      if (firstPermissionSlug && lastPermissionSlug) {
        Cookies.set('firstPermission', encrypt(firstPermissionSlug));
        Cookies.set('lastPermission', encrypt(lastPermissionSlug));

        let applicationData: Application[] | null = null;
        let entityData: Entity[] | null = null;

        const applicationDataPromise = axiosInstance.get(`${APPLICATION_ROUTE}?user_id=${response.user.user_id}`);
        const entityQueryParam = lastPermissionSlug === Role.DELEGATE ? 'delegate_user_id' : 'owner_user_id';
        const entityDataPromise = axiosInstance.get(`${ENTITIES_ROUTE}?${entityQueryParam}=${response.user.user_id}`);

        const applicationResponse = await applicationDataPromise;

        if (applicationResponse) {
          applicationData = await applicationResponse.data;
          if (applicationData && applicationData.length > 0) {
            const simpleApplicationData = applicationData.map(app => ({
              id: app.id,
              progress: app.progress,
              workflow_state: app.workflow_state
            }));
            Cookies.set('applicationData', encrypt(JSON.stringify(simpleApplicationData)));
          } else {
            Cookies.remove('applicationData');
          }
        }

        if (!applicationData || applicationData.length === 0) {
          const entityResponse = await entityDataPromise;
          if (entityResponse) {
            entityData = await entityResponse.data;
            if (entityData && entityData.length > 0) {
              const simpleEntityData = entityData.map(entity => ({ id: entity.id }));
              Cookies.set('entityData', encrypt(JSON.stringify(simpleEntityData)));
            } else {
              Cookies.remove('entityData');
            }
          }
        }
        const redirectUrl = postLoginRedirectUrl(firstPermissionSlug, lastPermissionSlug);
        if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
          console.log('REDIRECT TO', redirectUrl);
        }
        router.push(redirectUrl);

      } else {
        router.push(CLAIM_YOUR_BUSINESS);
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
