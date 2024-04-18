import NextAuth from 'next-auth'
import { authConfig } from '@/app/lib/auth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)
