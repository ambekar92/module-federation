// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-easy-middlewares';
import { NextRequest, NextResponse } from 'next/server';
import { LoginResponseUser } from './app/(admin)/aeroad/types';
import { Role } from './app/shared/types/role';
import { Permission } from './app/tarmac/types';
import { decrypt, decryptData } from '@/app/shared/utility/encryption';

async function handleProtectedRoute(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
    console.log('door opened')
  }
  const { token } = await getData(request)
  const path = request.nextUrl.pathname
  if (
    path === '/login' ||
    path === '/login-tester' ||
    path === '/tester-login'
  ) {
    return NextResponse.next()
  }

  // somehow if logging in via okta, user_id is not available at this point,
  // however this check is not for okta authenticated users so we are ignoring this checking okta authenticated used.
  if (token && !token.user_id && !token.okta_id) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('not available at this point')
    }
    return NextResponse.redirect(`${request.nextUrl.origin}?shouldLogout=true`)
  }
  if (!token) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('something went wrong', request.nextUrl.origin)
    }
    return NextResponse.redirect(`${request.nextUrl.origin}`)
  } else {
    return NextResponse.next()
  }
}

const middlewares: { [key: string]: any } = {
  '/(.*)': [handleProtectedRoute],
  '/user/dashboard/:path*': [async (request: NextRequest) => {
    const {permissions} = await getData(request)
    const isInternalUser = isRole(permissions, Role.INTERNAL);
    if (isInternalUser) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}`);
    }
  }],
  '/dashboard/:path*': [async (request: NextRequest) => {
    const {permissions} = await getData(request)
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('handleProtectedRoute', permissions);
    }
    if (!isRole(permissions, Role.EXTERNAL)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard/tasks`);
    } else {
      return NextResponse.next();
    }
  }],
  '/admin/dashboard': [async (request: NextRequest) => {
    const {permissions} = await getData(request)
    if (isRole(permissions, Role.PRIMARY_QUALIFYING_OWNER) || isRole(permissions, Role.CONTRIBUTOR)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
    } else if (!isRole(permissions, Role.PRIMARY_QUALIFYING_OWNER) && !isRole(permissions, Role.CONTRIBUTOR) && !isRole(permissions, Role.ADMIN)){
      return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard/tasks`);
    } else {
      return NextResponse.next();
    }
  }],
  '/firm/:path*': [async (request: NextRequest) => {
    const {permissions} = await getData(request)
    const isInternalUser = isRole(permissions, Role.INTERNAL);
    if (isInternalUser) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}`);
    }
  }],
  '/admin/:path*': [async (request: NextRequest) => {
    const {permissions} = await getData(request)
    const isAdminUser = isRole(permissions, Role.ADMIN);
    if (isAdminUser) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}`);

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
  '/aeroad': [async (request: NextRequest) => {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(`${request.nextUrl.origin}`);
    } else {
      return NextResponse.next();
    }
  }]
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
    '/user/dashboard/(.*)',
    '/user/dashboard/:path*',
    '/login-tester',
    '/tester-login',
    '/entity-owned/(.*)',
    '/field-function/(.*)',
  ],
}

export const middleware = createMiddleware(middlewares)

export function isRole(permissions:  Permission[], role: Role) {
  // if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
  //   console.log('yolo');
  // }

  if (!permissions) {
    return false
  }
  return permissions.some((permission) => permission.slug === role)
}

async function getData(request: NextRequest) {
  const cookies = request.cookies;
  const secretKey = cookies.get('sessionToken')
  const sessionToken = cookies.get('sessionToken');
  const pk = cookies.get('pk');
  const secretKey2 = decryptData(sessionToken?.value, pk?.value);

  const email_password_auth_token = cookies.has('email_password_auth_token')
    ? JSON.parse(decryptData(cookies.get('email_password_auth_token')?.value, secretKey2) ?? '')
    : null as unknown as LoginResponseUser;

  const maxgov_auth_token = cookies.has('maxgov_auth_token')
    ? JSON.parse(decryptData(cookies.get('maxgov_auth_token')?.value, secretKey2) ?? '')
    : null as unknown as LoginResponseUser;

  const token = email_password_auth_token || maxgov_auth_token || null;
  const permissions = token?.permissions || [];
  const originalUrl = encodeURIComponent(request.nextUrl.pathname);

  if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
    console.log('URL', originalUrl);
    console.log('token', token ?? null);
  }

  return {token, permissions, originalUrl}
}
