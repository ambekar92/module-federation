// as of now getServerSession does not work in middleware. Recommended way is to use next-auth/middleware
// https://github.com/nextauthjs/next-auth/issues/7732#issuecomment-1577104038

import { createMiddleware } from 'next-easy-middlewares'
import { authenticate } from './middlewares/authenticate'
import { securityPolicy } from './middlewares/content-security-policy'
import { redirectAdditionalInfo } from './middlewares/redirect'

const middlewares: { [key: string]: any } = {}
export const config = {
  matcher: [
    '/home',
    '/admin',
    '/add-delegate',
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
    '/reviews'
  ],
}

config.matcher.forEach((path: string) => {
  middlewares[path] = [
    authenticate,
    redirectAdditionalInfo
    // securityPolicy -- getting distored styles due to csp setup:
    // Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' 'unsafe-inline' unsafe-eval http://localhost:3000".
  ]
})

export const middleware = createMiddleware(middlewares)
