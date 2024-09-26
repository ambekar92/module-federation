// this file is no longer needed since the config object is create in the route.ts [...nextauth].ts file
import Cookies from 'js-cookie';
import { NextAuthOptions, getServerSession } from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';
import BoxyHQSAMLProvider from 'next-auth/providers/boxyhq-saml';
import { useSession } from 'next-auth/react';
import { LoginResponseUser } from '../(admin)/aeroad/types';
import { generateCsrfToken } from '../api/auth/utils/generateCsrfToken';
import { SessionType } from '../tarmac/types';
import { IUserDetails } from './next-auth';
import { axiosInstance } from '../services/axiosInstance';
import { decrypt } from '@/app/shared/utility/encryption';
import { OKTA_POST_LOGIN_ROUTE } from '@/app/constants/routes';

/**
 * @deprecated
 */
export  const authConfig: NextAuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID!,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET!,
      issuer: process.env.OKTA_OAUTH2_ISSUER!,
    })
  ],
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (token.csrfToken !== null) {
        token.csrfToken = generateCsrfToken()
      }
      if (profile && profile.sub) {
        token.okta_id = profile.sub;
      }
      return token
    },
    session: async ({ session, token }) => {
      if (typeof token.accessToken === 'string') {
        session.user.accessToken = token.accessToken;
      }
      if (typeof token.csrfToken === 'string') {
        session.csrfToken = token.csrfToken;
      }
      // Add the Okta ID to the session
      if (typeof token.okta_id === 'string') {
        session.user.okta_id = token.okta_id;
      }

      let userDetails: { data: IUserDetails } = { data: {} as IUserDetails };
      const postData = {
        user: {
          name: session.user.name,
          email: session.user.email,
          okta_id: token.okta_id
        },
        expires: session.expires,
        csrfToken: session.csrfToken
      };
      try {
        userDetails = await axiosInstance.post(OKTA_POST_LOGIN_ROUTE, postData);
        if (userDetails?.data?.permissions.length) {
          token.permissions = userDetails.data.permissions;
        }
        if (userDetails?.data?.permissions.length) {
          token.permissions = userDetails.data.permissions;
        }
        if (userDetails?.data?.permissions.length) {
          token.permissions = userDetails.data.permissions;
        }
        if (userDetails?.data?.user_id) {
          session.user.id = userDetails.data.user_id;
        }
        if (userDetails?.data?.okta_id && typeof userDetails.data.okta_id === 'string') {
          session.user.okta_id = userDetails.data.okta_id;
        }
        if (userDetails.data.access) {
          session.access = userDetails.data.access;
        }
      } catch (error) {
        console.error('Error making POST request:', error);
      }
      const userSession = {...session, ...(userDetails.data || {})};
      // FOR TESTING to ensure we are not spreading an undefined object
      // console.log('Final Session Object:');
      // console.log(JSON.stringify(userSession, null, 2));
      return userSession;
    },
  },
}

export async function getSessionServer() {
  const session = await getServerSession(authConfig);
  return session;
}

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
      applications: email_password_auth_token?.applications,
    },
    status: email_password_auth_token ? 'authenticated' : 'unauthenticated'
  };

  return session;
}
