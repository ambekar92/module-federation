// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

export { default } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: [
    // '/home',
    '/admin',
    '/entity-app',
    '/evaluation',
    '/field-operation',
    '/helpdesk',
    // '/claim-your-business',
    // '/participation-agreement',
    '/',
  ],
  // matcher: '/:lng*'
  // matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req) {
  let lng
  // if (req.cookies.has(cookieName))
  //   lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) {lng = acceptLanguage.get(req.headers.get('Accept-Language'))}
  if (!lng) {lng = fallbackLng}

  // Redirect if lng in path is not supported
  // if (
  //   !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
  //   !req.nextUrl.pathname.startsWith('/_next')
  // ) {
  //   console.log('lng = ', lng)
  //   console.log('req.nextUrl.pathname = ', req.nextUrl.pathname)
  //   console.log('req.url = ', req.url)
  //   return NextResponse.redirect(
  //     // new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
  //     new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
  //   )
  // }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    )
    const response = NextResponse.next()
    // if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
