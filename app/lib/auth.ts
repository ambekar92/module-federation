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
        userDetails = await axios.post(OKTA_POST_LOGIN_ROUTE, postData);
        if (userDetails?.data?.permissions.length) {
          token.permissions = userDetails.data.permissions;
        }
        if (userDetails?.data?.user_id) {
          session.user.id = userDetails.data.user_id;
        }
        if (userDetails?.data?.okta_id && typeof userDetails.data.okta_id === 'string') {
          session.user.okta_id = userDetails.data.okta_id;
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
  const session = await getServerSession(authConfig)
  return session;
}
