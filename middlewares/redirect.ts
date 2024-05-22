import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function redirectAdditionalInfo(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname === '/additional-information') {
    url.pathname = '/additional-information/eighta';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
