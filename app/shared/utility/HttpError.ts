export default class HttpError extends Error {
  statusCode: number
  header: string

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.header = this.determineHeader(statusCode)
  }

  determineHeader(statusCode: number) {
    switch (statusCode) {
      case 403:
        return 'Access Forbidden'
      case 404:
        return 'Not Found'
      case 500:
        return 'Internal Server Error'
      case 503:
        return 'Service Unavailable'
      default:
        return 'Error'
    }
  }
}
