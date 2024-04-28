import { type NextRequest, NextResponse, NextFetchEvent } from 'next/server';

type Environment = 'development' | 'production' | 'test' | 'alpha' | 'beta'

// content security policy middleware - suffixing with Temp2 before implementing a way to combine multiple middlewares.
export function securityPolicy(
  request: NextRequest,
  event: NextFetchEvent,
): NextResponse | Response | undefined {
  const env: Environment = process.env.NODE_ENV as Environment
  let baseUrl
  console.log('content security policy middleware')
  switch (env) {
    case 'development':
      baseUrl = 'http://localhost:3000'
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
      baseUrl = 'http://localhost:3000'
  }

  const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? 'unsafe-eval' : ''} ${baseUrl};
  object-src 'none';
  style-src 'self' 'unsafe-inline' *;
  font-src 'self' *;
  img-src 'self' data: ${baseUrl};
  media-src 'self' ${baseUrl};
  connect-src 'self';
  frame-src 'self';
  `
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' '); // Removes new lines and multiple spaces

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
