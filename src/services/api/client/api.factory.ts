import { ApiClient } from './api'

export const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  version: 'v1'
})
