// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-easy-middlewares';
import { NextRequest, NextResponse } from 'next/server';
import { IUserPermission } from './app/lib/next-auth';
import { LoginResponseUser } from './app/(admin)/login-tester/types';
import { Role } from './app/shared/types/role';
import { Permission } from './app/login/types';

async function handleProtectedRoute(request: NextRequest) {
  const {email_password_auth_token, token, originalUrl} = await getData(request);
  const path = request.nextUrl.pathname;
  if (path === '/login' || path === '/login-tester' || path === '/tester-login') {
    return NextResponse.next();
  }
  if (!token && !email_password_auth_token) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`);
  } else {
    return NextResponse.next();
  }
}

const middlewares: { [key: string]: any } = {
  '/dashboard/:path*': [async (request: NextRequest) => {
    const {email_password_auth_token, permissions, token, originalUrl} = await getData(request)
    if (!token && !email_password_auth_token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`)
    } else if (isRole(permissions, Role.PRIMARY_QUALIFYING_OWNER) || isRole(permissions, Role.CONTRIBUTOR)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/admin/dashboard`)
    } else if (!isRole(permissions, Role.PRIMARY_QUALIFYING_OWNER) && !isRole(permissions, Role.CONTRIBUTOR) && !isRole(permissions, Role.ADMIN)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`);
    } else {
      return NextResponse.next();
    }
  }],
  '/admin/dashboard': [async (request: NextRequest) => {
    const {email_password_auth_token, permissions, token, originalUrl} = await getData(request)
    if (!token && !email_password_auth_token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`)
    } else if (isRole(permissions, Role.PRIMARY_QUALIFYING_OWNER) || isRole(permissions, Role.CONTRIBUTOR)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
    } else if (!isRole(permissions, Role.PRIMARY_QUALIFYING_OWNER) && !isRole(permissions, Role.CONTRIBUTOR) && !isRole(permissions, Role.ADMIN)){
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`);
    } else {
      return NextResponse.next();
    }
  }],
  '/login-tester': [async (request: NextRequest) => {
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }
  }],
  '/tester-login': [async (request: NextRequest) => {
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }
  }],
  '/': [handleProtectedRoute],
  '/:path*': [handleProtectedRoute]
};

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
    '/firm(.*)', // all sub-routes
    '/dashboard/(.*)',
    '/login-tester',
    '/tester-login'
  ],
}

export const middleware = createMiddleware(middlewares);

export function isRole(permissions:  Permission[], role: Role) {
  if (!permissions) {return false;}
  return permissions.some(permission => permission.slug === role);
}

async function getData(request: NextRequest) {
  const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
  const cookies = request.cookies;
  const email_password_auth_token = cookies.has('email_password_auth_token') ? JSON.parse(cookies.get('email_password_auth_token')?.value ?? '') : '' as unknown as LoginResponseUser
  const permissions = token?.permissions as any[] || email_password_auth_token?.permissions;
  const originalUrl = encodeURIComponent(request.nextUrl.pathname);
  return {token, permissions, email_password_auth_token, originalUrl}
}
