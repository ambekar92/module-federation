import 'next-auth'

declare module 'next-auth' {
  interface Session {
    csrfToken?: string | unknown
  }
  interface Token {
    csrfToken?: string | unknown
  }
}
