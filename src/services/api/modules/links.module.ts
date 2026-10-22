import { apiClient } from '@/services/api/client/api.factory'
import type { LinkPreviewV1ResponseDto } from '@/services/api/models/linkPreviewV1ResponseDto'

export const linksModule = {
  getPreview: (url: string, signal?: AbortSignal) =>
    apiClient.get<LinkPreviewV1ResponseDto>('links/preview', { params: { url }, signal })
}
