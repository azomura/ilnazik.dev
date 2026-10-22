import { isCancel, type AxiosError, type AxiosInstance } from 'axios'

import type { ApiErrorResponse } from '@/interfaces/api'
import { ApiError, ForbiddenError, NetworkError, UnauthorizedError } from './api.errors'

export function setupApiInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(config => {
    config.headers.set('Accept', 'application/json')

    return config
  })

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorResponse>) => {
      if (isCancel(error)) throw error
      if (!error.response) throw new NetworkError()

      const { status, data, headers } = error.response

      if (status === 401) throw new UnauthorizedError(data?.message)
      if (status === 403) throw new ForbiddenError(data?.message)

      throw new ApiError(data?.message || 'Unknown API error', {
        status,
        code: data?.code,
        details: data?.details,
        requestId: data?.requestId || headers['x-request-id']
      })
    }
  )

  return instance
}
