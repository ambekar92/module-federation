import { OKTA_POST_LOGIN_ROUTE } from "@/app/constants/routes";
import { IUserDetails } from "@/app/lib/next-auth";
import { axiosInstance } from "@/app/services/axiosInstance";
import NextAuth from "next-auth";
import OktaProvider from 'next-auth/providers/okta';
import { cookies } from "next/headers";
import { generateCsrfToken } from "../utils/generateCsrfToken";
import { encrypt } from "@/app/shared/utility/encryption";

// @ts-ignore
async function auth(req: NextRequest, res: NextResponse ) {
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
            if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
              console.log("OKTA TOKEN", token);
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
            const postData = {
              user: {
                name: session.user.name,
                email: session.user.email,
                okta_id: token.okta_id
              },
              expires: session.expires,
              csrfToken: session.csrfToken,
              colloportus: process.env.COLLOPORTUS
            };
            try {
              userDetails = await axiosInstance.post(OKTA_POST_LOGIN_ROUTE, postData);
              if (userDetails.data.access) {
                session.access = userDetails.data.access;
                // Todo: cookies for email_password_auth_token
                // Todo: need to consider how to handle the email_password_auth_token differently
                cookies().set('email_password_auth_token', encrypt(JSON.stringify(userDetails.data)));
                cookies().set('accesstoken', encrypt(userDetails.data.access));
                cookies().set('idtoken', encrypt(session.user.idToken));
                cookies().set('firstPermission', encrypt(userDetails.data.permissions[0].slug));
                if (userDetails.data.permissions.length > 1) {
                  cookies().set('lastPermission', encrypt(userDetails.data.permissions[userDetails.data.permissions.length - 1].slug));
                }
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
            }
            const userSession = {...session, ...(userDetails.data || {})};
            return userSession;
          },
        },
        })
  }
  export { auth as GET, auth as POST };
