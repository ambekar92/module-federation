import axios from 'axios'
import { NextAuthOptions, getServerSession } from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'
import { generateCsrfToken } from '../api/auth/utils/generateCsrfToken'

export const authConfig: NextAuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID!,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET!,
      issuer: process.env.OKTA_OAUTH2_ISSUER!,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      if (token.csrfToken !== null) {
        token.csrfToken = generateCsrfToken()
      }
      return token
    },
    session: async ({ session, token }) => {
      let userDetails = {data: {}};
      if (typeof token.csrfToken === 'string') {
        session.csrfToken = token.csrfToken // CSRF token is now part of the token object and persisted through JWT.
      }
      try {
        userDetails = await axios.post(`https://ucms-internal-api.demo.sba-one.net/api/v1/okta-post-login`, {
           ...session
        });
        
      } catch (error) {
        console.error('Error making POST request:', error);
      }
      return {...session, ...userDetails.data}
    },
    
  },
}
export async function getSessionServer() {
  const session = await getServerSession(authConfig)
  return session;
}
