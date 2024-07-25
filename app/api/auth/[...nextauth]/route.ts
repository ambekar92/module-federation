import { OKTA_POST_LOGIN_ROUTE } from "@/app/constants/routes";
import { IUserDetails } from "@/app/lib/next-auth";
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import OktaProvider from 'next-auth/providers/okta';
import { generateCsrfToken } from "../utils/generateCsrfToken";
import { cookies } from "next/headers";
import { axiosInstance } from "@/app/services/axiosInstance";


async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
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
                cookies().set('accesstoken', userDetails.data.access);
              }
            } catch (error) {
              console.error('Error making POST request:', error);
            }
            const userSession = {...session, ...(userDetails.data || {})};
            return userSession;
          },
        },
        })
  }
  export {auth as GET, auth as POST};