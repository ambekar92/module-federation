// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

// Currently, only the auth middleware is operational.
// To use multiple middlewares, they need to be composed into a single function because Next.js executes only the default exported middleware from the `middleware.ts` file.
export { default } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'
import type { NextRequest, NextFetchEvent } from 'next/server'

type Environment = 'development' | 'production' | 'test' | 'alpha' | 'beta'

acceptLanguage.languages(languages)

export const config = {
  matcher: [
    // '/home',
    // '/admin',
    // '/entity-app',
    // '/evaluation',
    // '/field-operation',
    // '/helpdesk',
    // '/claim-your-business',
    // '/participation-agreement',
    // '/users',
    // '/',
    // '/documents',
  ],
}

// i18n middleware - suffixing with Temp1 before implementing a way to combine multiple middlewares.
export function middlewareTemp1(req) {
  let lng
  // if (req.cookies.has(cookieName))
  //   lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }
  if (!lng) {
    lng = fallbackLng
  }

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

// content security policy middleware - suffixing with Temp2 before implementing a way to combine multiple middlewares.
export function middlewareTemp2(
  request: NextRequest,
  event: NextFetchEvent,
): NextResponse | Response | undefined {
  const env: Environment = process.env.NODE_ENV as Environment
  let baseUrl

  switch (env) {
    case 'development':
      baseUrl = 'http://localhost:8080'
      break
    case 'alpha':
      baseUrl = 'https://alpha.com'
      break
    case 'beta':
      baseUrl = 'https://beta.com'
      break
    case 'production':
      baseUrl = 'https://production.com'
      break
    default:
      baseUrl = 'http://localhost:8080'
  }

  const csp = `
    default-src 'self';
    script-src 'self' ${process.env.NODE_ENV === 'development' ? 'unsafe-eval' : ''} ${baseUrl};
    object-src 'none';
    style-src 'self' 'unsafe-inline' ${baseUrl};
    font-src 'self' ${baseUrl};
    img-src 'self' data: ${baseUrl};
    media-src 'self' ${baseUrl};
    connect-src 'self';
    frame-src 'self';
	`
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ') // Removes new lines and multiple spaces

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    const response = new Response(null, { status: 204 })
    // Sets CORS headers
    response.headers.append('Access-Control-Allow-Origin', baseUrl)
    response.headers.append(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    )
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type')
    // Sets CSP headers
    response.headers.append('Content-Security-Policy', csp)
    return response
  }

  // For all other requests, set CORS and CSP headers on the response
  const response = NextResponse.next()
  // Sets CORS headers
  response.headers.set('Access-Control-Allow-Origin', baseUrl)
  // Sets CSP headers
  response.headers.set('Content-Security-Policy', csp)
  return response
}
