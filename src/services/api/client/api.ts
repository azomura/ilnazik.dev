import axios, { type AxiosInstance } from 'axios'

import type { ApiClientConfig, ApiClientInterface, RequestConfig } from '@/interfaces/api'

import { API_DEFAULTS } from './api.constants'
import { setupApiInterceptors } from './api.interceptors'

export class ApiClient implements ApiClientInterface {
  private readonly axiosInstance: AxiosInstance
  private readonly version: string

  constructor(config: ApiClientConfig) {
    this.version = config.version ?? API_DEFAULTS.version
    this.axiosInstance = setupApiInterceptors(
      axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout ?? API_DEFAULTS.timeout,
        withCredentials: config.withCredentials ?? false
      })
    )
  }

  private buildUrl(url: string, version = this.version) {
    return `/${[version, url]
      .map(part => part.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/')}`
  }

  public getAxiosInstance() {
    return this.axiosInstance
  }

  public async request<T, D = unknown>(config: RequestConfig<D>): Promise<T> {
    const { version, ...request } = config
    const response = await this.axiosInstance.request<T>({
      ...request,
      url: this.buildUrl(config.url ?? '', version)
    })
    return response.data
  }

  public get<T>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  public post<T, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return this.request<T, D>({ ...config, method: 'POST', url, data })
  }

  public put<T, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return this.request<T, D>({ ...config, method: 'PUT', url, data })
  }

  public patch<T, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return this.request<T, D>({ ...config, method: 'PATCH', url, data })
  }

  public delete<T>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}
