import type { ApiErrorOptions } from '@/interfaces/api'

export class ApiError extends Error {
  public readonly status?: number
  public readonly code?: string
  public readonly details?: unknown
  public readonly requestId?: string

  constructor(message: string, options?: ApiErrorOptions) {
    super(message)
    this.name = 'ApiError'
    this.status = options?.status
    this.code = options?.code
    this.details = options?.details
    this.requestId = options?.requestId
  }
}

export class NetworkError extends ApiError {
  constructor() {
    super('Unable to connect to the API', { code: 'network_error' })
    this.name = 'NetworkError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, { status: 401, code: 'unauthorized' })
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, { status: 403, code: 'forbidden' })
    this.name = 'ForbiddenError'
  }
}
