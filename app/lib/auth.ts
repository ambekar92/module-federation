import axios from 'axios';
import { NextAuthOptions, getServerSession } from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';
import { generateCsrfToken } from '../api/auth/utils/generateCsrfToken';
import { OKTA_POST_LOGIN_ROUTE } from '../constants/routes';
import { IUserDetails } from './next-auth';

export const authConfig: NextAuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID!,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET!,
      issuer: process.env.OKTA_OAUTH2_ISSUER!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (token.csrfToken !== null) {
        token.csrfToken = generateCsrfToken()
      }
      return token
    },
    session: async ({ session, token }) => {
      if (typeof token.accessToken === 'string') {
        session.user.accessToken = token.accessToken;
      }
      let userDetails: { data: IUserDetails } = { data: {} as IUserDetails };
      if (typeof token.csrfToken === 'string') {
        session.csrfToken = token.csrfToken; // CSRF token is now part of the token object and persisted through JWT.
      }
      try {
        userDetails = await axios.post(OKTA_POST_LOGIN_ROUTE, {
          ...session
        });
        token.role = userDetails?.data?.permissions?.[0]?.slug
        if (userDetails?.data?.user_id) {
          session.user.id = userDetails.data.user_id;
        }
        // For testing purposes, can hardcode role
        // token.role = Role.CONTRIBUTOR;
      } catch (error) {
        console.error('Error making POST request:', error);
      }
      // For testing purposes, can hardcode role
      // userDetails.data.permissions[0].slug = Role.CONTRIBUTOR;
      return {...session, ...userDetails.data}
    },

  },
}
export async function getSessionServer() {
  const session = await getServerSession(authConfig)
  return session;
}
