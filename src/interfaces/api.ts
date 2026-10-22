import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface ApiClientConfig {
  baseURL: string
  version?: string
  timeout?: number
  withCredentials?: boolean
}

export interface RequestConfig<D = unknown> extends Omit<AxiosRequestConfig<D>, 'url'> {
  url?: string
  version?: string
}

export interface ApiErrorOptions {
  status?: number
  code?: string
  details?: unknown
  requestId?: string
}

export interface ApiErrorResponse {
  message?: string
  code?: string
  details?: unknown
  requestId?: string
}

export interface ApiClientInterface {
  getAxiosInstance(): AxiosInstance
  request<T, D = unknown>(config: RequestConfig<D>): Promise<T>
  get<T>(url: string, config?: RequestConfig): Promise<T>
  post<T, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T>
  put<T, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T>
  patch<T, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T>
  delete<T>(url: string, config?: RequestConfig): Promise<T>
}
