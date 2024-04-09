import { NextAuthOptions, getServerSession } from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'
import { redirect } from 'next/navigation'

export const authConfig: NextAuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID!,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET!,
      issuer: process.env.OKTA_OAUTH2_ISSUER!,
    }),
  ],
}

export async function getSessionServer() {
  const session = await getServerSession(authConfig)
  console.log(session)
  if (!session) {
    console.log('no session')
    return redirect('/login')
  }
}
