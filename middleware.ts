// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

import { getToken } from 'next-auth/jwt'
import {createMiddleware} from 'next-easy-middlewares'
import { NextRequest, NextResponse } from 'next/server'
import { Role } from './app/shared/types/role'
import { authenticate } from './middlewares/authenticate'

const middlewares: { [key: string]: any } = {
  '/dashboard/:path*': async (request: NextRequest) => {
    // only primary_qualify_owner and contributor  can access this route
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    } else if (token.role === Role.ADMIN) {
      return NextResponse.redirect(`${request.nextUrl.origin}/admin/dashboard`)
    } else if (token.role !== Role.PRIMARY_QUALIFY_OWNER && token.role !== Role.CONTRIBUTOR && token.role !== Role.ADMIN){
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`);
    } else {
      return NextResponse.next();
    }
  },
  '/admin/dashboard': async (request: NextRequest) => {
    // only admin  can access this route
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    } else if (token.role === Role.PRIMARY_QUALIFY_OWNER || token.role === Role.CONTRIBUTOR) {
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
    } else if (token.role !== Role.PRIMARY_QUALIFY_OWNER && token.role !== Role.CONTRIBUTOR && token.role !== Role.ADMIN){
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`);
    } else {
      return NextResponse.next();
    }
  }
}

const globalMiddlewares= {
  before: authenticate,
} as any;

export const config = {
  matcher: [
    '/home',
    '/admin(.*)',
    '/assign-a-delegate',
    '/entities',
    '/evaluation',
    '/field-operation',
    '/helpdesk',
    '/claim-your-business',
    '/participation-agreement',
    '/users',
    '/documents',
    '/notifications',
    '/profile-settings',
    '/messages',
    '/additional-information',
    '/application',
    '/application(.*)', // all sub-routes
    '/reviews',
    '/firm/application(.*)/firm-summary',
    '/firm/application(.*)/documents',
    '/dashboard/(.*)',
    '/dashboard'
  ],
}

export const middleware = createMiddleware(middlewares, globalMiddlewares)
