import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextResponse, type NextRequest } from 'next/server';

export async function authenticate(request: NextRequest,
  event: NextFetchEvent) {
  if (process.env.PUBLIC_DEV_MODE) {
    console.log('authenticate', request.nextUrl.pathname);
  }
  const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
  if (!token) {
    const originalUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(`${request.nextUrl.origin}/login?next=${originalUrl}`)
  }
  return NextResponse.next()
}
