import { OKTA_POST_LOGIN_ROUTE } from "@/app/constants/routes";
import { IUserDetails } from "@/app/lib/next-auth";
import { axiosInstance } from "@/app/services/axiosInstance";
import NextAuth from "next-auth";
import OktaProvider from 'next-auth/providers/okta';
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { generateCsrfToken } from "../utils/generateCsrfToken";
import { encrypt } from "@/app/shared/utility/encryption";
import { logout } from "@/app/lib/logout";
import { TESTER_LOGIN_ROUTE } from '@/app/constants/routes'
import axios from "axios";
import CryptoJS from 'crypto-js';

// @ts-ignore
async function auth(req: NextRequest, res: NextResponse ) {
    return await NextAuth(req, res, {
        providers: [
          OktaProvider({
            clientId: process.env.OKTA_OAUTH2_CLIENT_ID!,
            clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET!,
            issuer: process.env.OKTA_OAUTH2_ISSUER!,
          }),
          CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "Your username" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              try {
                const response = await axios.post(TESTER_LOGIN_ROUTE, {
                  username: credentials?.email,
                  password: credentials?.password,
                });

                const user = response.data.user;

                if (user) {
                  return user;
                } else {
                  return null;
                }
              } catch (error) {
                console.error('Error during authentication:', error);
                return null;
              }
            },
          }),
          CredentialsProvider({
            id: "max",
            name: "Max.gov",
            credentials: {
              email: { label: "Username", type: "text", placeholder: "Your username" },
            },
            async authorize(credentials) {
              const [name, domain] = (credentials?.email ?? '').split('@');

              const user = {
                  email: credentials?.email,
                  name: name.replace('.', ' '),
              }
              return user;
            },
          }),
        ],
        pages: {
          error: '/error',
        },
        secret: process.env.SESSION_SECRET,
        session: {
          strategy: "jwt",
          maxAge: 2700,
          rolling: true, // Extends session on user activity
        },
        jwt: {
          maxAge: 2700
        },
        callbacks: {
          signIn: async (user, account, profile) => {

            if (user) {
              const crypto = await import('crypto');
              const secretKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
              // Store it in the cookie
              cookies().set('sessionToken', encrypt(secretKey, secretKey), { maxAge: 3600 });

              return true
            }
            return null
          },
          jwt: async ({ token, account, profile, user }) => {
            if (account && account.provider === 'max') {
              token.email = user.email;
              token.name = user.name;
            }
            if (account && account.access_token) {
              token.accessToken = account.access_token;
              token.idToken = account.id_token;
            }
            if (token.csrfToken !== null) {
              token.csrfToken = generateCsrfToken()
            }
            if (profile && profile.sub) {
              token.okta_id = profile.sub;
            }
            if (user) {
              token.user_id = user.id;
              token.email = user.email;
              token.name = `${user.first_name} ${user.last_name}`;
            }
            return token
          },
          session: async ({ session, token }) => {
            if (typeof token.idToken === 'string') {
              session.user.idToken = token.idToken;
           }
            if (typeof token.csrfToken === 'string') {
              session.csrfToken = token.csrfToken;
            }
            // Add the Okta ID to the session
            if (typeof token.okta_id === 'string') {
              session.user.okta_id = token.okta_id;
            }

            let userDetails: { data: IUserDetails } = { data: {} as IUserDetails };
            if (session.user.name === "undefined undefined") {
              const [name, domain] = (session.user.email ?? '').split('@');
              session.user.name = name.replace('.', ' ');
            }
            const postData = {
              user: {
                name: session.user.name,
                email: session.user.email,
                okta_id: token?.okta_id
              },
              expires: session.expires,
              csrfToken: session.csrfToken,
              colloportus: process.env.COLLOPORTUS
            };
            try {
              userDetails = await axiosInstance.post(OKTA_POST_LOGIN_ROUTE, postData);
              if (userDetails.data) {
                session.access = userDetails.data.access;
                // Todo: cookies for email_password_auth_token
                // Todo: need to consider how to handle the email_password_auth_token differently
                const { refresh, access, entities, ...filterData } = userDetails.data

                cookies().set('email_password_auth_token', encrypt(JSON.stringify(filterData)));
                cookies().set('idtoken', encrypt(session.user.idToken));

                if (process.env.TOKEN_LOOKUP === 'development') {
                  cookies().set('access', encrypt(userDetails.data.access));
                }
                if (session.user.name === "undefined undefined") {
                  session.permissions = userDetails.data.permissions;
                }
                // cookies().set('firstPermission', encrypt(userDetails.data.permissions[0].slug));
                // if (userDetails.data.permissions.length > 1) {
                //   cookies().set('lastPermission', encrypt(userDetails.data.permissions[userDetails.data.permissions.length - 1].slug));
                // }
              }
              if (typeof token.accessToken === 'string') {
                session.user.accessToken = userDetails.data.access;
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

              if (process.env.PUBLIC_DEBUG_MODE) {
                console.log('Auth');
              }
            } catch (error) {
              console.error('Error making POST request:', error);
              await logout();
            }
            const userSession = {...session, ...(userDetails.data || {})};
            return userSession;
          },
        },
        })
  }
  export { auth as GET, auth as POST };
