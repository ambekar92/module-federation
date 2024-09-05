// this file is no longer needed since the config object is create in the route.ts [...nextauth].ts file
import Cookies from 'js-cookie';
import { NextAuthOptions, getServerSession } from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';
import BoxyHQSAMLProvider from 'next-auth/providers/boxyhq-saml';
import { useSession } from 'next-auth/react';
import { LoginResponseUser } from '../(admin)/aeroad/types';
import { generateCsrfToken } from '../api/auth/utils/generateCsrfToken';
import { SessionType } from '../login/types';
import { IUserDetails } from './next-auth';
import { axiosInstance } from '../services/axiosInstance';
import { decrypt } from '@/app/shared/utility/encryption';

/**
 * Custom hook to retrieve and unify session details from two authentication sources.
 *
 * This function attempts to obtain the session details from Okta's authentication system first.
 * If Okta's session is not available, it falls back to using a session based on an email and password
 * authentication token stored in cookies. The function then constructs a unified session object
 * that conforms to the SessionType interface, regardless of the authentication method used.
 *
 * @returns {SessionType} A session object containing details about the current user session.
 */
export function useSessionUCMS(): SessionType {
  const oktaSession = useSession() as unknown as SessionType;
  const emailPasswordAuthCookie = Cookies.get('email_password_auth_token');
  const maxAuthCookie = Cookies.get('maxgov_auth_token');
  const email_password_auth_token = emailPasswordAuthCookie
    ? JSON.parse(decrypt(emailPasswordAuthCookie)) : maxAuthCookie ? JSON.parse(decrypt(maxAuthCookie))  as LoginResponseUser
      : null;

  const fullName = email_password_auth_token?.first_name && email_password_auth_token?.last_name
    ? `${email_password_auth_token.first_name} ${email_password_auth_token.last_name}`
    : '';

  const session: SessionType = oktaSession.data ? oktaSession : {
    data: {
      user: {
        name: fullName,
        email: email_password_auth_token?.email,
        accessToken: email_password_auth_token?.access,
        okta_id: '',
        id: email_password_auth_token?.user_id
      },
      expires: '',
      csrfToken: email_password_auth_token?.refresh,
      user_id: email_password_auth_token?.user_id,
      permissions: email_password_auth_token?.permissions,
      entities: email_password_auth_token?.entities,
      refresh: email_password_auth_token?.refresh,
      access: email_password_auth_token?.access
    },
    status: email_password_auth_token ? 'authenticated' : 'unauthenticated'
  };

  return session;
}
