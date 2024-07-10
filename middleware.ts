// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

import { getToken } from 'next-auth/jwt';
import { MiddlewareConfig, createMiddleware } from 'next-easy-middlewares';
import { NextRequest, NextResponse } from 'next/server';
import { Role } from './app/shared/types/role';

const middlewares: { [key: string]: any } = {
  // only primary_qualify_owner and contributor  can access this route
  '/dashboard/:path*': async (request: NextRequest) => {
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
    const originalUrl = encodeURIComponent(request.nextUrl.pathname);
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`)
    } else if (token.role === Role.ADMIN) {
      return NextResponse.redirect(`${request.nextUrl.origin}/admin/dashboard`)
    } else if (token.role !== Role.PRIMARY_QUALIFY_OWNER && token.role !== Role.CONTRIBUTOR && token!.role !== Role.ADMIN){
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`);
    } else {
      return NextResponse.next();
    }
  },
  '/admin/dashboard': async (request: NextRequest) => {
    // only admin  can access this route
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
    const originalUrl = encodeURIComponent(request.nextUrl.pathname);
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`)
    } else if (token.role === Role.PRIMARY_QUALIFY_OWNER || token.role === Role.CONTRIBUTOR) {
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
    } else if (token.role !== Role.PRIMARY_QUALIFY_OWNER && token.role !== Role.CONTRIBUTOR && token.role !== Role.ADMIN){
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`);
    } else {
      return NextResponse.next();
    }
  },
  // protect all routes except /login
  'regex:^(?!/login$).*$': async (request: NextRequest) => {
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
    const originalUrl = encodeURIComponent(request.nextUrl.pathname);
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`)
    }
    else return NextResponse.next();
  }
} as MiddlewareConfig;

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

export const middleware = createMiddleware(middlewares)
